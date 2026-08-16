import TableSearch from "./TableSearch";

export default function TableToolbar({
  search,
  onSearchChange,
  searchPlaceholder = "Search...",
  children,
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      {onSearchChange && (
        <TableSearch
          value={search}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
        />
      )}

      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}
