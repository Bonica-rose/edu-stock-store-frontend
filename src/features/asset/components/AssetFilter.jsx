import { RotateCcw } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import SearchableSelect from "@/shared/components/SearchableSelect";

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
    <>
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
        <SelectTrigger className="w-36">
          <SelectValue>
            {filters.status === "all" ? "All Statuses" : filters.status}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="Available">Available</SelectItem>
          <SelectItem value="Assigned">Assigned</SelectItem>
          <SelectItem value="Maintenance">Maintenance</SelectItem>
          <SelectItem value="Retired">Retired</SelectItem>
        </SelectContent>
      </Select>

      {/* Assigned To */}
      <SearchableSelect
        value={filters.assignedTo}
        onValueChange={onAssignedToChange}
        options={userOptions}
        placeholder="All Users"
        searchPlaceholder="Search user..."
        emptyMessage="No user found."
      />

      {/* Active Status */}
      <Select value={filters.isActive} onValueChange={onIsActiveChange}>
        <SelectTrigger className="w-32">
          <SelectValue>
            {filters.isActive === "all"
              ? "All Status"
              : filters.isActive === "true"
                ? "Active"
                : "Inactive"}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="true">Active</SelectItem>
          <SelectItem value="false">Inactive</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
