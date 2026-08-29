import PermissionRoute from "../PermissionRoute";
import { PERMISSIONS } from "@/shared/constants/permissions";

import MaintenanceListPage from "@/features/maintenance/pages/MaintenanceListPage";
import CreateMaintenancePage from "@/features/maintenance/pages/CreateMaintenancePage";
import ViewMaintenancePage from "@/features/maintenance/pages/ViewMaintenancePage";

export const maintenanceRoutes = [
    {
        element: <PermissionRoute permission={PERMISSIONS.MAINTENANCE_VIEW} />,
        children: [
            { path: "maintenance", element: <MaintenanceListPage /> },
            { path: "maintenance/:id", element: <ViewMaintenancePage /> },
        ],
    },

    {
        element: <PermissionRoute permission={PERMISSIONS.MAINTENANCE_CREATE} />,
        children: [{ path: "maintenance/new", element: <CreateMaintenancePage /> }],
    },
];
