import { DataTable } from "@/shared/components/table";

import { getAssetColumns } from "../utils/assetColumns";

export default function AssetTable({
  assets,
  loading,
  onView,
  onEdit,
  onChangeStatus,
  onDelete,
  onAssign,
  onReturn,
}) {
  const columns = getAssetColumns({
    onView,
    onEdit,
    onChangeStatus,
    onDelete,
    onAssign,
    onReturn,
  });

  return <DataTable columns={columns} data={assets ?? []} loading={loading} />;
}
