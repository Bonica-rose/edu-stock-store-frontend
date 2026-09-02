import { DataTable } from "@/shared/components/table";

import { getVendorReportColumns } from "./vendorReportColumns";

export default function VendorReportTable({ rows, loading, showBranch = true }) {
  const columns = getVendorReportColumns({ showBranch });

  return <DataTable columns={columns} data={rows} loading={loading} />;
}