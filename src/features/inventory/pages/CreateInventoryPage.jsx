import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageHeader from "@/shared/components/PageHeader";

import InventoryForm from "../components/InventoryForm";
import { createInventory } from "../redux/inventoryThunks";
import useInventoryFormOptions from "../utils/useInventoryFormOptions";
import CreationSuccessDialog from "@/shared/components/CreationSuccessDialog";

export default function CreateInventoryPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const { loading } = useSelector((state) => state.inventory);

    const {
        categories,
        vendors,
        branches,
        loading: optionsLoading,
    } = useInventoryFormOptions();

    const handleCreateInventory = async (data) => {
        await dispatch(createInventory(data)).unwrap();
    };

    const handleCreateSuccess = () => {
    setShowSuccessDialog(true);
    };

    const handleCreateAnother = () => {
    setShowSuccessDialog(false);
    };

    return (
      <div className="space-y-3">
        {/* Page Header */}
        <PageHeader
          title="Create Inventory"
          description="Add a new inventory item"
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

        {/* Inventory Form */}
        <InventoryForm
          mode="create"
          categories={categories}
          vendors={vendors}
          branches={branches}
          onSuccess={handleCreateSuccess}
          onSubmit={handleCreateInventory}
          loading={loading.create || optionsLoading}
        />

        <CreationSuccessDialog
          open={showSuccessDialog}
          onOpenChange={setShowSuccessDialog}
          title="Inventory created successfully"
          description="The inventory item has been created successfully. Would you like to create another item or go to the inventory list?"
          stayLabel="Create another"
          redirectLabel="Go to Inventory"
          onStay={handleCreateAnother}
          onRedirect={() => navigate("/edu/Inventory")}
        />
      </div>
    );
}
