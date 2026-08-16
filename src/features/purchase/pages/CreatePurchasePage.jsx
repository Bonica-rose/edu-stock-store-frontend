import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageHeader from "@/shared/components/PageHeader";

import PurchaseForm from "../components/PurchaseForm";
import { createPurchase } from "../redux/puchaseThunks";

import { fetchVendors } from "@/features/vendor/redux/vendorThunks";
import { fetchBranches } from "@/features/branch/redux/branchThunks";
import { fetchInventories } from "@/features/inventory/redux/inventoryThunks";

const CreatePurchasePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSubmitting = useSelector((state) => state.purchase.loading.create);
  const { vendors } = useSelector((state) => state.vendor);
  const { branches } = useSelector((state) => state.branch);
  const { inventories } = useSelector((state) => state.inventory);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(
      fetchVendors({
        page: 1,
        limit: 100,
        isActive: "true",
      }),
    );

    dispatch(
      fetchBranches({
        page: 1,
        limit: 100,
        isActive: "true",
      }),
    );

    dispatch(
      fetchInventories({
        page: 1,
        limit: 100,
        isActive: "true",
      }),
    );
  }, [dispatch]);

  const handleCreatePurchase = async (data) => {
    await dispatch(createPurchase(data)).unwrap();
    toast.success("Purchase created successfully.");
    navigate("/edu/purchases");
  };

  const isBranchRestricted =
    currentUser?.role === "BRANCH_ADMIN" ||
    currentUser?.role === "INVENTORY_STAFF";

  return (
    <div className="space-y-3">
      <PageHeader
        title="Create Purchase"
        description="Create a new purchase and add the purchased inventory items."
        action={
          <Button
            type="button"
            variant="secondary"
            className="text-gray-500"
            onClick={() => navigate("/edu/purchases")}
          >
            <ArrowLeft className="mr-2 h-4 w-4 text-gray-500" />
            Back to Purchases
          </Button>
        }
      />

      <PurchaseForm
        vendors={vendors}
        branches={branches}
        inventories={inventories}
        onSubmit={handleCreatePurchase}
        isSubmitting={isSubmitting}
        branchDisabled={isBranchRestricted}
      />
    </div>
  );
};

export default CreatePurchasePage;
