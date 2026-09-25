---
name: dotnet-setup-throughput
description: >
  Audits and hardens .NET Setup/framework layers that wrap every request for DX
  (auth, user context, AutoInclude, generic repos, SaveChanges interceptors) but
  tax latency and DB load. Also defines Setup contracts for List/Detail DTOs,
  PagedRequest/PagedResponse, SQL projection, and external ID lookups
  (SUNAT RUC / RENIEC DNI cache-aside). Use when reviewing Setup throughput,
  per-request DB cost, auth/session cache, AutoInclude, thin vs fat reads,
  pagination, ListDto, DetailDto, SUNAT, RENIEC, RUC, DNI lookup, ApiPeru,
  HybridCache/Redis, NullPermissionCache, peaje fijo por request, or high load.
---

# .NET Setup Throughput

## Thesis

Framework wrappers that run **once in code** (middleware, AutoInclude, interceptors, generic list repos, shared paging) often run **on every request/query**. That optimizes developer time, not QPS.

**Rule:** Keep the DX wrapper; make the hot path **cache + thin read**. Fat graphs and full interceptor stacks belong to detail/write paths only.

Do **not** expand into module business logic unless the user asks. Focus on host Setup: auth, context, EF defaults, repos base, interceptors, caching, **DTO/pagination**, **external ID lookups**.

## When to load

- Audit fixed per-request cost or scale questions
- Design Setup for a new API / modular monolith
- Adding or reviewing **list/grid endpoints**, pagination, or DTO shapes
- Adding or reviewing **SUNAT RUC / RENIEC DNI** (or similar) external lookups
- Refactoring AutoInclude / permission or session cache

## Workflow

```
Setup throughput:
- [ ] 1. Map fixed per-request path (auth → context → handler)
- [ ] 2. Count DB roundtrips before business logic
- [ ] 3. Classify read defaults (tracking, AutoInclude, list vs detail)
- [ ] 4. Audit DTO/pagination (envelope, projection, unbounded lists)
- [ ] 5. Audit external ID lookups (RUC/DNI): cache-aside, HttpClient, secrets
- [ ] 6. Classify write pipeline (tx always? interceptors?)
- [ ] 7. Recommend ROI-ordered fixes
- [ ] 8. Implement only what the user asked (audit vs patch)
```

### Step 1 — Map the fixed path

Search: `OnValidatePrincipal`, session/`IsActiveAsync`, `UserContext` middleware, `IPermissionCache`/`NullPermissionCache`, `HasQueryFilter`, `AutoInclude`, `AsSplitQuery`, base `Repository`/`EntityRepository`/`CommandHandler`, `SaveChangesInterceptor`.

Document: **queries before handler** on a typical authenticated GET.

### Step 2 — Score cost

| Signal | Severity |
|--------|----------|
| Session/permissions/user snapshot hit DB every request with no real cache | Critical |
| AutoInclude of collections on Person-like hubs | Critical for lists |
| List APIs materialize graphs then map in memory | High |
| Unbounded lists / no `PagedResponse` / entity returned from API | High |
| Same fat DTO for list and detail | High |
| SUNAT/RENIEC (or scrape) on every request with no durable cache | Critical |
| `new HttpClient()` for lookups; secrets in code | High |
| `uow.Query` without default `AsNoTracking` on reads | High |
| Explicit transaction on every simple command | Medium |
| Many SaveChanges interceptors | Low–Medium (writes OK) |
| Restrict-delete EXISTS fan-out | High on deletes only |

### Step 3 — Prescribe (ROI order)

1. **Cache request identity** — session + permissions + user context (`IMemoryCache` single node; Redis/`HybridCache` multi-node). No production `NullPermissionCache`.
2. **Thin read defaults** — lists: `AsNoTracking` + no AutoInclude. Detail/write: tracking + explicit includes.
3. **Setup DTO + pagination contract** — `FilterRequest` / `PagedRequest` / `PagedResponse<T>`; `*ListDto` vs `*DetailDto`; project with `.Select` in SQL. Full shapes: [pagination-dtos.md](pagination-dtos.md).
4. **External ID lookups (SUNAT/RENIEC)** — validate → DB cache → remote on miss → persist → DTO. Full pattern: [external-id-lookups.md](external-id-lookups.md).
5. **Split list vs detail loaders** — never reuse detail `ApplyIncludes` for grids.
6. **Transactional commands only when needed**.
7. **SQL/Dapper** only on measured hot paths. Cache still beats raw SQL alone for identity.
8. **Horizontal scale** — shared cache (+ SignalR backplane if needed).

### External ID lookups (summary)

Full pattern → **[external-id-lookups.md](external-id-lookups.md)**.

- DNI (8) / RUC (11): validate first.
- **Durable cache-aside** (DB) before SUNAT, RENIEC, ApiPeru, or scrape.
- `IHttpClientFactory`; options for tokens; return Lookup DTOs.
- Cache admin lists use pagination; by-key lookup returns one DTO.
- Do not call the provider from every form event without cache.

### DTOs and pagination (summary)

Full contract, pipeline order, extensions, and audit smells → **[pagination-dtos.md](pagination-dtos.md)**.

Must-haves:

- Never return EF entities from the API.
- List ≠ Detail DTOs; list must be EF-projectable.
- Paginate in SQL: `Count` → `Order` → `Skip`/`Take` → `Select` → `ToList`.
- Clamp `PageSize` (default ~20, max 100); exports are separate endpoints.
- Search/sort via allow-lists only.

```csharp
// Good
.Select(a => new AreaListDto(a.Id, a.Name, a.Code))

// Bad
.Include(a => a.Children).ToListAsync() → Skip/Take → ToFatDto
```

### Step 4 — Output format

```markdown
## Setup throughput — [project]

### Fixed cost per authenticated request
### Read defaults
### DTOs / pagination
### External ID lookups (SUNAT / RENIEC)
### Write pipeline
### Verdict (scale)
### Recommended changes (ROI)
```

Implement smallest patch first (session/permission cache), then read defaults / paging DTOs if asked.

## Hard rules

- Prefer fixing **Setup** over rewriting modules.
- Do not strip safety interceptors for speed myths.
- Do not lead with microservices.
- AutoInclude = detail convenience, not list default.
- Raw SQL ≠ substitute for identity cache.
- **Redis optional** — one instance → `IMemoryCache`; replicas → Redis/`HybridCache`.
- **Never expose EF entities**; list DTOs SQL-projectable; paginate in the database.
- **Never call SUNAT/RENIEC on every request** — durable cache-aside first.

## Stack defaults (.NET 8+)

| Concern | Prefer |
|---------|--------|
| Single instance cache | `IMemoryCache` |
| Multi-instance | Redis / `HybridCache` |
| Thin EF reads | `AsNoTracking`, projections, `IgnoreAutoIncludes` |
| Lists | `PagedRequest` + `PagedResponse<*ListDto>` |
| Hot SQL | Dapper or EF `SqlQuery` |
| AuthZ after cache | Claims / `HttpContext.Items` |
| Cookie session | Cache `IsActive`; invalidate on revoke/logout |
| DNI / RUC lookup | DB cache-aside → remote on miss; `IHttpClientFactory` |

## Anti-patterns

- `NullPermissionCache` left forever
- `OnValidatePrincipal` always hitting DB
- AutoInclude collections on list hubs
- `FindManyPaged` + `ApplyIncludes` + in-memory mapper
- One DTO for list and detail; unbounded `GetAll`
- Remote DNI/RUC on every request; scrape without cache or timeouts
- `Task.Run` when a queue exists
- SQL rewrite without cutting fixed roundtrips

## Additional resources

- Grep / budgets / scale: [reference.md](reference.md)
- **DTOs, Filter/Paged contracts:** [pagination-dtos.md](pagination-dtos.md)
- **SUNAT RUC / RENIEC DNI lookups:** [external-id-lookups.md](external-id-lookups.md)

## Quick sketches

```csharp
services.AddMemoryCache();
services.AddSingleton<ISessionActivityCache, MemorySessionActivityCache>();
```

```csharp
// List
query.AsNoTracking().Select(e => new ListDto(...));
// Detail
query.Include(...).AsSplitQuery();
```
