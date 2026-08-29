import PermissionRoute from "../PermissionRoute";
import { PERMISSIONS } from "@/shared/constants/permissions";

import ReportDashboardPage from "@/features/reports/pages/ReportDashboardPage";

// import InventoryReportPage from "@/pages/reports/InventoryReportPage";
// import LowStockReportPage from "@/pages/reports/LowStockReportPage";
// import AssetReportPage from "@/pages/reports/AssetReportPage";
// import StockMovementReportPage from "@/pages/reports/StockMovementReportPage";
// import PurchaseReportPage from "@/pages/reports/PurchaseReportPage";
// import MaintenanceReportPage from "@/pages/reports/MaintenanceReportPage";
// import VendorReportPage from "@/pages/reports/VendorReportPage";

export const reportRoutes = [
    {
        element: <PermissionRoute permission={PERMISSIONS.REPORT_DASHBOARD} />,
        children: [{ path: "reports", element: <ReportDashboardPage />} ],
    },

//   {
//     element: <PermissionRoute permission={PERMISSIONS.REPORT_INVENTORY} />,
//     children: [
//       {
//         path: "reports/inventory",
//         element: <InventoryReportPage />,
//       },
//     ],
//   },

//   {
//     element: <PermissionRoute permission={PERMISSIONS.REPORT_LOW_STOCK} />,
//     children: [
//       {
//         path: "reports/low-stock",
//         element: <LowStockReportPage />,
//       },
//     ],
//   },

//   {
//     element: <PermissionRoute permission={PERMISSIONS.REPORT_ASSET} />,
//     children: [
//       {
//         path: "reports/assets",
//         element: <AssetReportPage />,
//       },
//     ],
//   },

//   {
//     element: <PermissionRoute permission={PERMISSIONS.REPORT_STOCK_MOVEMENT} />,
//     children: [
//       {
//         path: "reports/stock-movements",
//         element: <StockMovementReportPage />,
//       },
//     ],
//   },

//   {
//     element: <PermissionRoute permission={PERMISSIONS.REPORT_PURCHASE} />,
//     children: [
//       {
//         path: "reports/purchases",
//         element: <PurchaseReportPage />,
//       },
//     ],
//   },

//   {
//     element: <PermissionRoute permission={PERMISSIONS.REPORT_MAINTENANCE} />,
//     children: [
//       {
//         path: "reports/maintenance",
//         element: <MaintenanceReportPage />,
//       },
//     ],
//   },

//   {
//     element: <PermissionRoute permission={PERMISSIONS.REPORT_VENDOR} />,
//     children: [
//       {
//         path: "reports/vendors",
//         element: <VendorReportPage />,
//       },
//     ],
//   },
];
