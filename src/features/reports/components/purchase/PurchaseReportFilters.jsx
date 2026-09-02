import { useSelector } from "react-redux";
import ReportFilters from "../ReportFilters";
import TableSearch from "@/shared/components/table/TableSearch";
import SearchableSelect from "@/shared/components/SearchableSelect";
import { ROLES } from "@/shared/constants/roles";
import DatePicker from "@/shared/components/DatePicker";

export default function PurchaseReportFilters({
    filters,
    onFilterChange,
    onReset,
    vendors = [],
    branches = [],
}) {
    const user = useSelector((state) => state.auth.user);
    const isBranchAdmin = user?.role === ROLES.BRANCH_ADMIN;

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
        Boolean(filters.vendor) ||
        Boolean(filters.branch) ||
        Boolean(filters.fromDate) ||
        Boolean(filters.toDate);

    return (
        <ReportFilters onReset={onReset} hasFilters={hasFilters}>
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
                placeholder="Search purchases..."
                title="Search purchases by Purchase Number"
            />
        </ReportFilters>
    );
}