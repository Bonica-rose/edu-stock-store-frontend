import TableSearch from "./TableSearch";

export default function TableToolbar({
  search,
  onSearchChange,
  searchPlaceholder = "Search...",
  searchTitle,
  children,
  filterRow,
}) {
  return (
    <div className="space-y-3">
      {/* Top row: Search + Actions */}
      <div className="flex items-center justify-between gap-4">
        {onSearchChange && (
          <TableSearch
            value={search}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
            title={searchTitle}
          />
        )}

        <div className="flex items-center gap-2">{children}</div>
      </div>

      {/* Second row: Filters ONLY */}
      {filterRow && (
        <div className="flex flex-wrap items-center gap-2">{filterRow}</div>
      )}
    </div>
  );
}
