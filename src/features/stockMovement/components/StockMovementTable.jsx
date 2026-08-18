import { DataTable } from "@/shared/components/table";
import { getStockMovementColumns } from "../utils/stockMovementColumns";

export default function StockMovementTable({ movements, loading, onView }) {
    const columns = getStockMovementColumns({
        onView,
    });

    return (
        <DataTable columns={columns} data={movements ?? []} loading={loading} />
    );
}
