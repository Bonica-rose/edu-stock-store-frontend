import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import StockAdjustmentForm from "../components/StockAdjustmentForm";
import { adjustStock } from "../redux/stockMovementThunks";
import PageHeader from "@/shared/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function StockAdjustmentPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector((state) => state.stockMovement);

    const handleSubmit = async (data) => {
        await dispatch(adjustStock(data)).unwrap();
        toast.success("Stock adjusted successfully.");
        navigate("/edu/stock-movements");
    };

    const handleCancel = () => {
        navigate("/edu/stock-movements");
    };

    return (
        <div className="space-y-3">
            {/* Page Header */}
            <PageHeader
                title="Stock Adjustment"
                description="Increase or decrease the current inventory stock."
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

            <StockAdjustmentForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                loading={loading.adjustment}
            />
        </div>
    );
}
