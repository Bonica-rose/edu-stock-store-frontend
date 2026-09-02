import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import TablePagination from "@/shared/components/table/TablePagination";
import ReportPageHeader from "../components/ReportPageHeader";
import VendorReportFilters from "../components/vendor/VendorReportFilters";
import VendorReportTable from "../components/vendor/VendorReportTable";

import { fetchVendorReport } from "../redux/reportThunks";
import { clearReportsError, clearVendorReport } from "../redux/reportSlice";
import reportService from "../api/reportService";
import { buildReportQuery } from "../utils/reportHelpers";
import { downloadFile } from "@/shared/utils/downloadFile";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function VendorReportPage() {
  const dispatch = useDispatch();

  const { rows, pagination, loading, error } = useSelector(
    (state) => state.reports.vendors,
  );

  const { hasPermission } = usePermission();

  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
    search: "",
    status: "all",
  });

  const [exporting, setExporting] = useState(false);
  const canExport = hasPermission(PERMISSIONS.REPORT_VENDOR_EXPORT);

  /* Fetch report */
  const fetchReport = useCallback(() => {
    const query = buildReportQuery(filters);

    dispatch(fetchVendorReport(query));
  }, [dispatch, filters]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  useEffect(() => {
    return () => {
      dispatch(clearVendorReport());
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
      status: "all",
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
      const response = await reportService.exportVendorReport(query);
      downloadFile(response.data, "vendor-report.xlsx");
      toast.success("Vendor report exported successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ?? "Failed to export vendor report.",
      );
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-3">
      <ReportPageHeader
        title="Vendor Report"
        description="View vendor information, inventory usage, purchase counts, and purchase amounts."
        canExport={canExport}
        exporting={exporting}
        onExport={handleExport}
      />

      <Card>
        <CardContent className={`space-y-2`}>
          <VendorReportFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />

          <VendorReportTable rows={rows} loading={loading} showBranch={false} />

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
