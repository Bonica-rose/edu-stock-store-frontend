import { DataTable } from "@/shared/components/table";
import { getInventoryColumns } from "../utils/inventoryColumns";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function InventoryTable({
    inventories,
    loading,
    onView,
    onEdit,
    onStatusChange,
    onDelete,
}) {
    const { hasPermission } = usePermission();

    const canView = hasPermission(PERMISSIONS.INVENTORY_VIEW);
    const canUpdate = hasPermission(PERMISSIONS.INVENTORY_UPDATE);
    const canStatusChange = hasPermission(PERMISSIONS.INVENTORY_CHANGE_STATUS);
    const canDelete = hasPermission(PERMISSIONS.INVENTORY_DELETE);

    const columns = getInventoryColumns({
        onView,
        onEdit,
        onStatusChange,
        onDelete,

        canView,
        canUpdate,
        canStatusChange,
        canDelete,
    });

    return (
        <DataTable columns={columns} data={inventories ?? []} loading={loading} />
    );
}
