import PermissionRoute from "../PermissionRoute";
import { PERMISSIONS } from "@/shared/constants/permissions";

import StockMovementListPage from "@/features/stockMovement/pages/StockMovementListPage";
import ViewStockMovementPage from "@/features/stockMovement/pages/ViewStockMovementPage";
import StockInPage from "@/features/stockMovement/pages/StockInPage";
import StockOutPage from "@/features/stockMovement/pages/StockOutPage";
import StockTransferPage from "@/features/stockMovement/pages/StockTransferPage";
import StockAdjustmentPage from "@/features/stockMovement/pages/StockAdjustmentPage";

export const stockMovementRoutes = [
    {
        element: <PermissionRoute permission={PERMISSIONS.STOCK_MOVEMENT_VIEW} />,
        children: [
            {
                path: "stock-movements",
                children: [
                    { index: true, element: <StockMovementListPage /> },
                    { path: ":id", element: <ViewStockMovementPage /> },
                ]
            }
        ],
    },

    {
        element: <PermissionRoute permission={PERMISSIONS.STOCK_IN_CREATE} />,
        children: [{path: "stock-movements/stock-in", element: <StockInPage /> }],
    },

    {
        element: <PermissionRoute permission={PERMISSIONS.STOCK_OUT_CREATE} />,
        children: [{ path: "stock-movements/stock-out", element: <StockOutPage /> }],
    },

    {
        element: <PermissionRoute permission={PERMISSIONS.STOCK_TRANSFER_CREATE} />,
        children: [{ path: "stock-movements/transfer", element: <StockTransferPage /> }],
    },

    {
        element: <PermissionRoute permission={PERMISSIONS.STOCK_ADJUSTMENT_CREATE} />,
        children: [{ path: "stock-movements/adjustment", element: <StockAdjustmentPage /> }],
    },
];
