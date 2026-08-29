import { DataTable } from "@/shared/components/table";
import { getPurchaseColumns } from "../utils/purchaseColumns";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function PurchaseTable({ purchases, loading, onView }) {
    const { hasPermission } = usePermission();

    const canView = hasPermission(PERMISSIONS.PURCHASE_VIEW);

    const columns = getPurchaseColumns({
        onView,
        canView,
    });

    return <DataTable columns={columns} data={purchases ?? []} loading={loading} />;
}
