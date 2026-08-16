import { DataTable } from "@/shared/components/table";
import { getInventoryColumns } from "../utils/inventoryColumns";

export default function InventoryTable({
    inventories,
    loading,
    onView,
    onEdit,
    onStatusChange,
    onDelete,
}) {
    const columns = getInventoryColumns({
        onView,
        onEdit,
        onStatusChange,
        onDelete,
    });

    return (
        <DataTable columns={columns} data={inventories ?? []} loading={loading} />
    );
}
