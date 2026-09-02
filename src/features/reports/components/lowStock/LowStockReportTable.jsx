import { DataTable } from "@/shared/components/table";

import { getLowStockReportColumns } from "./lowStockReportColumns";

export default function LowStockReportTable({ rows, loading, showBranch = true }) {
  const columns = getLowStockReportColumns({ showBranch });

  return <DataTable columns={columns} data={rows} loading={loading} />;
}