import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import TablePagination from "@/shared/components/table/TablePagination";
import ReportPageHeader from "../components/ReportPageHeader";
import MaintenanceReportFilters from "../components/maintenance/MaintenanceReportFilters";
import MaintenanceReportTable from "../components/maintenance/MaintenanceReportTable";
import { useMaintenanceReportFormOptions } from "../utils/useMaintenanceReportFormOptions"

import { fetchMaintenanceReport } from "../redux/reportThunks";
import {
  clearReportsError,
  clearMaintenanceReport,
} from "../redux/reportSlice";
import reportService from "../api/reportService";
import { buildReportQuery } from "../utils/reportHelpers";
import { downloadFile } from "@/shared/utils/downloadFile";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROLES } from "@/shared/constants/roles";

export default function MaintenanceReportPage() {
  const dispatch = useDispatch();

  const { rows, pagination, loading, error } = useSelector(
    (state) => state.reports.maintenance,
  );

  const loggedUser = useSelector((state) => state.auth.user);

  const { hasPermission } = usePermission();

  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
    search: "",
    status: "all",
    priority: "all",
    vendor: "",
    branch: "",
    from: "",
    to: "",
  });

  const [exporting, setExporting] = useState(false);
  // const isBranchAdmin = loggedUser?.role === ROLES.BRANCH_ADMIN;
  const canExport = hasPermission(PERMISSIONS.REPORT_MAINTENANCE_EXPORT);

  const { vendors, branches, canViewBranchFilter } = useMaintenanceReportFormOptions();

  /* Fetch report */
  const fetchReport = useCallback(() => {
    const query = buildReportQuery(filters);

    dispatch(fetchMaintenanceReport(query));
  }, [dispatch, filters]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  useEffect(() => {
    return () => {
      dispatch(clearMaintenanceReport());
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
      priority: "all",
      vendor: "",
      branch: "",
      from: "",
      to: "",
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
      const response = await reportService.exportMaintenanceReport(query);
      downloadFile(response.data, "maintenance-report.xlsx");
      toast.success("Maintenance report exported successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ?? "Failed to export maintenance report.",
      );
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-3">
      <ReportPageHeader
        title="Maintenance Report"
        description="View maintenance activities, priorities, statuses, assignments, and repair costs."
        canExport={canExport}
        exporting={exporting}
        onExport={handleExport}
      />

      <Card>
        <CardContent className={`space-y-2`}>
          <MaintenanceReportFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            vendors={vendors}
            branches={branches}
            showBranchFilter={canViewBranchFilter}
          />

          <MaintenanceReportTable
            rows={rows}
            loading={loading}
            showBranch={canViewBranchFilter}
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
