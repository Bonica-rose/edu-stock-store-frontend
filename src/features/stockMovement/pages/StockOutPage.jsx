import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import StockOutForm from "../components/StockOutForm";
import { stockOut } from "../redux/stockMovementThunks";

import { Button } from "@/components/ui/button";
import PageHeader from "@/shared/components/PageHeader";

export default function StockOutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector((state) => state.stockMovement);

    const handleSubmit = async (data) => {        
        await dispatch(stockOut(data)).unwrap();
        toast.success("Stock issued successfully.");
        navigate("/edu/stock-movements");
    };

    const handleCancel = () => {
        navigate("/edu/stock-movements");
    };

    return (
        <div className="space-y-3">
            {/* Page Header */}
            <PageHeader
                title="Stock Out"
                description="Issue stock from an inventory."
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
            <StockOutForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                loading={loading.stockOut}
            />
        </div>
    );
}
