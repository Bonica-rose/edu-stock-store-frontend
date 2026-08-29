import { DataTable } from "@/shared/components/table";
import { getStockMovementColumns } from "../utils/stockMovementColumns";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function StockMovementTable({ movements, loading, onView }) {
    const { hasPermission } = usePermission();

    const canView = hasPermission(PERMISSIONS.STOCK_MOVEMENT_VIEW);
    
    const columns = getStockMovementColumns({
        onView,
        canView,
    });

    return (
        <DataTable columns={columns} data={movements ?? []} loading={loading} />
    );
}
