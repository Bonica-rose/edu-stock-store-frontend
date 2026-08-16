import { DataTable } from "@/shared/components/table";

import { getPurchaseColumns } from "../utils/purchaseColumns";

export default function PurchaseTable({ purchases, loading, onView }) {
    const columns = getPurchaseColumns({
        onView,
    });

    return <DataTable columns={columns} data={purchases ?? []} loading={loading} />;
}
