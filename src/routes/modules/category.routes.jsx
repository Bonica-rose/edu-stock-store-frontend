import PermissionRoute from "../PermissionRoute";
import { PERMISSIONS } from "@/shared/constants/permissions";

import CategoryListPage from "@/features/category/pages/CategoryListPage";
import CreateCategoryPage from "@/features/category/pages/CreateCategoryPage";
import EditCategoryPage from "@/features/category/pages/EditCategoryPage";

export const categoryRoutes = [
    {
        element: <PermissionRoute permission={PERMISSIONS.CATEGORY_VIEW} />,
        children: [{ path: "categories", element: <CategoryListPage /> }],
    },

    {
        element: <PermissionRoute permission={PERMISSIONS.CATEGORY_CREATE} />,
        children: [{ path: "categories/new", element: <CreateCategoryPage /> }],
    },

    {
        element: <PermissionRoute permission={PERMISSIONS.CATEGORY_UPDATE} />,
        children: [
            { path: "categories/:id/edit", element: <EditCategoryPage /> },
        ],
    },
];
