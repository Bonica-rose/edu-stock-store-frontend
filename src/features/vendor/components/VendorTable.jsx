import { DataTable } from "@/shared/components/table";
import { getVendorColumns } from "../utils/vendorColumns";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function VendorTable({
  vendors,
  loading,
  onView,
  onEdit,
  onStatusChange,
  onDelete,
}) {
  const { hasPermission } = usePermission();

  const canView = hasPermission(PERMISSIONS.VENDOR_VIEW);
  const canUpdate = hasPermission(PERMISSIONS.VENDOR_UPDATE);
  const canStatusChange = hasPermission(PERMISSIONS.VENDOR_UPDATE);
  const canDelete = hasPermission(PERMISSIONS.VENDOR_DELETE);

  const columns = getVendorColumns({
    onView,
    onEdit,
    onStatusChange,
    onDelete,
    
    canView,
    canUpdate,
    canStatusChange,
    canDelete,
  });

  return <DataTable columns={columns} data={vendors ?? []} loading={loading} />;
}
