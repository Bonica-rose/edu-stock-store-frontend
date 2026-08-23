import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import {
  fetchAssets,
  deleteAsset,
  changeAssetStatus,
} from "../redux/assetThunks";

import AssetTable from "../components/AssetTable";
import AssetFilter from "../components/AssetFilter";
import { TablePagination, TableToolbar } from "@/shared/components/table";
import { Button } from "@/components/ui/button";
import useAssetFormOptions from "@/features/asset/utils/useAssetFormOptions";
import ConfirmationDialog from "@/shared/components/ConfirmationDialog";

export default function AssetListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { assets, pagination, loading } = useSelector((state) => state.asset);
  const { inventories, branches, users } = useAssetFormOptions();

  const [query, setQuery] = useState({
    page: 1,
    limit: 10,

    inventory: "all",
    branch: "all",
    status: "all",
    assignedTo: "all",
    isActive: "all",
  });

  const [selectedAsset, setSelectedAsset] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  // Fetch assets
  useEffect(() => {
    dispatch(fetchAssets(query));
  }, [dispatch, query]);

  // View asset
  const handleView = (asset) => {
    navigate(`/edu/assets/${asset._id}`);
  };

  // Create asset
  const handleCreate = () => {
    navigate("/edu/assets/new");
  };

  const handleEdit = (asset) => {
    navigate(`/edu/assets/${asset._id}/edit`);
  };

  const handleAssign = (asset) => {
    // Open assign dialog
    setSelectedAsset(asset);
    setAssignDialogOpen(true);
  };

  const handleReturn = (asset) => {
    // Open return dialog
    setSelectedAsset(asset);
    setReturnDialogOpen(true);
  };

  const handleStatusChange = (asset) => {
    // Open activate/deactivate confirmation
    setSelectedAsset(asset);
    setOpenStatus(true);
  };
  
  // Confirm status change
  const confirmStatusChange = async () => {
    if (!selectedAsset) return;
    try {
      await dispatch(changeAssetStatus(selectedAsset._id)).unwrap();

      toast.success(
        `Asset ${selectedAsset.isActive ? "deactivated" : "activated"} successfully`,
      );

      setOpenStatus(false);
      setSelectedAsset(null);

      dispatch(fetchAssets(query));
    } catch (error) {
      toast.error(error.message || "Failed to change asset status");
    }
  };

  const handleDelete = (asset) => {
    // Open delete confirmation
    setSelectedAsset(asset);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    if (!selectedAsset) return;

    try {
      await dispatch(deleteAsset(selectedAsset._id)).unwrap();

      toast.success("Asset deleted successfully");

      setOpenDelete(false);
      setSelectedAsset(null);

      dispatch(fetchAssets(query));
    } catch (error) {
      toast.error(error.message || "Failed to delete asset");
    }
  };

  return (
    <div className="rounded-lg border border-muted bg-white p-3">
      <div className="space-y-4">
        {/* TOOLBAR */}

        <TableToolbar>
          <div className="flex w-full gap-3">
            {/* FILTER ROW */}

            <AssetFilter
              filters={{
                inventory: query.inventory,
                branch: query.branch,
                status: query.status,
                assignedTo: query.assignedTo,
                isActive: query.isActive,
              }}
              inventories={inventories}
              branches={branches}
              users={users}
              onInventoryChange={(value) =>
                setQuery((prev) => ({
                  ...prev,
                  inventory: value,
                  page: 1,
                }))
              }
              onBranchChange={(value) =>
                setQuery((prev) => ({
                  ...prev,
                  branch: value,
                  page: 1,
                }))
              }
              onStatusChange={(value) =>
                setQuery((prev) => ({
                  ...prev,
                  status: value,
                  page: 1,
                }))
              }
              onAssignedToChange={(value) =>
                setQuery((prev) => ({
                  ...prev,
                  assignedTo: value,
                  page: 1,
                }))
              }
              onIsActiveChange={(value) =>
                setQuery((prev) => ({
                  ...prev,
                  isActive: value,
                  page: 1,
                }))
              }
              onReset={() =>
                setQuery((prev) => ({
                  ...prev,

                  page: 1,

                  inventory: "all",
                  branch: "all",
                  status: "all",
                  assignedTo: "all",
                  isActive: "all",
                }))
              }
            />

            {/* ASSET ACTIONS ROW */}            
            <Button
              onClick={handleCreate}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Asset
            </Button>
          </div>
        </TableToolbar>

        {/* TABLE */}

        <AssetTable
          assets={assets}
          loading={loading.assets}
          onView={handleView}
          onEdit={handleEdit}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          onAssign={handleAssign}
          onReturn={handleReturn}
        />

        {/* PAGINATION */}
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
        title="Delete Asset"
        description={
          selectedAsset
            ? `Are you sure you want to delete ${selectedAsset.assetCode} ${selectedAsset.inventory?.itemName}? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        confirmVariant="destructive"
        loading={loading.delete}
        onConfirm={confirmDelete}
        loadingText="Deleting..."
      />

      {/* STATUS CONFIRMATION */}
      <ConfirmationDialog
        open={openStatus}
        onOpenChange={setOpenStatus}
        title={selectedAsset?.isActive ? "Deactivate Asset" : "Activate Asset"}
        description={
          selectedAsset?.isActive
            ? `Are you sure you want to deactivate ${selectedAsset?.inventory?.itemName}?`
            : `Are you sure you want to activate ${selectedAsset?.inventory?.itemName}?`
        }
        confirmText={selectedAsset?.isActive ? "Deactivate" : "Activate"}
        loading={loading.status}
        loadingText={
          selectedAsset?.isActive ? "Deactivating..." : "Activating..."
        }
        onConfirm={confirmStatusChange}
      />
    </div>
  );
}
