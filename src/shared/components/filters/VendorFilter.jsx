import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function VendorFilter({ value, onChange, vendors = [] }) {
  const selectedVendor = vendors.find((vendor) => vendor._id === value);
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-52">
        <SelectValue>
          {value === "all"
            ? "All Vendors"
            : (selectedVendor?.vendorName ?? "All Vendors")}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All Vendors</SelectItem>

        {vendors.map((vendor) => (
          <SelectItem key={vendor._id} value={vendor._id}>
            {vendor.vendorName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
