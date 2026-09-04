import PermissionRoute from "../PermissionRoute";
import { PERMISSIONS } from "@/shared/constants/permissions";

import ActivityListPage from "@/features/activity/pages/ActivityListPage";

export const activityRoutes = [
    {
        element: <PermissionRoute permission={PERMISSIONS.ACTIVITY_VIEW} />,
        children: [
            {
                path: "activity-log",
                element: <ActivityListPage />,
            },
        ],
    },
];
