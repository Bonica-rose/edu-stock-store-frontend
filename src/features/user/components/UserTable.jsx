import { DataTable } from "@/shared/components/table";

import { getUserColumns } from "../utils/userColumns";

export default function UserTable({
  users,
  loading,
  onView,
  onEdit,
  onStatusChange,
  onDelete,
}) {
  const columns = getUserColumns({
    onView,
    onEdit,
    onStatusChange,
    onDelete,
  });
  return <DataTable columns={columns} data={users ?? []} loading={loading} />;
}
