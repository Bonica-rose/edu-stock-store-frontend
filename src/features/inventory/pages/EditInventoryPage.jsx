import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import InventoryForm from "../components/InventoryForm";
import PageHeader from "@/shared/components/PageHeader";
import { fetchInventoryById, updateInventory } from "../redux/inventoryThunks";
import useInventoryFormOptions from "../utils/useInventoryFormOptions";
import Loader from "@/shared/components/Loader";

export default function EditInventoryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { inventory, loading } = useSelector((state) => state.inventory);  

  useEffect(() => {
    if (!id) return;

    dispatch(fetchInventoryById(id));
  }, [dispatch, id]);  

  const {
    categories,
    vendors,
    branches,
    loading: optionsLoading,
  } = useInventoryFormOptions();

  const handleUpdateInventory = async (formData) => {
      await dispatch(
        updateInventory({
          id,
          inventoryData:formData,
        }),
      ).unwrap();

      toast.success("Inventory updated successfully.");
      navigate("/edu/inventory");
  };

  if (loading.inventory || !inventory) {
    return <div><Loader /></div>;
  }

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <PageHeader
        title="Edit Inventory"
        description="Update the inventory item information."
        action={
          <Button
            type="button"
            variant="secondary"
            className="text-gray-500"
            onClick={() => navigate("/edu/inventory")}
          >
            <ArrowLeft className="mr-2 h-4 w-4 text-gray-500" />
            Back to Inventory
          </Button>
        }
      />

      <InventoryForm
        mode="edit"
        initialData={inventory}
        onSubmit={handleUpdateInventory}
        loading={loading.update || optionsLoading}
        categories={categories ?? []}
        vendors={vendors ?? []}
        branches={branches ?? []}
      />
    </div>
  );
}
