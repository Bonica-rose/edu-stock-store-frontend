import { useSelector } from "react-redux";
import ReportFilters from "../ReportFilters";
import TableSearch from "@/shared/components/table/TableSearch";
import SearchableSelect from "@/shared/components/SearchableSelect";
import { ROLES } from "@/shared/constants/roles";
import DatePicker from "@/shared/components/DatePicker";

const MOVEMENT_TYPE_OPTIONS = [
  {
    value: "all",
    label: "All Movement Types",
  },
  {
    value: "Stock In",
    label: "Stock In",
  },
  {
    value: "Stock Out",
    label: "Stock Out",
  },
  {
    value: "Transfer",
    label: "Transfer",
  },
  {
    value: "Adjustment",
    label: "Adjustment",
  },
];

export default function StockMovementReportFilters({
  filters,
  onFilterChange,
  onReset,
  inventories = [],
  branches = [],
  users = [],
}) {
  const user = useSelector((state) => state.auth.user);
  const isBranchAdmin = user?.role === ROLES.BRANCH_ADMIN;

  const inventoryOptions = inventories.map((inventory) => ({
    value: inventory._id,
    label: `${inventory.sku} - ${inventory.itemName}`,
  }));

  const branchOptions = branches.map((branch) => ({
    value: branch._id,
    label: branch.branchName,
  }));
  const userOptions = users.map((user) => ({
    value: user._id,
    label: `${user.firstName} ${user.lastName}` ?? "Unknown User",
  }));

  const hasFilters =
    Boolean(filters.search?.trim()) ||
    Boolean(filters.inventory) ||
    filters.movementType !== "all" ||
    Boolean(filters.performedBy) ||
    Boolean(filters.branch) ||
    Boolean(filters.fromDate) ||
    Boolean(filters.toDate);

  return (
    <ReportFilters onReset={onReset} hasFilters={hasFilters}>
      {/* Inventory */}
      <SearchableSelect
        value={filters.inventory || ""}
        onValueChange={(option) => onFilterChange("inventory", option)}
        options={inventoryOptions}
        placeholder="Inventory"
        searchPlaceholder="Search inventory..."
        emptyMessage="No inventory found."
      />

      {/* Movement Type */}
      <SearchableSelect
        value={filters.movementType || "all"}
        onValueChange={(value) => onFilterChange("movementType", value)}
        options={MOVEMENT_TYPE_OPTIONS}
        placeholder="Movement Type"
        searchPlaceholder="Search movement type..."
        emptyMessage="No movement types found."
      />

      {/* Performed By */}
      <SearchableSelect
        value={filters.performedBy || ""}
        onValueChange={(option) => onFilterChange("performedBy", option)}
        options={userOptions}
        placeholder="Performed By"
        searchPlaceholder="Search user..."
        emptyMessage="No users found."
      />

      {/* Branch */}
      {!isBranchAdmin && (
        <SearchableSelect
          value={filters.branch || ""}
          onValueChange={(option) => onFilterChange("branch", option)}
          options={branchOptions}
          placeholder="Branch"
          searchPlaceholder="Search branch..."
          emptyMessage="No branches found."
        />
      )}

      {/* From Date */}
      <DatePicker
        value={filters.fromDate || ""}
        onChange={(value) => onFilterChange("fromDate", value)}
        placeholder="From date"
      />

      {/* To Date */}
      <DatePicker
        value={filters.toDate || ""}
        onChange={(value) => onFilterChange("toDate", value)}
        placeholder="To date"
          />
          
      {/* Search */}
      <TableSearch
        value={filters.search}
        onChange={(value) => onFilterChange("search", value)}
        placeholder="Search stock movements..."
        title="Search stock movements by SKU or Item Name"
      />
    </ReportFilters>
  );
}
