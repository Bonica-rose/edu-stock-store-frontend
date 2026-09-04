import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    ArrowDownToLine,
    ArrowUpFromLine,
    ArrowLeftRight,
    SlidersHorizontal,
} from "lucide-react";

import { fetchStockMovements } from "../redux/stockMovementThunks";
import StockMovementTable from "../components/StockMovementTable";
import StockMovementFilter from "../components/StockMovementFilter";

import { TablePagination, TableToolbar } from "@/shared/components/table";
import { Button } from "@/components/ui/button";
import useStockMovementFormOptions from "@/features/stockMovement/utils/useStockMovementFormOptions";
import { getToday } from "@/shared/utils/getToday";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function StockMovementListPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { hasPermission } = usePermission();
  
    const canStockIn = hasPermission(PERMISSIONS.STOCK_IN_CREATE);
    const canStockOut = hasPermission(PERMISSIONS.STOCK_OUT_CREATE);
    const canStockTransfer = hasPermission(PERMISSIONS.STOCK_TRANSFER_CREATE);
    const canStockAdjustment = hasPermission(PERMISSIONS.STOCK_ADJUSTMENT_CREATE);

    const { movements, pagination, loading } = useSelector((state) => state.stockMovement );

    const { inventories, branches } = useStockMovementFormOptions();

    const [query, setQuery] = useState({
      page: 1,
      limit: 10,
      inventory: "all",
      branch: "all",
      movementType: "all",
      startDate: "",
      endDate: getToday(),
    });

    // Fetch stock movements
    useEffect(() => {
        dispatch(fetchStockMovements(query));
    }, [dispatch, query]);

    // View movement
    const handleView = (movement) => {
        navigate(`/edu/stock-movements/${movement._id}`);
    };

    // Stock In
    const handleStockIn = () => {
        navigate("/edu/stock-movements/stock-in");
    };

    // Stock Out
    const handleStockOut = () => {
        navigate("/edu/stock-movements/stock-out");
    };

    // Transfer
    const handleTransfer = () => {
        navigate("/edu/stock-movements/transfer");
    };

    // Adjustment
    const handleAdjustment = () => {
        navigate("/edu/stock-movements/adjustment");
    };

    return (
      <div className="rounded-lg border border-muted bg-white p-3">
        <div className="space-y-4">
          {/* TOOLBAR */}
          <TableToolbar>
            <div className="flex w-full flex-col gap-3">
              {/* FILTER ROW */}
              <div className="flex flex-wrap items-center gap-3">
                <StockMovementFilter
                  filters={{
                    inventory: query.inventory,
                    branch: query.branch,
                    movementType: query.movementType,
                    startDate: query.startDate,
                    endDate: query.endDate,
                  }}
                  inventories={inventories}
                  branches={branches}
                  onInventoryChange={(value) =>
                    setQuery((prev) => ({
                      ...prev,
                      inventory: value,
                      page: 1,
                    }))
                  }
                  onBranchChange={(value) =>
                    setQuery((prev) => ({
                      ...prev,
                      branch: value,
                      page: 1,
                    }))
                  }
                  onMovementTypeChange={(value) =>
                    setQuery((prev) => ({
                      ...prev,
                      movementType: value,
                      page: 1,
                    }))
                  }
                  onStartDateChange={(value) =>
                    setQuery((prev) => ({
                      ...prev,
                      startDate: value,
                      page: 1,
                    }))
                  }
                  onEndDateChange={(value) =>
                    setQuery((prev) => ({
                      ...prev,
                      endDate: value,
                      page: 1,
                    }))
                  }
                  onReset={() =>
                    setQuery((prev) => ({
                      ...prev,
                      page: 1,
                      inventory: "all",
                      branch: "all",
                      movementType: "all",
                      startDate: "",
                      endDate: "",
                    }))
                  }
                />
              </div>

              {/* STOCK ACTIONS ROW */}
              <div className="flex flex-wrap items-center justify-start gap-2">
                {canStockIn && (
                  <Button
                    onClick={handleStockIn}
                    className="flex items-center gap-2 text-emerald-100 bg-emerald-700 hover:bg-emerald-700/90 border-emerald-200"
                  >
                    <ArrowDownToLine className="h-4 w-4" />
                    Stock In
                  </Button>
                )}

                {canStockOut && (
                  <Button
                    onClick={handleStockOut}
                    className="flex items-center gap-2 text-red-100 bg-red-700 hover:bg-red-700/90 border-red-200"
                  >
                    <ArrowUpFromLine className="h-4 w-4" />
                    Stock Out
                  </Button>
                )}

                {canStockTransfer && (
                  <Button
                    onClick={handleTransfer}
                    className="flex items-center gap-2 text-sky-100 bg-sky-700 hover:bg-sky-700/90 border-sky-200"
                  >
                    <ArrowLeftRight className="h-4 w-4" />
                    Transfer
                  </Button>
                )}

                {canStockAdjustment && (
                  <Button
                    onClick={handleAdjustment}
                    className="flex items-center gap-2 text-purple-100 bg-purple-700 hover:bg-purple-700/90 border-purple-200"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Adjustment
                  </Button>
                )}
              </div>
            </div>
          </TableToolbar>

          {/* TABLE */}
          <StockMovementTable
            movements={movements}
            loading={loading.movements}
            onView={handleView}
          />

          {/* PAGINATION */}
          <TablePagination
            pagination={pagination}
            onPageChange={(page) =>
              setQuery((prev) => ({
                ...prev,
                page,
              }))
            }
          />
        </div>
      </div>
    );
}
