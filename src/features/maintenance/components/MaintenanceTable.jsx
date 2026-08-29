import { DataTable } from "@/shared/components/table";
import { getMaintenanceColumns } from "../utils/maintenanceColumns";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function MaintenanceTable({
  maintenances,
  loading,
  onView,
  onDelete,
}) {
  const { hasPermission } = usePermission();

  const canView = hasPermission(PERMISSIONS.MAINTENANCE_VIEW);
  const canDelete = hasPermission(PERMISSIONS.MAINTENANCE_DELETE);

  const columns = getMaintenanceColumns({
    onView,
    onDelete,

    canView,
    canDelete,
  });

  return (
    <DataTable columns={columns} data={maintenances ?? []} loading={loading} />
  );
}
