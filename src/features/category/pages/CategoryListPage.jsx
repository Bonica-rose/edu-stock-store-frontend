import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import {
  fetchCategories,
  changeCategoryStatus,
  deleteCategory,
} from "../redux/categoryThunks";
import CategoryTable from "../components/CategoryTable";
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

export default function CategoryListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, pagination, loading } = useSelector(
    (state) => state.category,
  );

  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: "",
    type: "all",
    isActive: "all",
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openStatus, setOpenStatus] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories(query));
  }, [dispatch, query]);

  const handleCreateCategory = () => {
    navigate("/edu/categories/new");
  };

  const handleView = (category) => {
    // We will connect this to CategoryViewDialog.
    // For now, keep the selected category in local state. setSelectedCategory(category);
  };

  const handleEdit = (category) => {
    navigate(`/edu/categories/${category._id}/edit`);
  };

  const handleStatusChange = (category) => {
    setSelectedCategory(category);
    setOpenStatus(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    if (!selectedCategory) return;

    try {
      await dispatch(deleteCategory(selectedCategory._id)).unwrap();

      toast.success("Category deleted successfully");

      setOpenDelete(false);
      selectedCategory(null);

      dispatch(fetchCategories(query));
    } catch (error) {
      toast.error(error.message || "Failed to delete category");
    }
  };

  const confirmStatusChange = async () => {
    if (!selectedCategory) return;
    try {
      await dispatch(changeCategoryStatus(selectedCategory._id)).unwrap();
      toast.success(
        `Category ${selectedCategory.isActive ? "deactivated" : "activated"} successfully`,
      );
      setOpenStatus(false);
      setSelectedCategory(null);
      dispatch(fetchCategories(query));
    } catch (error) {
      toast.error(error.message || "Failed to change category status");
    }
  };

  return (
    <div className="bg-white rounded-lg border border-muted p-3">
      <div className="space-y-4">
        <TableToolbar
          search={query.search}
          searchPlaceholder="Search categories..."
          onSearchChange={(value) =>
            setQuery((prev) => ({ ...prev, search: value, page: 1 }))
          }
        >
          {/* Category Type Filter */}
          <Select
            value={query.type}
            onValueChange={(value) =>
              setQuery((prev) => ({ ...prev, type: value, page: 1 }))
            }
          >
            <SelectTrigger className="w-40">
              {query.type === "Inventory"
                ? "Inventory"
                : query.type === "Asset"
                  ? "Asset"
                  : query.type === "Both"
                    ? "Both"
                    : "All Types"}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all"> All Types </SelectItem>
              <SelectItem value="Inventory"> Inventory </SelectItem>
              <SelectItem value="Asset"> Asset </SelectItem>
              <SelectItem value="Both"> Both </SelectItem>
            </SelectContent>
          </Select>

          {/* Category Status Filter */}
          <Select
            value={query.isActive}
            onValueChange={(value) =>
              setQuery((prev) => ({ ...prev, isActive: value, page: 1 }))
            }
          >
            <SelectTrigger className="w-35">
              {query.isActive === "true"
                ? "Active"
                : query.isActive === "false"
                  ? "Inactive"
                  : query.isActive === "all"
                    ? "Status"
                    : "All Status"}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all"> All </SelectItem>
              <SelectItem value="true"> Active </SelectItem>
              <SelectItem value="false"> Inactive </SelectItem>
            </SelectContent>
          </Select>

          {/* Create Category */}
          <Button
            onClick={handleCreateCategory}
            className="flex items-center gap-2 rounded-lg bg-blue-950 px-2 py-1 text-white hover:bg-blue-900"
          >
            <Plus className="h-4 w-4" /> Create Category
          </Button>
        </TableToolbar>

        <CategoryTable
          categories={categories}
          loading={loading.categories}
          onView={handleView}
          onEdit={handleEdit}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />

        <TablePagination
          pagination={pagination}
          onPageChange={(page) => setQuery((prev) => ({ ...prev, page }))}
        />
      </div>

      <ConfirmationDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        title="Delete Category"
        description={
          selectedCategory
            ? `Are you sure you want to delete ${selectedCategory.type}: ${selectedCategory.categoryName} ? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        confirmVariant="destructive"
        loading={loading.delete}
        onConfirm={confirmDelete}
        loadingText="Deleting..."
      />

      <ConfirmationDialog
        open={openStatus}
        onOpenChange={setOpenStatus}
        title={
          selectedCategory?.isActive
            ? "Deactivate Category"
            : "Activate Category"
        }
        description={
          selectedCategory?.isActive
            ? `Are you sure you want to deactivate ${selectedCategory?.categoryName}?`
            : `Are you sure you want to activate ${selectedCategory?.categoryName}?`
        }
        confirmText={selectedCategory?.isActive ? "Deactivate" : "Activate"}
        loading={loading.status}
        loadingText={
          selectedCategory?.isActive ? "Deactivating..." : "Activating..."
        }
        onConfirm={confirmStatusChange}
      />
    </div>
  );
}
