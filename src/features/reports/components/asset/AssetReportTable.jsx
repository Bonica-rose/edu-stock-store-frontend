import { DataTable } from "@/shared/components/table";

import { getAssetReportColumns } from "./assetReportColumns";

export default function AssetReportTable({ rows, loading, showBranch = true }) {
  const columns = getAssetReportColumns({showBranch});

  return <DataTable columns={columns} data={rows} loading={loading} />;
}
