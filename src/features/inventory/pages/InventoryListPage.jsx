import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import {
  fetchInventories,
  changeInventoryStatus,
  deleteInventory,
} from "../redux/inventoryThunks";
import InventoryTable from "../components/InventoryTable";
import { TablePagination, TableToolbar } from "@/shared/components/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConfirmationDialog from "@/shared/components/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import useInventoryFormOptions from "../utils/useInventoryFormOptions";
import InventoryFilter from "../components/InventoryFilter";

export default function InventoryListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { inventories, pagination, loading } = useSelector(
    (state) => state.inventory,
  );

  const {
      categories,
      vendors,
      branches,
  } = useInventoryFormOptions();

  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: "",
    category: "all",
    vendor: "all",
    branch: "all",
    isActive: "all",
  });

  const [selectedInventory, setSelectedInventory] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  // Fetch inventories
  useEffect(() => {
    dispatch(fetchInventories(query));
  }, [dispatch, query]);

  // Create
  const handleCreateInventory = () => {
    navigate("/edu/inventory/new");
  };

  // View
  const handleView = (inventory) => {
    navigate(`/edu/inventory/${inventory._id}`);
  };

  // Edit
  const handleEdit = (inventory) => {
    navigate(`/edu/inventory/${inventory._id}/edit`);
  };

  // Status confirmation
  const handleStatusChange = (inventory) => {
    setSelectedInventory(inventory);
    setOpenStatus(true);
  };

  // Confirm status change
  const confirmStatusChange = async () => {
    if (!selectedInventory) return;
    try {
      await dispatch(changeInventoryStatus(selectedInventory._id)).unwrap();

      toast.success(
        `Inventory ${selectedInventory.isActive ? "deactivated" : "activated"} successfully`,
      );

      setOpenStatus(false);
      setSelectedInventory(null);

      dispatch(fetchInventories(query));
    } catch (error) {
      toast.error(error.message || "Failed to change inventory status");
    }
  };

  // Delete
  const handleDelete = (inventory) => {
    setSelectedInventory(inventory);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    if (!selectedInventory) return;

    try {
      await dispatch(deleteInventory(selectedInventory._id)).unwrap();

      toast.success("Inventory deleted successfully");

      setOpenDelete(false);
      setSelectedInventory(null);

      dispatch(fetchInventories(query));
    } catch (error) {
      toast.error(error.message || "Failed to delete inventory");
    }
  };

  return (
    <div className="rounded-lg border border-muted bg-white p-3">
      <div className="space-y-4">
        {/* TOOLBAR */}
        <TableToolbar
          search={query.search}
          searchPlaceholder="Search inventory item..."
          onSearchChange={(value) =>
            setQuery((prev) => ({
              ...prev,
              search: value,
              page: 1,
            }))
          }
        >
          <InventoryFilter
            category={query.category}
            vendor={query.vendor}
            branch={query.branch}
            isActive={query.isActive}
            categories={categories}
            vendors={vendors}
            branches={branches}
            onCategoryChange={(value) =>
              setQuery((prev) => ({
                ...prev,
                category: value,
                page: 1,
              }))
            }
            onVendorChange={(value) =>
              setQuery((prev) => ({
                ...prev,
                vendor: value,
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
                isActive: value,
                page: 1,
              }))
            }
          />

          {/* CREATE INVENTORY */}
          <Button
            onClick={handleCreateInventory}
            className="flex items-center gap-2 rounded-lg bg-blue-950 px-2 py-1 text-white hover:bg-blue-900"
          >
            <Plus className="h-4 w-4" />
            Add Inventory
          </Button>
        </TableToolbar>

        {/* TABLE */}
        <InventoryTable
          inventories={inventories}
          loading={loading.inventories}
          onView={handleView}
          onEdit={handleEdit}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
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
        title="Delete Inventory"
        description={
          selectedInventory
            ? `Are you sure you want to delete ${selectedInventory.itemName}? This action cannot be undone.`
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
        title={
          selectedInventory?.isActive
            ? "Deactivate Inventory"
            : "Activate Inventory"
        }
        description={
          selectedInventory?.isActive
            ? `Are you sure you want to deactivate ${selectedInventory?.itemName}?`
            : `Are you sure you want to activate ${selectedInventory?.itemName}?`
        }
        confirmText={selectedInventory?.isActive ? "Deactivate" : "Activate"}
        loading={loading.status}
        loadingText={
          selectedInventory?.isActive ? "Deactivating..." : "Activating..."
        }
        onConfirm={confirmStatusChange}
      />
    </div>
  );
}
