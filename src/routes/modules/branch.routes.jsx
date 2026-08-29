import PermissionRoute from "../PermissionRoute";
import { PERMISSIONS } from "@/shared/constants/permissions";

import BranchListPage from "@/features/branch/pages/BranchListPage";
import CreateBranchPage from "@/features/branch/pages/CreateBranchPage";
import EditBranchPage from "@/features/branch/pages/EditBranchPage";
import ViewBranchPage from "@/features/branch/pages/ViewBranchPage";

export const branchRoutes = [
    {
        element: <PermissionRoute permission={PERMISSIONS.BRANCH_VIEW} />,
        children: [
            { path: "branches", element: <BranchListPage /> },
            { path: "branches/:id", element: <ViewBranchPage /> },
        ],
    },

    {
        element: <PermissionRoute permission={PERMISSIONS.BRANCH_CREATE} />,
        children: [
            { path: "branches/new", element: <CreateBranchPage /> },
        ],
    },

    {
        element: <PermissionRoute permission={PERMISSIONS.BRANCH_UPDATE} />,
        children: [
            { path: "branches/:id/edit", element: <EditBranchPage /> },
        ],
    },
];
