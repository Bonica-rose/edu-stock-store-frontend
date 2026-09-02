import { DataTable } from "@/shared/components/table";

import { getPurchaseReportColumns } from "./purchaseReportColumns";

export default function PurchaseReportTable({ rows, loading, showBranch = true }) {
  const columns = getPurchaseReportColumns({showBranch});

  return <DataTable columns={columns} data={rows} loading={loading} />;
}
