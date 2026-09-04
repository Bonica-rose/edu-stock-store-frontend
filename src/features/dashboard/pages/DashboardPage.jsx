import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDashboard } from "../redux/dashboardThunks";
import { fetchDashboardAIPredictions } from "@/features/ai/redux/aiThunks";

import SummaryCards from "../components/SummaryCards";
import RecentActivities from "../components/RecentActivities";
import AIDashboardSection from "@/features/ai/components/AIDashboardSection";
import Loader from "@/shared/components/Loader";
import { ROLES } from "@/shared/constants/roles";

const AI_ROLES = new Set([ROLES.BRANCH_ADMIN, ROLES.INVENTORY_STAFF]);

export default function DashboardPage() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { summary, recentActivities, loading, error } = useSelector(
    (state) => state.dashboard,
  );

  const canUseDashboardAI = AI_ROLES.has(user?.role);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  useEffect(() => {
    if (canUseDashboardAI) {
      dispatch(fetchDashboardAIPredictions());
    }
  }, [dispatch, canUseDashboardAI]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="text-destructive">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <SummaryCards summary={summary} />

      {canUseDashboardAI && <AIDashboardSection />}

      <RecentActivities activities={recentActivities} />
    </div>
  );
}
