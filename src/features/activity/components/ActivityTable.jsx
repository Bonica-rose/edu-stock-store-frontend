import { DataTable } from "@/shared/components/table";

import { getActivityColumns } from "../utils/activityColumns";

export default function ActivityTable({ activities, loading, onView }) {
  const columns = getActivityColumns({
    onView,
  });

  return <DataTable columns={columns} data={activities} loading={loading} />;
}
