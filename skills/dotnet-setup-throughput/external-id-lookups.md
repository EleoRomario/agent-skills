# External ID lookups (SUNAT / RENIEC)

Pattern for resolving **RUC** (SUNAT / legal entity) and **DNI** (RENIEC / natural person) without calling the provider on every keystroke or request.

Belongs in a **lib / shared Setup capability**, not inside each module’s controllers. Same throughput idea as session cache: **local hit first, remote only on miss**.

## Flow (always)

```text
1. Validate format (FluentValidation)
   - DNI: 8 digits
   - RUC: 11 digits (+ optional check digit)
2. Read durable cache (DB table keyed by DNI/RUC)  ← AsNoTracking
3. If hit → map to *LookupDto / *CacheResponse → return
4. If miss → IXxxLookupService (HttpClient) → provider
5. Persist cache entity → SaveChanges
6. Return DTO (never raw provider JSON / scrape HTML)
```

Optional: short **memory** TTL in front of DB for hot repeats in the same instance (not a substitute for durable cache).

## Ports

```csharp
public interface IDniLookupService
{
    Task<DniLookupResult?> FetchNameByDniAsync(string dni, CancellationToken ct = default);
}

public interface IRucLookupService
{
    Task<SunatContributorCache?> FetchByRucAsync(string ruc, CancellationToken ct = default);
}
```

- Application/handlers own **cache-aside** (repo → remote → save).
- Infrastructure owns HTTP / scrape / API Peru; use **`IHttpClientFactory` / `AddHttpClient<T>`** — never `new HttpClient()`.
- Secrets (API tokens) via **IOptions + user secrets / env** — never in source.

## Durable cache entities

| Key | Cache table (example) | Typical fields |
|-----|----------------------|----------------|
| DNI | `NaturalPersonCache` / Reniec cache | Names, paternal/maternal surname, full name, fetched-at |
| RUC | `SunatContributorCache` | Business name, status, address, ubigeo, activities, fetched-at |

- Unique index on DNI / RUC.
- List/admin UIs over the cache use **PagedRequest + ListDto** ([pagination-dtos.md](pagination-dtos.md)).
- Lookup-by-key endpoints (`GET .../by-dni/{dni}`) are **not** paginated; they return one Detail/Lookup DTO.

## API surface (suggested)

```text
GET /api/lookups/dni/{dni}     → ReniecLookupDto   (cache-aside)
GET /api/lookups/ruc/{ruc}     → SunatLookupDto
GET /api/lookups/dni?page=…    → PagedResponse<ReniecListDto>  (admin/cache browser)
GET /api/lookups/ruc?page=…    → PagedResponse<SunatListDto>
```

Authorize appropriately (often Authenticated or a specific permission — these are PII / business data).

## Provider strategy

| Preference | Notes |
|------------|--------|
| Official/paid API (e.g. API Peru) first | Stable JSON, rate limits, token |
| Scrape fallback | Fragile; isolate; timeouts; log failures |
| Timeouts + cancellation | Always pass `CancellationToken` |
| No sync-over-async | Never `.Result` on HTTP |

Document which provider is primary in project rules; keep fallback behind feature flag if needed.

## Throughput & resilience

| Do | Don't |
|----|--------|
| Cache-aside in DB before remote | Call SUNAT/RENIEC on every form blur without cache |
| Deduplicate concurrent misses (optional lock/semaphore per key) | Stampede: 50 parallel scrapes for same RUC |
| Rate-limit lookup endpoints | Unauthenticated public proxy to government sites |
| Return ProblemDetails on not found / provider down | Leak HTML / upstream stack traces |
| Refresh policy (optional TTL / “force refresh” query) | Silent forever-stale without a way to refresh |

**Stampede:** if many requests miss the same DNI/RUC at once, use a single-flight (e.g. `SemaphoreSlim` per key, or distributed lock later) so only one remote call runs.

## Relation to People / Organization

- Lookup **fills** NaturalPerson / LegalEntity create forms — it does **not** replace your domain Person aggregate.
- Copy fields into your entity on create/update; keep cache as **external snapshot**, not source of truth for app workflows (unless product says otherwise).
- Soft-delete / IsActive on *your* Person is independent of cache rows.

## Audit checklist

```
- [ ] Format validation before any I/O
- [ ] DB cache hit path with AsNoTracking
- [ ] Remote only on miss; result persisted
- [ ] IHttpClientFactory registered
- [ ] Token/options not hardcoded
- [ ] DTO responses; paged list for cache admin
- [ ] Auth on lookup endpoints
- [ ] Timeouts + CT; no .Result
- [ ] (Optional) force-refresh + single-flight on miss
```

## Grep

```text
IDniLookupService|IRucLookupService|FindByDni|FindByRuc|SunatContributor|ReniecCache|ApiPeru|new HttpClient
```
