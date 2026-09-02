import ReportFilters from "../ReportFilters";
import TableSearch from "@/shared/components/table/TableSearch";
import SearchableSelect from "@/shared/components/SearchableSelect";

const ACTIVE_STATUS_OPTIONS = [
  {
    value: "all",
    label: "All Status",
  },
  {
    value: "true",
    label: "Active",
  },
  {
    value: "false",
    label: "Inactive",
  },
];

export default function VendorReportFilters({
    filters,
    onFilterChange,
    onReset,
}) {

    const hasFilters =
      Boolean(filters.search?.trim()) || filters.status !== "all";
    
  return (
    <ReportFilters onReset={onReset} hasFilters={hasFilters}>
      {/* Active Status */}
      <SearchableSelect
        value={filters.status || "all"}
        onValueChange={(value) => onFilterChange("status", value)}
        options={ACTIVE_STATUS_OPTIONS}
        placeholder="Status"
        searchPlaceholder="Search status..."
        emptyMessage="No status found."
      />

      {/* Search */}
      <TableSearch
        value={filters.search}
        onChange={(value) => onFilterChange("search", value)}
        placeholder="Search vendors..."
        title="Search vendors by code,name or contact person"
      />
    </ReportFilters>
  );    

};
