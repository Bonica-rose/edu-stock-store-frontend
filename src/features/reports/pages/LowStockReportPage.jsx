import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import TablePagination from "@/shared/components/table/TablePagination";
import { Card, CardContent } from "@/components/ui/card";

import ReportPageHeader from "../components/ReportPageHeader";
import InventoryFilters from "../components/InventoryFilters";
import LowStockReportTable from "../components/lowStock/LowStockReportTable";
import useInventoryFormOptions from "../../inventory/utils/useInventoryFormOptions";

import { fetchLowStockReport } from "../redux/reportThunks";
import { clearLowStockReport } from "../redux/reportSlice";
import reportService from "../api/reportService";
import { downloadFile } from "@/shared/utils/downloadFile";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { buildReportQuery } from "../utils/reportHelpers";
import usePermission from "@/shared/hooks/usePermission";
import { ROLES } from "@/shared/constants/roles";

export default function LowStockReportPage() {
  const dispatch = useDispatch();

  const { hasPermission } = usePermission();
  const { lowStock } = useSelector((state) => state.reports);
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

  const canExport = hasPermission(PERMISSIONS.REPORT_LOW_STOCK_EXPORT);

  const fetchReport = useCallback(() => {
    const query = buildReportQuery(filters);

    dispatch(fetchLowStockReport(query));
  }, [dispatch, filters]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  useEffect(() => {
    return () => {
      dispatch(clearLowStockReport());
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
        title="Low Stock Report"
        description="View inventory items that have reached the low stock threshold."
        canExport={canExport}
        exporting={exporting}
        onExport={handleExport}
      />

      <Card>
        <CardContent className={`space-y-2`}>
          <InventoryFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            categories={categories}
            vendors={vendors}
            branches={branches}
          />

          {lowStock.error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {lowStock.error}
            </div>
          )}

          <LowStockReportTable
            rows={lowStock.rows}
            loading={lowStock.loading}
            showBranch={!isBranchAdmin}
          />

          <TablePagination
            pagination={lowStock.pagination}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
