import PermissionRoute from "../PermissionRoute";
import { PERMISSIONS } from "@/shared/constants/permissions";

import AssetListPage from "@/features/asset/pages/AssetListPage";
import CreateAssetPage from "@/features/asset/pages/CreateAssetPage";
import EditAssetPage from "@/features/asset/pages/EditAssetPage";
import ViewAssetPage from "@/features/asset/pages/ViewAssetPage";

export const assetRoutes = [
    {
        element: <PermissionRoute permission={PERMISSIONS.ASSET_VIEW} />,
        children: [
            { path: "assets", element: <AssetListPage /> },
            { path: "assets/:id", element: <ViewAssetPage /> },
        ],
    },

    {
        element: <PermissionRoute permission={PERMISSIONS.ASSET_CREATE} />,
        children: [{ path: "assets/new", element: <CreateAssetPage /> }],
    },

    {
        element: <PermissionRoute permission={PERMISSIONS.ASSET_UPDATE} />,
        children: [{ path: "assets/:id/edit", element: <EditAssetPage /> }],
    },
];
