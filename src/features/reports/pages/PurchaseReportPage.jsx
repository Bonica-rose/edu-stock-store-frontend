import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import TablePagination from "@/shared/components/table/TablePagination";
import ReportPageHeader from "../components/ReportPageHeader";
import PurchaseReportFilters from "../components/purchase/PurchaseReportFilters";
import PurchaseReportTable from "../components/purchase/PurchaseReportTable";
import useInventoryFormOptions from "../../inventory/utils/useInventoryFormOptions";

import { fetchPurchaseReport } from "../redux/reportThunks";
import { clearReportsError, clearPurchaseReport } from "../redux/reportSlice";
import reportService from "../api/reportService";
import { buildReportQuery } from "../utils/reportHelpers";
import { downloadFile } from "@/shared/utils/downloadFile";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROLES } from "@/shared/constants/roles";

export default function PurchaseReportPage() {
  const dispatch = useDispatch();

  const { rows, pagination, loading, error } = useSelector(
    (state) => state.reports.purchases,
  );

  const user = useSelector((state) => state.auth.user);

  const { hasPermission } = usePermission();

  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
    search: "",
    vendor: "",
    branch: "",
    to: "",
    from: "",
  });

  const [exporting, setExporting] = useState(false);
  const isBranchAdmin = user?.role === ROLES.BRANCH_ADMIN;
  const canExport = hasPermission(PERMISSIONS.REPORT_PURCHASE_EXPORT);

  /* Fetch report */
  const fetchReport = useCallback(() => {
    const query = buildReportQuery(filters);

    dispatch(fetchPurchaseReport(query));
  }, [dispatch, filters]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  useEffect(() => {
    return () => {
      dispatch(clearPurchaseReport());
    };
  }, [dispatch]);

  /* Error toast */
  useEffect(() => {
    if (error) {
      toast.error(error);

      dispatch(clearReportsError());
    }
  }, [error, dispatch]);

  const { vendors, branches } = useInventoryFormOptions();

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
      vendor: "",
      branch: "",
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
      const response = await reportService.exportPurchaseReport(query);
      downloadFile(response.data, "purchase-report.xlsx");
      toast.success("Purchase report exported successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ?? "Failed to export purchase report.",
      );
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-3">
      <ReportPageHeader
        title="Purchase Report"
        description="View purchase summaries, quantities, vendors, branches, and amounts."
        canExport={canExport}
        exporting={exporting}
        onExport={handleExport}
      />

      <Card>
        <CardContent className={`space-y-2`}>
          <PurchaseReportFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            vendors={vendors}
            branches={branches}
          />

          <PurchaseReportTable
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
