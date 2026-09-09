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
    <div className="space-y-1">
      {/* Top row: Search + Actions */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        {onSearchChange && (
          <TableSearch
            value={search}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
            title={searchTitle}
          />
        )}

        <div className="flex w-full sm:w-auto items-center sm:items-end">
          {children}
        </div>
      </div>

      {/* Second row: Filters ONLY */}
      {filterRow && (
        <div className="flex flex-wrap items-center gap-1">{filterRow}</div>
      )}
    </div>
  );
}
