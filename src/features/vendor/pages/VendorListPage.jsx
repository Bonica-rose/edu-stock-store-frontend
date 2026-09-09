import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import {
  fetchVendors,
  deleteVendor,
  changeVendorStatus,
} from "../redux/vendorThunks";

import VendorTable from "../components/VendorTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TablePagination, TableToolbar } from "@/shared/components/table";
import { Card, CardContent } from "@/components/ui/card";
import ConfirmationDialog from "@/shared/components/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";
import StatusFilter from "@/shared/components/filters/StatusFilter";

export default function VendorsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hasPermission } = usePermission();

  const canCreate = hasPermission(PERMISSIONS.VENDOR_CREATE);

  const { vendors, pagination, loading } = useSelector((state) => state.vendor);

  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: "",
    isActive: "all",
  });

  const [selectedVendor, setSelectedVendor] = useState(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  // Fetch vendors
  useEffect(() => {
    dispatch(fetchVendors(query));
  }, [dispatch, query]);

  // Create
  const handleCreateVendor = () => {
    navigate("/edu/vendors/new");
  };

  // View
  const handleView = (vendor) => {
    navigate(`/edu/vendors/${vendor._id}`);
  };

  // Edit
  const handleEdit = (vendor) => {
    navigate(`/edu/vendors/${vendor._id}/edit`);
  };

  // Status change
  const handleStatusChange = (vendor) => {
    setSelectedVendor(vendor);
    setOpenStatus(true);
  };

  const confirmStatusChange = async () => {
    if (!selectedVendor) return;

    try {
      await dispatch(changeVendorStatus(selectedVendor._id)).unwrap();

      toast.success(
        `Vendor ${selectedVendor.isActive ? "deactivated" : "activated"} successfully`,
      );

      setOpenStatus(false);
      setSelectedVendor(null);

      dispatch(fetchVendors(query));
    } catch (error) {
      toast.error(error.message || "Failed to change vendor status");
    }
  };

  // Delete
  const handleDelete = (vendor) => {
    setSelectedVendor(vendor);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    if (!selectedVendor) return;

    try {
      await dispatch(deleteVendor(selectedVendor._id)).unwrap();

      toast.success("Vendor deleted successfully");

      setOpenDelete(false);
      setSelectedVendor(null);

      dispatch(fetchVendors(query));
    } catch (error) {
      toast.error(error.message || "Failed to delete vendor");
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="space-y-1">
          {/* Toolbar */}
          <TableToolbar
            search={query.search}
            onSearchChange={(value) =>
              setQuery((prev) => ({
                ...prev,
                search: value,
                page: 1,
              }))
            }
            searchPlaceholder="Search vendors..."
          >
            {/* Create Vendor */}
            {canCreate && (
              <Button
                onClick={handleCreateVendor}
                className="flex items-center gap-2 rounded-lg bg-blue-900 px-3 py-1 text-white hover:bg-blue-900/80"
              >
                <Plus className="h-4 w-4" />
                Create Vendor
              </Button>
            )}
          </TableToolbar>

          {/* Status Filter */}
          <StatusFilter
            value={query.isActive}
            onChange={(isActive) =>
              setQuery((prev) => ({
                ...prev,
                isActive,
                page: 1,
              }))
            }
          />

          {/* Vendor Table */}
          <VendorTable
            vendors={vendors}
            loading={loading.vendors}
            onView={handleView}
            onEdit={handleEdit}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />

          {/* Pagination */}
          <TablePagination
            pagination={pagination}
            onPageChange={(page) =>
              setQuery((prev) => ({
                ...prev,
                page,
              }))
            }
          />
        </div>

        {/* Delete Confirmation */}
        <ConfirmationDialog
          open={openDelete}
          onOpenChange={setOpenDelete}
          title="Delete Vendor"
          description={
            selectedVendor
              ? `Are you sure you want to delete ${selectedVendor.vendorName}? This action cannot be undone.`
              : ""
          }
          confirmText="Delete"
          confirmVariant="destructive"
          loading={loading.delete}
          onConfirm={confirmDelete}
          loadingText="Deleting..."
        />

        {/* Status Confirmation */}
        <ConfirmationDialog
          open={openStatus}
          onOpenChange={setOpenStatus}
          title={
            selectedVendor?.isActive ? "Deactivate Vendor" : "Activate Vendor"
          }
          description={
            selectedVendor?.isActive
              ? `Are you sure you want to deactivate ${selectedVendor.vendorName}?`
              : `Are you sure you want to activate ${selectedVendor?.vendorName}?`
          }
          confirmText={selectedVendor?.isActive ? "Deactivate" : "Activate"}
          loading={loading.status}
          onConfirm={confirmStatusChange}
          loadingText={
            selectedVendor?.isActive ? "Deactivating..." : "Activating..."
          }
        />
      </CardContent>
    </Card>
  );
}
