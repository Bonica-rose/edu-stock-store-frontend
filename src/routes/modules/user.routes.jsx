import PermissionRoute from "../PermissionRoute";
import { PERMISSIONS } from "@/shared/constants/permissions";

import UsersPage from "@/features/user/pages/UsersPage";
import CreateUserPage from "@/features/user/pages/CreateUserPage";
import EditUserPage from "@/features/user/pages/EditUserPage";

export const userRoutes = [
    {
        element: <PermissionRoute permission={PERMISSIONS.USER_VIEW} />,
        children: [
            { path: "users", element: <UsersPage /> },
        ],
    },

    {
        element: <PermissionRoute permission={PERMISSIONS.USER_CREATE} />,
        children: [
            { path: "users/new", element: <CreateUserPage /> },
        ],
    },

    {
        element: <PermissionRoute permission={PERMISSIONS.USER_UPDATE} />,
        children: [
            { path: "users/:id/edit", element: <EditUserPage /> },
        ],
    },
];
