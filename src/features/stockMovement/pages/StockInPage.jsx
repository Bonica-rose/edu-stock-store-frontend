import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import StockInForm from "../components/StockInForm";
import { stockIn } from "../redux/stockMovementThunks";

import { Button } from "@/components/ui/button";
import PageHeader from "@/shared/components/PageHeader";

export default function StockInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.stockMovement);

  const handleSubmit = async (data) => {   
      await dispatch(stockIn(data)).unwrap();
      toast.success("Stock added successfully.");
      navigate("/edu/stock-movements");
  };

  const handleCancel = () => {
    navigate("/edu/stock-movements");
  };

  return (
    <div className="space-y-3">
      {/* Page Header */}
      <PageHeader
        title="Stock In"
        description="Add stock to an inventory item."
        action={
          <Button
            type="button"
            variant="secondary"
            className="text-gray-500"
            onClick={handleCancel}
          >
            <ArrowLeft className="mr-2 h-4 w-4 text-gray-500" />
            Back to Stock Movements
          </Button>
        }
      />

      {/* FORM */}
      <StockInForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading.create}
      />
    </div>
  );
}
