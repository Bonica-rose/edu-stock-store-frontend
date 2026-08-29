import PermissionRoute from "../PermissionRoute";
import { PERMISSIONS } from "@/shared/constants/permissions";

import PurchaseListPage from "@/features/purchase/pages/PurchaseListPage";
import CreatePurchasePage from "@/features/purchase/pages/CreatePurchasePage";
import ViewPurchasePage from "@/features/purchase/pages/ViewPurchasePage";

export const purchaseRoutes = [
    {
        element: <PermissionRoute permission={PERMISSIONS.PURCHASE_VIEW} />,
        children: [
            { path: "purchases", element: <PurchaseListPage /> },
            { path: "purchases/:id", element: <ViewPurchasePage /> },
        ],
    },

    {
        element: <PermissionRoute permission={PERMISSIONS.PURCHASE_CREATE} />,
        children: [{ path: "purchases/new", element: <CreatePurchasePage /> }],
    },
];
