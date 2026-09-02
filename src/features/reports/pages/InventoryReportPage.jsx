import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import TablePagination from "@/shared/components/table/TablePagination";
import { Card, CardContent } from "@/components/ui/card";

import ReportPageHeader from "../components/ReportPageHeader";
import InventoryReportFilters from "../components/InventoryFilters";
import InventoryReportTable from "../components/inventory/InventoryReportTable";
import useInventoryFormOptions from "../../inventory/utils/useInventoryFormOptions";

import { fetchInventoryReport } from "../redux/reportThunks";
import { clearInventoryReport } from "../redux/reportSlice";
import reportService from "../api/reportService";
import { downloadFile } from "@/shared/utils/downloadFile";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { buildReportQuery } from "../utils/reportHelpers";
import usePermission from "@/shared/hooks/usePermission";
import { ROLES } from "@/shared/constants/roles";

export default function InventoryReportPage() {
  const dispatch = useDispatch();

  const { hasPermission } = usePermission();
  const { inventory } = useSelector((state) => state.reports);
  const user = useSelector((state) => state.auth.user);
  const isBranchAdmin = user?.role === ROLES.BRANCH_ADMIN;

  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
    search: "",
    category: "",
    vendor: "",
    branch: "",
    isActive: "all",
    sortBy: "",
    sortOrder: "",
  });

  const [exporting, setExporting] = useState(false);

  const canExport = hasPermission(PERMISSIONS.REPORT_INVENTORY_EXPORT);

  const fetchReport = useCallback(() => {
    const query = buildReportQuery(filters);

    dispatch(fetchInventoryReport(query));
  }, [dispatch, filters]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  useEffect(() => {
    return () => {
      dispatch(clearInventoryReport());
    };
  }, [dispatch]);

  const { categories, vendors, branches } = useInventoryFormOptions();

  const handleFilterChange = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
      page: 1,
    }));
  };

  const handleReset = () => {
    setFilters({
      page: 1,
      limit: 5,
      search: "",
      category: "",
      vendor: "",
      branch: "",
      isActive: "all",
      sortBy: "",
      sortOrder: "",
    });
  };

  const handlePageChange = (page) => {
    setFilters((previous) => ({
      ...previous,
      page,
    }));
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const query = buildReportQuery(filters);
      const response = await reportService.exportInventoryReport(query);
      downloadFile(response.data, "inventory-report.xlsx");

      toast.success("Inventory report exported successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ?? "Failed to export inventory report.",
      );
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-3">
      <ReportPageHeader
        title="Inventory Report"
        description="View inventory stock, category, vendor, branch, and valuation details."
        canExport={canExport}
        exporting={exporting}
        onExport={handleExport}
      />

      <Card>
        <CardContent className={`space-y-2`}>
          <InventoryReportFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            categories={categories}
            vendors={vendors}
            branches={branches}
          />

          {inventory.error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {inventory.error}
            </div>
          )}

          <InventoryReportTable
            rows={inventory.rows}
            loading={inventory.loading}
            showBranch={!isBranchAdmin}
          />

          <TablePagination
            pagination={inventory.pagination}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
