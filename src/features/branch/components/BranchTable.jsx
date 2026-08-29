import { DataTable } from "@/shared/components/table";
import { getBranchColumns } from "../utils/branchColumns";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function BranchTable({
  branches,
  loading,
  onView,
  onEdit,
  onStatusChange,
}) {
  const { hasPermission } = usePermission();

  const canUpdate = hasPermission(PERMISSIONS.BRANCH_UPDATE);
  const canView = hasPermission(PERMISSIONS.BRANCH_VIEW);

  const columns = getBranchColumns({
    onView,
    onEdit,
    onStatusChange,

    canUpdate,
    canView,
  });

  return <DataTable columns={columns} data={branches ?? []} loading={loading} />;
}
