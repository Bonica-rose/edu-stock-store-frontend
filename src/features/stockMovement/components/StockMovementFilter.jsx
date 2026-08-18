import { RotateCcw } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import SearchableSelect from "@/shared/components/SearchableSelect";
import DatePicker from "@/shared/components/DatePicker";

export default function StockMovementFilter({
  filters,
  inventories = [],
  branches = [],
  onInventoryChange,
  onBranchChange,
  onMovementTypeChange,
  onStartDateChange,
  onEndDateChange,
  onReset,
}) {
  const inventoryOptions = [
    {
      value: "all",
      label: "All Inventories",
    },
    ...inventories.map((inventory) => ({
      value: inventory._id,
      label: `${inventory.sku} - ${inventory.itemName}`,
    })),
  ];

  return (
    <div className="flex flex-wrap items-center justify-start gap-2">
      {/* Reset */}
      <button
        type="button"
        onClick={onReset}
        className="inline-flex h-8 items-center gap-2 rounded-md border px-3 text-sm hover:bg-muted"
      >
        <RotateCcw className="size-4" />
        Reset
      </button>

      {/* Inventory */}
      <SearchableSelect
        value={filters.inventory}
        onValueChange={onInventoryChange}
        options={inventoryOptions}
        placeholder="All Inventories"
        searchPlaceholder="Search inventory..."
        emptyMessage="No inventory found."
      />

      {/* Branch */}
      <Select value={filters.branch} onValueChange={onBranchChange}>
        <SelectTrigger className="w-36">
          <SelectValue>
            {filters.branch === "all"
              ? "All Branches"
              : (branches.find((b) => b._id === filters.branch)?.branchName ??
                "All Branches")}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Branches</SelectItem>

          {branches.map((branch) => (
            <SelectItem key={branch._id} value={branch._id}>
              {branch.branchName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Movement Type */}
      <Select value={filters.movementType} onValueChange={onMovementTypeChange}>
        <SelectTrigger className="w-44">
          <SelectValue>
            {filters.movementType === "all"
              ? "All Movement Types"
              : filters.movementType === "Stock In"
                ? "Stock In"
                : filters.movementType === "Stock Out"
                  ? "Stock Out"
                  : filters.movementType === "Transfer"
                    ? "Transfer"
                    : filters.movementType === "Adjustment"
                      ? "Adjustment"
                      : "All Movement Types"}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Movement Types</SelectItem>
          <SelectItem value="Stock In">Stock In</SelectItem>
          <SelectItem value="Stock Out">Stock Out</SelectItem>
          <SelectItem value="Transfer">Transfer</SelectItem>
          <SelectItem value="Adjustment">Adjustment</SelectItem>
        </SelectContent>
      </Select>

      {/* Start Date */}
      <DatePicker
        value={filters.startDate}
        onChange={onStartDateChange}
        className="w-40"
        placeholder="Start Date"
      />

      {/* End Date */}
      <DatePicker
        value={filters.endDate}
        onChange={onEndDateChange}
        className="w-40"
        placeholder="End Date"
      />
    </div>
  );
}
