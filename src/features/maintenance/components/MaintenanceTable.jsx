import { DataTable } from "@/shared/components/table";
import { getMaintenanceColumns } from "../utils/maintenanceColumns";

export default function MaintenanceTable({
  maintenances,
  loading,
  onView,
  onEdit,
  onDelete,
}) {
  const columns = getMaintenanceColumns({
    onView,
    onEdit,
    onDelete,
  });

  return (
    <DataTable columns={columns} data={maintenances ?? []} loading={loading} />
  );
}
