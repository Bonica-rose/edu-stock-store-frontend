import { useSelector } from "react-redux";
import ReportFilters from "../ReportFilters";
import TableSearch from "@/shared/components/table/TableSearch";
import SearchableSelect from "@/shared/components/SearchableSelect";
import { ROLES } from "@/shared/constants/roles";

const CONDITION_OPTIONS = [
  {
    value: "all",
    label: "All Asset Conditions",
  },
  {
    value: "Good",
    label: "Good",
  },
  {
    value: "Damaged",
    label: "Damaged",
  },
  {
    value: "Under Maintenance",
    label: "Under Maintenance",
  },
  {
    value: "Retired",
    label: "Retired",
  },
];

const ACTIVE_STATUS_OPTIONS = [
  {
    value: "all",
    label: "All Active Status",
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

export default function AssetReportFilters({
  filters,
  onFilterChange,
  onReset,
  staff = [],
  branches = [],
}) {
  const user = useSelector((state) => state.auth.user);
  const isBranchAdmin = user?.role === ROLES.BRANCH_ADMIN;
  
  const staffOptions = staff.map((member) => ({
    value: member._id,
    label: `${member.firstName} ${member.lastName}` ?? "Unknown Staff",
  }));

  const branchOptions = branches.map((branch) => ({
    value: branch._id,
    label: branch.branchName,
  }));

  const hasFilters =
    Boolean(filters.search?.trim()) ||
    Boolean(filters.condition) ||
    Boolean(filters.assignedTo) ||
    Boolean(filters.branch) ||
    filters.isActive !== "all";

  return (
    <ReportFilters onReset={onReset} hasFilters={hasFilters}>
      {/* Condition */}
      <SearchableSelect
        value={filters.condition || "all"}
        onValueChange={(value) => onFilterChange("condition", value)}
        options={CONDITION_OPTIONS}
        placeholder="Condition"
        searchPlaceholder="Search condition..."
        emptyMessage="No conditions found."
      />

      {/* Assigned To */}
      <SearchableSelect
        value={filters.assignedTo || ""}
        onValueChange={(value) => onFilterChange("assignedTo", value)}
        options={staffOptions}
        placeholder="Assigned To"
        searchPlaceholder="Search staff..."
        emptyMessage="No staff found."
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

      {/* Active Status */}
      <SearchableSelect
        value={filters.isActive || "all"}
        onValueChange={(value) => onFilterChange("isActive", value)}
        options={ACTIVE_STATUS_OPTIONS}
        placeholder="Status"
        searchPlaceholder="Search status..."
        emptyMessage="No status found."
      />

      {/* Search */}
      <TableSearch
        value={filters.search}
        onChange={(value) => onFilterChange("search", value)}
        placeholder="Search assets..."
        title="Search assets by asset code or serial number"
      />
    </ReportFilters>
  );
}
