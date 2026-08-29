import PermissionRoute from "../PermissionRoute";
import { PERMISSIONS } from "@/shared/constants/permissions";

import InventoryListPage from "@/features/inventory/pages/InventoryListPage";
import CreateInventoryPage from "@/features/inventory/pages/CreateInventoryPage";
import EditInventoryPage from "@/features/inventory/pages/EditInventoryPage";
import ViewInventoryPage from "@/features/inventory/pages/ViewInventoryPage";

export const inventoryRoutes = [
    {
        element: <PermissionRoute permission={PERMISSIONS.INVENTORY_VIEW} />,
        children: [
            { path: "inventory", element: <InventoryListPage /> },
            { path: "inventory/:id", element: <ViewInventoryPage /> },
        ],
    },

    {
        element: <PermissionRoute permission={PERMISSIONS.INVENTORY_CREATE} />,
        children: [{ path: "inventory/new", element: <CreateInventoryPage /> }],
    },

    {
        element: <PermissionRoute permission={PERMISSIONS.INVENTORY_UPDATE} />,
        children: [{ path: "inventory/:id/edit", element: <EditInventoryPage /> }],
    },
];
