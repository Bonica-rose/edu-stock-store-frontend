import { useSelector } from "react-redux";
import ReportFilters from "./ReportFilters";
import TableSearch from "@/shared/components/table/TableSearch";
import SearchableSelect from "@/shared/components/SearchableSelect";
import { ROLES } from "@/shared/constants/roles";

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

export default function InventoryFilters({
  filters,
  onFilterChange,
  onReset,
  categories = [],
  vendors = [],
  branches = [],
}) {
  const user = useSelector((state) => state.auth.user);
  const isBranchAdmin = user?.role === ROLES.BRANCH_ADMIN;

  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.categoryName,
  }));

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
    Boolean(filters.category) ||
    Boolean(filters.vendor) ||
    Boolean(filters.branch) ||
    filters.isActive !== "all";

  return (
    <ReportFilters onReset={onReset} hasFilters={hasFilters}>
      {/* Category */}
      <SearchableSelect
        value={filters.category || ""}
        onValueChange={(option) =>
          onFilterChange("category", option?.value ?? "")
        }
        options={categoryOptions}
        placeholder="Category"
        searchPlaceholder="Search category..."
        emptyMessage="No categories found."
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
        placeholder="Search inventory..."
        title="Search inventory by SKU or Item name"
      />
    </ReportFilters>
  );
}
