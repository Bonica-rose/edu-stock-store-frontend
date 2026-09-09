import BranchFilter from "@/shared/components/filters/BranchFilter";
import VendorFilter from "@/shared/components/filters/VendorFilter";
import DatePicker from "@/shared/components/DatePicker";

export default function PurchaseFilter({
  startDate,
  endDate,
  vendor,
  branch,
  vendors = [],
  branches = [],
  isBranchAdmin,
  onStartDateChange,
  onEndDateChange,
  onVendorChange,
  onBranchChange,
}) {
  return (
    <div className="flex flex-wrap items-end gap-1">
      {/* Start Date */}
      <DatePicker
        value={startDate}
        onChange={onStartDateChange}
        className="w-full sm:w-45"
        placeholder="Start Date"
      />

      {/* End Date */}
      <DatePicker
        value={endDate}
        onChange={onEndDateChange}
        className="w-full sm:w-45"
        placeholder="End Date"
      />

      {/* Vendor */}
      <VendorFilter
        value={vendor}
        vendors={vendors}
        onChange={onVendorChange}
      />

      {/* Branch */}
      {!isBranchAdmin && (
        <BranchFilter
          value={branch}
          branches={branches}
          onChange={onBranchChange}
        />
      )}
    </div>
  );
}
