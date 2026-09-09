import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import StatusFilter from "@/shared/components/filters/StatusFilter";
import SearchableSelect from "@/shared/components/SearchableSelect";

export default function InventoryFilter({
  category = "all",
  vendor = "all",
  branch = "all",
  isActive = "all",
  itemType = "all",
  categories = [],
  vendors = [],
  branches = [],
  onCategoryChange,
  onVendorChange,
  onBranchChange,
  onStatusChange,
  onItemTypeChange,
  showBranchFilter = true,
}) {
  return (
    <div className="flex flex-wrap items-end gap-1">
      {/* Category */}
      <div className="w-full sm:w-55">
        <SearchableSelect
          value={category}
          onValueChange={onCategoryChange}
          placeholder="All Categories"
          searchPlaceholder="Search category..."
          emptyMessage="No categories found."
          options={[
            { value: "all", label: "All Categories" },
            ...categories.map((item) => ({
              value: item._id,
              label: item.categoryName,
            })),
          ]}
        />
      </div>

      {/* Item type */}
      <Select value={itemType} onValueChange={onItemTypeChange}>
        <SelectTrigger className="w-full sm:w-45">
          <SelectValue>
            {itemType === "CONSUMABLE"
              ? "Consumable"
              : itemType === "ASSET"
                ? "Asset"
                : "All Types"}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="CONSUMABLE">Consumable</SelectItem>
          <SelectItem value="ASSET">Asset</SelectItem>
        </SelectContent>
      </Select>

      {/* Vendor */}
      <Select value={vendor} onValueChange={onVendorChange}>
        <SelectTrigger className="w-full sm:w-45">
          <SelectValue>
            {vendor === "all"
              ? "All Vendors"
              : (vendors.find((v) => v._id === vendor)?.vendorName ??
                "All Vendors")}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Vendors</SelectItem>

          {vendors.map((item) => (
            <SelectItem key={item._id} value={item._id}>
              {item.vendorName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Branch */}
      {showBranchFilter && (
        <Select value={branch} onValueChange={onBranchChange}>
          <SelectTrigger className="w-full sm:w-45">
            <SelectValue>
              {branch === "all"
                ? "All Branches"
                : (branches.find((b) => b._id === branch)?.branchName ??
                  "All Branches")}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>

            {branches.map((item) => (
              <SelectItem key={item._id} value={item._id}>
                {item.branchName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Status */}
      <StatusFilter value={isActive} onChange={onStatusChange} />
    </div>
  );
}
