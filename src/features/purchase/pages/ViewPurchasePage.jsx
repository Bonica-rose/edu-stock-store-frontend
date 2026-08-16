import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import PageHeader from "@/shared/components/PageHeader";

import PurchaseDetails from "../components/PurchaseDetails";
import { fetchPurchaseById } from "../redux/puchaseThunks";
import { clearCurrentPurchase } from "../redux/purchaseSlice";

const ViewPurchasePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { purchase, loading } = useSelector((state) => state.purchase);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchPurchaseById(id))
      .unwrap()
      .catch((error) => {
        toast.error(error?.message ?? "Failed to load purchase.");
      });

    return () => {
      dispatch(clearCurrentPurchase());
    };
  }, [dispatch, id]);

  return (
    <div className="space-y-3">
      <PageHeader
        title="Purchase Details"
        description="View purchase information and purchased inventory items."
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

      <PurchaseDetails purchase={purchase} loading={loading.purchase} />
    </div>
  );
};

export default ViewPurchasePage;
