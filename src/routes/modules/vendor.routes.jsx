import PermissionRoute from "../PermissionRoute";
import { PERMISSIONS } from "@/shared/constants/permissions";

import VendorListPage from "@/features/vendor/pages/VendorListPage";
import CreateVendorPage from "@/features/vendor/pages/CreateVendorPage";
import EditVendorPage from "@/features/vendor/pages/EditVendorPage";
import ViewVendorPage from "@/features/vendor/pages/ViewVendorPage";

export const vendorRoutes = [
    {
        element: <PermissionRoute permission={PERMISSIONS.VENDOR_VIEW} />,
        children: [
            { path: "vendors", element: <VendorListPage /> },
            { path: "vendors/:id", element: <ViewVendorPage /> },
        ],
    },

    {
        element: <PermissionRoute permission={PERMISSIONS.VENDOR_CREATE} />,
        children: [{ path: "vendors/new", element: <CreateVendorPage /> }],
    },

    {
        element: <PermissionRoute permission={PERMISSIONS.VENDOR_UPDATE} />,
        children: [{ path: "vendors/:id/edit", element: <EditVendorPage /> }],
    },
];
