import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import TablePagination from "@/shared/components/table/TablePagination";
import ReportPageHeader from "../components/ReportPageHeader";
import AssetReportFilters from "../components/asset/AssetReportFilters";
import AssetReportTable from "../components/asset/AssetReportTable";
import useAssetFormOptions from "../../asset/utils/useAssetFormOptions";

import { fetchAssetReport } from "../redux/reportThunks";
import { clearReportsError, clearAssetReport } from "../redux/reportSlice";
import reportService from "../api/reportService";
import { buildReportQuery } from "../utils/reportHelpers";
import { downloadFile } from "@/shared/utils/downloadFile";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROLES } from "@/shared/constants/roles";

export default function AssetReportPage() {
  const dispatch = useDispatch();

  const { rows, pagination, loading, error } = useSelector(
    (state) => state.reports.assets,
  );  

  const user = useSelector((state) => state.auth.user);
  const { branches, users } = useAssetFormOptions();

  const { hasPermission } = usePermission();

  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
    search: "",
    condition: "",
    assignedTo: "",
    branch: "",
    isActive: "all",
  });

  const [exporting, setExporting] = useState(false);

  const isBranchAdmin = user?.role === ROLES.BRANCH_ADMIN;

  const canExport = hasPermission(PERMISSIONS.REPORT_ASSET_EXPORT);

  /* Fetch report */
  const fetchReport = useCallback(() => {
    const query = buildReportQuery(filters);

    dispatch(fetchAssetReport(query));
  }, [dispatch, filters]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  useEffect(() => {
    return () => {
      dispatch(clearAssetReport());
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
      condition: "",
      assignedTo: "",
      branch: "",
      isActive: "all",
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
      const response = await reportService.exportAssetReport(query);
      downloadFile(response.data, "asset-report.xlsx");
      toast.success("Asset report exported successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ?? "Failed to export asset report.",
      );
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-3">
      <ReportPageHeader
        title="Asset Report"
        description="View asset details, assignment, status, condition, and valuation."
        canExport={canExport}
        exporting={exporting}
        onExport={handleExport}
      />

      <Card>
        <CardContent className={`space-y-2`}>
          <AssetReportFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            staff={users}
            branches={branches}
          />

          <AssetReportTable
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
