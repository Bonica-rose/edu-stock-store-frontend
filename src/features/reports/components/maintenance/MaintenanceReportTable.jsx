import { DataTable } from "@/shared/components/table";

import { getMaintenanceReportColumns } from "./maintenanceReportColumns";

export default function MaintenanceReportTable({ rows, loading, showBranch = true }) {
  const columns = getMaintenanceReportColumns({ showBranch });

  return <DataTable columns={columns} data={rows} loading={loading} />;
}