import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDashboard } from "../redux/dashboardThunks";

import SummaryCards from "../components/SummaryCards";
import RecentActivities from "../components/RecentActivities";
import Loader from "@/shared/components/Loader";

export default function DashboardPage() {
  const dispatch = useDispatch();

  const { summary, recentActivities, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  if (loading) {
    return <div><Loader /></div>;
  }

  if (error) {
    return <div className="text-destructive">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <SummaryCards summary={summary} />

      <RecentActivities activities={recentActivities} />
    </div>
  );
}
