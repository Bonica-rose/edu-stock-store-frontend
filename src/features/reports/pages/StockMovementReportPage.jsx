import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import TablePagination from "@/shared/components/table/TablePagination";
import ReportPageHeader from "../components/ReportPageHeader";
import StockMovementReportFilters from "../components/stockMovement/StockMovementReportFilters";
import StockMovementReportTable from "../components/stockMovement/StockMovementReportTable";
import useStockMovementFormOptions from "../../stockMovement/utils/useStockMovementFormOptions";

import { fetchUsers } from "@/features/user/redux/userThunks";
import { fetchStockMovementReport } from "../redux/reportThunks";
import {
  clearStockMovementReport,
  clearReportsError,
} from "../redux/reportSlice";
import reportService from "../api/reportService";
import { buildReportQuery } from "../utils/reportHelpers";
import { downloadFile } from "@/shared/utils/downloadFile";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROLES } from "@/shared/constants/roles";

export default function StockMovementReportPage() {
  const dispatch = useDispatch();

  const { rows, pagination, loading, error } = useSelector(
    (state) => state.reports.stockMovements,
  );

  const user = useSelector((state) => state.auth.user);
  const { users } = useSelector((state) => state.user);
  const { inventories, branches } = useStockMovementFormOptions();

  const { hasPermission } = usePermission();

  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
    search: "",
    inventory: "",
    movementType: "all",
    performedBy: "",
    branch: "",
    fromDate: "",
    toDate: "",
  });

  const [exporting, setExporting] = useState(false);

  const isBranchAdmin = user?.role === ROLES.BRANCH_ADMIN;

  const canExport = hasPermission(PERMISSIONS.REPORT_STOCK_MOVEMENT_EXPORT);

  /* Fetch users */
  const loadUsers = useCallback(() => {
    // Implementation for fetching users
    if (!users.length) {
      dispatch(
        fetchUsers({
          page: 1,
          limit: 100,
          isActive: "true",
        }),
      );
    }
  }, [dispatch, users.length]);

  /* Fetch report */
  const fetchReport = useCallback(() => {
    const query = buildReportQuery(filters);

    dispatch(fetchStockMovementReport(query));
  }, [dispatch, filters]);

  useEffect(() => {
    loadUsers();
    fetchReport();
  }, [fetchReport]);

  useEffect(() => {
    return () => {
      dispatch(clearStockMovementReport());
    };
  }, [dispatch]);

  /* Error toast */
  useEffect(() => {
    if (error) {
      toast.error(error);

      dispatch(clearReportsError());
    }
  }, [error, dispatch]);

  /* Filter change */
  const handleFilterChange = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
      page: 1,
    }));
  };

  /* Reset filters */
  const handleReset = () => {
    setFilters({
      page: 1,
      limit: 5,
      search: "",
      inventory: "",
      movementType: "all",
      performedBy: "",
      branch: "",
      fromDate: "",
      toDate: "",
    });
  };

  /* Pagination */
  const handlePageChange = (page) => {
    setFilters((previous) => ({
      ...previous,
      page,
    }));
  };

  /* Export */
  const handleExport = async () => {
    try {
      setExporting(true);
      const query = buildReportQuery(filters);
      const response = await reportService.exportStockMovementReport(query);
      downloadFile(response.data, "stock-movement-report.xlsx");
      toast.success("Stock movement report exported successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ??
          "Failed to export stock movement report.",
      );
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-3">
      <ReportPageHeader
        title="Stock Movement Report"
        description="View stock-in, stock-out, transfer, and adjustment movements."
        canExport={canExport}
        exporting={exporting}
        onExport={handleExport}
      />

      <Card>
        <CardContent className={`space-y-2`}>
          <StockMovementReportFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            inventories={inventories}
            branches={branches}
            users={users}
          />

          <StockMovementReportTable
            rows={rows}
            loading={loading}
            showBranch={!isBranchAdmin}
          />

          {pagination && (
            <TablePagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
