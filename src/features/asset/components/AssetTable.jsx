import { DataTable } from "@/shared/components/table";
import { getAssetColumns } from "../utils/assetColumns";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function AssetTable({
  assets,
  loading,
  onView,
  onEdit,
  onChangeStatus,
  onDelete,
}) {
  const { hasPermission } = usePermission();

  const canView = hasPermission(PERMISSIONS.ASSET_VIEW);
  const canUpdate = hasPermission(PERMISSIONS.ASSET_UPDATE);
  const canStatusChange = hasPermission(PERMISSIONS.ASSET_CHANGE_STATUS);
  const canDelete = hasPermission(PERMISSIONS.ASSET_DELETE);

  const columns = getAssetColumns({
    onView,
    onEdit,
    onChangeStatus,
    onDelete,

    canView,
    canUpdate,
    canStatusChange,
    canDelete,
  });

  return <DataTable columns={columns} data={assets ?? []} loading={loading} />;
}
