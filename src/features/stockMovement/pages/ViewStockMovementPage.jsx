import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { fetchStockMovementById } from "../redux/stockMovementThunks";
import StockMovementDetails from "../components/StockMovementDetails";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageHeader from "@/shared/components/PageHeader";
import Loader from "@/shared/components/Loader";

export default function ViewStockMovementPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { movement, loading, error } = useSelector(
    (state) => state.stockMovement,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchStockMovementById(id));
    }
  }, [dispatch, id]);

  const handleBack = () => {
    navigate("/edu/stock-movements");
  };

  if (loading.movement) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error || !movement) {
    return (
      <Card>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-destructive">
              {error || "Stock movement not found."}
            </p>

            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Stock Movements
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {/* Page Header */}
      <PageHeader
        title="Stock Movement Details"
        description="View stock movement information."
        action={
          <Button
            type="button"
            variant="secondary"
            className="text-gray-500"
            onClick={() => navigate("/edu/stock-movements")}
          >
            <ArrowLeft className="mr-2 h-4 w-4 text-gray-500" />
            Back to Stock Movements
          </Button>
        }
      />

      {/* DETAILS */}
      <StockMovementDetails movement={movement} />
    </div>
  );
}
