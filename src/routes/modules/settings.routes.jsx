import PermissionRoute from "../PermissionRoute";
import { PERMISSIONS } from "@/shared/constants/permissions";

import SettingsPage from "@/features/settings/pages/SettingsPage";

export const settingsRoutes = [
    {
        element: <PermissionRoute permission={PERMISSIONS.SETTINGS_VIEW} />,
        children: [
            { path: "settings", element: <SettingsPage /> },
        ],
    },
];
