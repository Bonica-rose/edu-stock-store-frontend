import { RotateCcw } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import SearchableSelect from "@/shared/components/SearchableSelect";
import StatusFilter from "@/shared/components/filters/StatusFilter";

export default function AssetFilter({
  filters,
  inventories = [],
  branches = [],
  users = [],
  onInventoryChange,
  onBranchChange,
  onStatusChange,
  onAssignedToChange,
  onIsActiveChange,
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

  const userOptions = [
    {
      value: "all",
      label: "All Users",
    },
    ...users.map((user) => ({
      value: user._id,
      label: `${user.firstName} ${user.lastName}`,
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
              : (branches.find((branch) => branch._id === filters.branch)
                  ?.branchName ?? "All Branches")}
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

      {/* Status */}
      <Select value={filters.status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-45">
          <SelectValue>
            {filters.status === "all" ? "All Asset Status" : filters.status}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Asset Status</SelectItem>
          <SelectItem value="Available">Available</SelectItem>
          <SelectItem value="Assigned">Assigned</SelectItem>
          <SelectItem value="Maintenance">Maintenance</SelectItem>
          <SelectItem value="Retired">Retired</SelectItem>
        </SelectContent>
      </Select>

      {/* Assigned To */}
      <div className="w-full sm:w-55">
        <SearchableSelect
          value={filters.assignedTo}
          onValueChange={onAssignedToChange}
          options={userOptions}
          placeholder="All Users"
          searchPlaceholder="Search user..."
          emptyMessage="No user found."
        />
      </div>

      {/* Active Status */}
      <StatusFilter value={filters.isActive} onChange={onIsActiveChange} />

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
