import { useSelector } from "react-redux";

import ReportFilters from "../ReportFilters";
import TableSearch from "@/shared/components/table/TableSearch";
import SearchableSelect from "@/shared/components/SearchableSelect";
import DatePicker from "@/shared/components/DatePicker";

import { ROLES } from "@/shared/constants/roles";

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "Pending", label: "Pending" },
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
  { value: "Cancelled", label: "Cancelled" },
];

const PRIORITY_OPTIONS = [
  { value: "all", label: "All Priority" },
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
  { value: "Urgent", label: "Urgent" },
];

export default function MaintenanceReportFilters({
  filters,
  onFilterChange,
  onReset,
  vendors = [],
  branches = [],
}) {
  const user = useSelector((state) => state.auth.user);

  const isBranchAdmin = user?.role === ROLES.BRANCH_ADMIN;

  const vendorOptions = vendors.map((vendor) => ({
    value: vendor._id,
    label: vendor.vendorName,
  }));

  const branchOptions = branches.map((branch) => ({
    value: branch._id,
    label: branch.branchName,
  }));

  const hasFilters =
    Boolean(filters.search?.trim()) ||
    filters.status !== "all" ||
    filters.priority !== "all" ||
    Boolean(filters.vendor) ||
    Boolean(filters.branch) ||
    Boolean(filters.from) ||
    Boolean(filters.to);

  return (
    <ReportFilters onReset={onReset} hasFilters={hasFilters}>
      {/* Status */}
      <SearchableSelect
        value={filters.status || "all"}
        onValueChange={(value) => onFilterChange("status", value)}
        options={STATUS_OPTIONS}
        placeholder="Status"
        searchPlaceholder="Search status..."
        emptyMessage="No status found."
      />

      {/* Priority */}
      <SearchableSelect
        value={filters.priority || "all"}
        onValueChange={(value) => onFilterChange("priority", value)}
        options={PRIORITY_OPTIONS}
        placeholder="Priority"
        searchPlaceholder="Search priority..."
        emptyMessage="No priority found."
      />

      {/* Vendor */}
      <SearchableSelect
        value={filters.vendor || ""}
        onValueChange={(value) => onFilterChange("vendor", value)}
        options={vendorOptions}
        placeholder="Vendor"
        searchPlaceholder="Search vendor..."
        emptyMessage="No vendors found."
      />

      {/* Branch */}
      {!isBranchAdmin && (
        <SearchableSelect
          value={filters.branch || ""}
          onValueChange={(value) => onFilterChange("branch", value)}
          options={branchOptions}
          placeholder="Branch"
          searchPlaceholder="Search branch..."
          emptyMessage="No branches found."
        />
      )}

      {/* From Date */}
      <DatePicker
        value={filters.from || ""}
        onChange={(value) => onFilterChange("from", value)}
        placeholder="From date"
      />

      {/* To Date */}
      <DatePicker
        value={filters.to || ""}
        onChange={(value) => onFilterChange("to", value)}
        placeholder="To date"
      />

      {/* Search */}
      <TableSearch
        value={filters.search}
        onChange={(value) => onFilterChange("search", value)}
        placeholder="Search maintenance..."
        title="Search maintenance records"
      />
    </ReportFilters>
  );
}
