import { DataTable } from "@/shared/components/table";

import { getVendorColumns } from "../utils/vendorColumns";

export default function VendorTable({
  vendors,
  loading,
  onView,
  onEdit,
  onStatusChange,
  onDelete,
}) {
  const columns = getVendorColumns({
    onView,
    onEdit,
    onStatusChange,
    onDelete,
  });

  return <DataTable columns={columns} data={vendors ?? []} loading={loading} />;
}
