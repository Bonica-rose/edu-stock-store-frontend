import PermissionRoute from "../PermissionRoute";
import { PERMISSIONS } from "@/shared/constants/permissions";

import ReportDashboardPage from "@/features/reports/pages/ReportDashboardPage";
import InventoryReportPage from "@/features/reports/pages/InventoryReportPage";
import LowStockReportPage from "@/features/reports/pages/LowStockReportPage";
import AssetReportPage from "@/features/reports/pages/AssetReportPage";
import StockMovementReportPage from "@/features/reports/pages/StockMovementReportPage";
import PurchaseReportPage from "@/features/reports/pages/PurchaseReportPage";
import MaintenanceReportPage from "@/features/reports/pages/MaintenanceReportPage";
import VendorReportPage from "@/features/reports/pages/VendorReportPage";

export const reportRoutes = [
    {
        element: <PermissionRoute permission={PERMISSIONS.REPORT_DASHBOARD} />,
        children: [{ path: "reports", element: <ReportDashboardPage />} ],
    },

  {
    element: <PermissionRoute permission={PERMISSIONS.REPORT_INVENTORY} />,
    children: [
      {
        path: "reports/inventory",
        element: <InventoryReportPage />,
      },
    ],
  },

  {
    element: <PermissionRoute permission={PERMISSIONS.REPORT_LOW_STOCK} />,
    children: [
      {
        path: "reports/low-stock",
        element: <LowStockReportPage />,
      },
    ],
  },

  {
    element: <PermissionRoute permission={PERMISSIONS.REPORT_ASSET} />,
    children: [
      {
        path: "reports/assets",
        element: <AssetReportPage />,
      },
    ],
  },

  {
    element: <PermissionRoute permission={PERMISSIONS.REPORT_STOCK_MOVEMENT} />,
    children: [
      {
        path: "reports/stock-movements",
        element: <StockMovementReportPage />,
      },
    ],
  },

  {
    element: <PermissionRoute permission={PERMISSIONS.REPORT_PURCHASE} />,
    children: [
      {
        path: "reports/purchases",
        element: <PurchaseReportPage />,
      },
    ],
  },

  {
    element: <PermissionRoute permission={PERMISSIONS.REPORT_MAINTENANCE} />,
    children: [
      {
        path: "reports/maintenance",
        element: <MaintenanceReportPage />,
      },
    ],
  },

  {
    element: <PermissionRoute permission={PERMISSIONS.REPORT_VENDOR} />,
    children: [
      {
        path: "reports/vendors",
        element: <VendorReportPage />,
      },
    ],
  },
];
