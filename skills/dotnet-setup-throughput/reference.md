# Setup throughput — reference

## Grep patterns

```text
NullPermissionCache|IPermissionCache|ISessionActivityCache|IMemoryCache|IDistributedCache|HybridCache
OnValidatePrincipal|AuthenticationHandler|IsActiveAsync
UserContextMiddleware|UseUserContext|X-Active-
HasQueryFilter|AutoInclude|IgnoreAutoIncludes|AsSplitQuery|AsNoTracking
EntityRepository|ApplyIncludes|FindManyPaged|CommandHandler
PagedRequest|PagedResponse|FilterRequest|ListDto|DetailDto
IDniLookupService|IRucLookupService|FindByDni|FindByRuc|SunatContributor|ReniecCache|ApiPeru
SaveChangesInterceptor|RestrictDelete|DomainEventInterceptor
GetAwaiter().GetResult()|Task.Run\(|new HttpClient\(
Include\(.*\).*ToList|pageSize.*999|Take\(10000\)
```

## Roundtrip budget (authenticated GET)

| Target | Budget before handler |
|--------|------------------------|
| Good | 0 (cache hit) |
| Acceptable | 1 (session check only) |
| Bad | 3+ (session + perms + user context) |
| Smell | 4–5+ fixed roundtrips every request |

## Cache key ideas

```text
session:{sessionId}           → active flag + userId + expires
perms:{userId}                → HashSet permission keys (TTL 1–5 min)
userctx:{accountId}:{branch?} → snapshot DTO (TTL 30–120s)
```

Invalidate on: logout, revoke session, role/permission change, profile/branch grant change.

## List vs detail (short)

| API kind | Tracking | AutoInclude | Shape |
|----------|----------|-------------|-------|
| Grid / autocomplete | No | Off | `*ListDto` + page/cap |
| Detail GET | Optional | Small OK | `*DetailDto` |
| Command load | Yes | As needed | Entity |
| Export | No | Off | Dedicated endpoint / Dapper |

Full DTO + pagination contract: [pagination-dtos.md](pagination-dtos.md).

## External ID lookups (short)

| Step | Action |
|------|--------|
| 1 | Validate DNI/RUC format |
| 2 | DB cache by key (`AsNoTracking`) |
| 3 | Miss → `IHttpClient` lookup → persist |
| 4 | Return Lookup DTO |

Details: [external-id-lookups.md](external-id-lookups.md).

## Write interceptor stance

Keep: UTC normalize, UpdatedAt stamp, locked fields, domain events.

Watch: Restrict-delete EXISTS fan-out; huge audit batches; post-commit scope storms.

## Scale verdict cheat sheet

| Load | Needs |
|------|--------|
| Hundreds concurrent, 1M req/day | Thin reads + memory cache |
| Multi-instance API | Distributed cache for session/perms/context |
| Thousands concurrent | Cache + paged ListDtos + pool sizing + p95 |
| 10k concurrent “at once” | Cut fixed DB path first |

## Relation to other skills

- `authentication` — schemes/policies; this skill owns **per-request DB cost**.
- `ef-core` — query APIs; this skill owns **list defaults + projection**.
- `dotnet-backend-patterns` — general; this skill is Setup/throughput + paging DTOs.

## Acide Platform notes

- Session: `ISessionActivityCache` / `MemorySessionActivityCache`, TTL `CookieAuth:SessionCacheSeconds`
- Redis not required for a single Auth.Api instance
- When auditing lists: `PagedRequest`/`PagedResponse` + `*ListDto` — [pagination-dtos.md](pagination-dtos.md)
- When adding People tax-id / DNI helpers: follow [external-id-lookups.md](external-id-lookups.md) (not implemented in platform yet)
