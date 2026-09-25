# Pagination & DTOs (Setup)

Canonical shapes for list/filter pipelines. Live in Application (or shared Setup), not Api.

## Type hierarchy

```text
FilterRequest          → search, ids, active, sort, preselected (no page)
  └── PagedRequest     → + Page, PageSize, optional DateFrom/DateTo
PagedResponse<TDto>    → Items + Total + page metadata
```

Use `FilterRequest` alone for autocomplete / export / unbounded-but-capped lookups (`Take(50)` max).  
Use `PagedRequest` for grids.

## Canonical records

```csharp
public enum SortDirection { Asc, Desc }

public class FilterRequest
{
    public string? Search { get; set; }
    public Guid? Id { get; set; }
    public List<Guid>? Ids { get; set; }
    public bool? IsActive { get; set; }
    /// <summary>When true with IsActive null, include inactive (often needs IgnoreQueryFilters).</summary>
    public bool IncludeInactive { get; set; }
    /// <summary>Combobox: keep current FK visible on page 1 even if inactive / off-filter.</summary>
    public List<Guid>? PreselectedIds { get; set; }
    public List<string>? SortBy { get; set; }
    public SortDirection SortDir { get; set; } = SortDirection.Asc;
}

public class PagedRequest : FilterRequest
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 20;
    public DateTimeOffset? DateFrom { get; set; }
    public DateTimeOffset? DateTo { get; set; }
}

public sealed class PagedResponse<T>
{
    public required IReadOnlyList<T> Items { get; init; }
    public int Total { get; init; }
    public int Page { get; init; }
    public int PageSize { get; init; }
    public int TotalPages { get; init; }
    public bool HasNext { get; init; }
    public bool HasPrevious { get; init; }

    public static PagedResponse<T> Create(
        IReadOnlyList<T> items, int total, int page, int pageSize)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);
        var totalPages = pageSize <= 0 ? 0 : (int)Math.Ceiling(total / (double)pageSize);
        return new PagedResponse<T>
        {
            Items = items,
            Total = total,
            Page = page,
            PageSize = pageSize,
            TotalPages = totalPages,
            HasNext = page < totalPages,
            HasPrevious = page > 1
        };
    }
}
```

Clamp **once** inside `ToPagedResponseAsync` / `Create` — endpoints must not invent their own limits.

## DTO naming

| Suffix | Use | Collections / navs | EF projection |
|--------|-----|--------------------|---------------|
| `*ListDto` / `*SummaryDto` | Grid row, autocomplete option | No | Must `.Select` |
| `*DetailDto` | GET by id | Scalars + small nested DTOs OK | Prefer Select; Include only if needed |
| `*Request` / command record | POST/PUT body | N/A | N/A — validate |
| Entity types | Domain / persistence only | — | Never in API response |

Same resource → **two** read shapes. Do not reuse Detail for grids.

```csharp
public sealed record AreaListDto(Guid Id, string Name, string? Code);
public sealed record AreaDetailDto(
    Guid Id, string Name, string? Code, Guid? ParentId, DateTimeOffset CreatedAt);
```

## Pipeline order (always)

```text
1. AsNoTracking (+ IgnoreAutoIncludes on lists)
2. Filters (Id/Ids, Search, IsActive, date range, domain filters)
3. CountAsync(total)          // same filter, no Skip/Take
4. OrderBy allow-list
5. Skip / Take
6. Select → ListDto           // still IQueryable
7. ToListAsync
8. PagedResponse.Create(...)
```

Never: `Include` → `ToList` → `Skip`/`Take` → map.  
Never: page in memory after loading the full table.

## Query extensions (Application)

Prefer one shared helper used by all modules:

```csharp
public static async Task<PagedResponse<TDto>> ToPagedResponseAsync<TEntity, TDto>(
    this IQueryable<TEntity> query,
    PagedRequest request,
    Expression<Func<TEntity, TDto>> projection,
    CancellationToken ct = default)
{
    var page = Math.Max(1, request.Page);
    var pageSize = Math.Clamp(request.PageSize, 1, 100);
    var total = await query.CountAsync(ct);
    var items = await query
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .Select(projection)
        .ToListAsync(ct);
    return PagedResponse<TDto>.Create(items, total, page, pageSize);
}
```

- **Search:** ILIKE / `EF.Functions.Like` on an allow-listed set of string expressions; empty search = no-op.
- **Sort:** `Dictionary<string, Expression<Func<TEntity, object?>>>` allow-list; unknown key → default (`CreatedAt` desc, etc.).
- **PreselectedIds:** page 1 union preselected first; later pages exclude those ids (combobox UX). Optional — only if product needs it.
- **Soft-delete / IsActive:** if global `HasQueryFilter`, document when to `IgnoreQueryFilters` (`IncludeInactive`, `IsActive == false`, preselected).

## Binding (Minimal APIs)

```csharp
// GET /areas?page=1&pageSize=20&search=fin&sortBy=name&sortDir=asc
group.MapGet("/", async (
    [AsParameters] PagedRequest request,
    AppDbContext db,
    CancellationToken ct) => { ... });
```

Or explicit query params mapped into `PagedRequest`. OpenAPI: document clamp and max page size.

## What auditors must flag

| Smell | Why |
|-------|-----|
| API returns entity / `IQueryable` entity | Leaks schema, over-fetch, tracking |
| Single DTO for list and detail | Forces fat lists |
| `ToListAsync` then `Select(ToDto)` on lists | Mapping after materialize |
| Unbounded `GetAll` without Take/page | Melts under growth |
| `pageSize` unbounded or 9999 | Export disguised as page |
| Sort by raw client string via reflection | Injection / unexpected SQL |
| Count after Skip/Take | Wrong Total |
| Different clamp per endpoint | Inconsistent UX / DoS surface |

## Throughput link

Pagination + ListDto projection is the **read-side** half of Setup throughput (alongside session cache).  
A cached auth path still dies if every grid loads full graphs.

## Checklist (when adding a new list endpoint)

```
- [ ] PagedRequest (or capped FilterRequest)
- [ ] *ListDto with only needed columns
- [ ] AsNoTracking
- [ ] Count then Skip/Take then Select
- [ ] Sort/search allow-list
- [ ] PagedResponse<T> envelope
- [ ] No Include of collections on the list path
```
