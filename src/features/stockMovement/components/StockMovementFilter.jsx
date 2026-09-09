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
    <div className="flex flex-wrap items-end gap-1">
      {/* Inventory */}
      <div className="w-full sm:w-55">
        <SearchableSelect
          value={filters.inventory}
          onValueChange={onInventoryChange}
          options={inventoryOptions}
          placeholder="All Inventories"
          searchPlaceholder="Search inventory..."
          emptyMessage="No inventory found."
        />
      </div>

      {/* Branch */}
      <Select value={filters.branch} onValueChange={onBranchChange}>
        <SelectTrigger className="w-full sm:w-45">
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
        <SelectTrigger className="w-full sm:w-45">
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
        className="w-full sm:w-45"
        placeholder="Start Date"
      />

      {/* End Date */}
      <DatePicker
        value={filters.endDate}
        onChange={onEndDateChange}
        className="w-full sm:w-45"
        placeholder="End Date"
      />

      {/* Reset */}
      <button
        type="button"
        onClick={onReset}
        className="inline-flex h-8 items-center gap-2 rounded-md border px-3 text-sm bg-secondary"
      >
        <RotateCcw className="size-4" />
        Reset
      </button>
    </div>
  );
}
