import { DataTable } from "@/shared/components/table";

import { getCategoryColumns } from "../utils/categoryColumns";

export default function UserTable({
    categories,
    loading,
    onView,
    onEdit,
    onStatusChange,
    onDelete,
}) {
    const columns = getCategoryColumns({
        onView,
        onEdit,
        onStatusChange,
        onDelete,
    });
    return <DataTable columns={columns} data={categories ?? []} loading={loading} />;
}
