import { DataTable } from "@/shared/components/table";
import { getActivityColumns } from "../utils/activityColumns";
import { ROLES } from "@/shared/constants/roles";

export default function ActivityTable({
  activities,
  loading,
  onView,
  currentUser,
}) {
  const canListBranch = [ROLES.SUPER_ADMIN].includes(currentUser?.role);

  const columns = getActivityColumns({
    onView,
    canListBranch,
  });

  return <DataTable columns={columns} data={activities} loading={loading} />;
}
