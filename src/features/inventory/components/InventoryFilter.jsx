import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import SearchableSelect from "@/shared/components/SearchableSelect";

export default function InventoryFilter({
    category = "all",
    vendor = "all",
    branch = "all",
    isActive = "all",
    categories = [],
    vendors = [],
    branches = [],
    onCategoryChange,
    onVendorChange,
    onBranchChange,
    onStatusChange,
}) {
    return (
      <>
        {/* Category */}
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

        {/* Vendor */}
        <Select value={vendor} onValueChange={onVendorChange}>
          <SelectTrigger className="w-40">
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
        <Select value={branch} onValueChange={onBranchChange}>
          <SelectTrigger className="w-40">
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

        {/* Status */}
        <Select value={isActive} onValueChange={onStatusChange}>
          <SelectTrigger className="w-32.5">
            <SelectValue>
              {isActive === "true"
                ? "Active"
                : isActive === "false"
                  ? "Inactive"
                  : "All Status"}
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
