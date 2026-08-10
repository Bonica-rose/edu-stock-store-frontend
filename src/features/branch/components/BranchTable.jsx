import { DataTable } from "@/shared/components/table";

import { getBranchColumns } from "../utils/branchColumns";

export default function BranchTable({
  branches,
  loading,
  onView,
  onEdit,
  onStatusChange,
}) {
  const columns = getBranchColumns({
    onView,
    onEdit,
    onStatusChange,
  });

  return <DataTable columns={columns} data={branches} loading={loading} />;
}
