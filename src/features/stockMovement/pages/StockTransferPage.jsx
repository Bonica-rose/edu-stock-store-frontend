import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import StockTransferForm from "../components/StockTransferForm";
import { transferStock } from "../redux/stockMovementThunks";

import { Button } from "@/components/ui/button";
import PageHeader from "@/shared/components/PageHeader";

export default function StockTransferPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector((state) => state.stockMovement);

    const handleSubmit = async (data) => {
        await dispatch(transferStock(data)).unwrap();
        toast.success("Stock transferred successfully.");
        navigate("/edu/stock-movements");
    };

    const handleCancel = () => {
        navigate("/edu/stock-movements");
    };

    return (
        <div className="space-y-3">
            {/* Page Header */}
            <PageHeader
                title="Transfer Stock"
                description="Transfer stock from one branch to another."
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
            <StockTransferForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                loading={loading.transfer}
            />
        </div>
    );
}
