import { DataTable } from "@/shared/components/table";

import { getStockMovementReportColumns } from "./stockMovementReportColumns";

export default function StockMovementReportTable({ rows, loading, showBranch = true }) {
  const columns = getStockMovementReportColumns({ showBranch });

  return <DataTable columns={columns} data={rows} loading={loading} />;
}