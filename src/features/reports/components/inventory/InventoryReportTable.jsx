import { DataTable } from "@/shared/components/table";

import { getInventoryReportColumns } from "./inventoryReportColumns";

export default function InventoryReportTable({ rows, loading, showBranch = true }) {
  const columns = getInventoryReportColumns({showBranch});

  return <DataTable columns={columns} data={rows} loading={loading} />;
}
