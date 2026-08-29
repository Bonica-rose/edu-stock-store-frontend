import { DataTable } from "@/shared/components/table";
import { getCategoryColumns } from "../utils/categoryColumns";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function CategoryTable({
    categories,
    loading,
    onEdit,
    onStatusChange,
    onDelete,
}) {
    const { hasPermission } = usePermission();

    const canUpdate = hasPermission(PERMISSIONS.CATEGORY_UPDATE);
    const canStatusChange = hasPermission(PERMISSIONS.CATEGORY_CHANGE_STATUS);
    const canDelete = hasPermission(PERMISSIONS.CATEGORY_DELETE);

    const columns = getCategoryColumns({
        onEdit,
        onStatusChange,
        onDelete,

        canUpdate,
        canStatusChange,
        canDelete,
    });
    return (
        <DataTable columns={columns} data={categories ?? []} loading={loading} />
    );
}
