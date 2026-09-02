import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "@/shared/components/PageHeader";
import { fetchDashboardSummary } from "../redux/reportThunks";
import ReportSummaryCards from "../components/dashboard/ReportSummaryCards";

export default function ReportDashboardPage() {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state) => state.reports.dashboard,
  );  

  useEffect(() => {
    dispatch(fetchDashboardSummary());
  }, [dispatch]);

  return (
    <div className="space-y-3">
      <PageHeader
        title="Reports Dashboard"
        description="Overview of inventory, assets, stock movements, vendors, and maintenance."
      />

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <ReportSummaryCards data={data} loading={loading} />
    </div>
  );
}
