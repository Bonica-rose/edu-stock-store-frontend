import {
  LayoutDashboard,
  Users,
  Building2,
  FolderTree,
  Truck,
  Boxes,
  ShoppingCart,
  ArrowLeftRight,
  Monitor,
  Wrench,
  FileBarChart,
  History as HistoryIcon,
  ChartColumn,
  PackageSearch,
} from "lucide-react";
import { PERMISSIONS } from "@/shared/constants/permissions";

export const sidebarMenu = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/edu/dashboard",
  },
  {
    label: "Users",
    icon: Users,
    path: "/edu/users",
    permission: PERMISSIONS.USER_VIEW,
  },
  {
    label: "Branches",
    icon: Building2,
    path: "/edu/branches",
    permission: PERMISSIONS.BRANCH_VIEW,
  },
  {
    label: "Categories",
    icon: FolderTree,
    path: "/edu/categories",
    permission: PERMISSIONS.CATEGORY_VIEW,
  },
  {
    label: "Vendors",
    icon: Truck,
    path: "/edu/vendors",
    permission: PERMISSIONS.VENDOR_VIEW,
  },
  {
    label: "Inventory",
    icon: Boxes,
    path: "/edu/inventory",
    permission: PERMISSIONS.INVENTORY_VIEW,
  },
  {
    label: "Purchases",
    icon: ShoppingCart,
    path: "/edu/purchases",
    permission: PERMISSIONS.PURCHASE_VIEW,
  },
  {
    label: "Stock Movement",
    icon: ArrowLeftRight,
    path: "/edu/stock-movements",
    permission: PERMISSIONS.STOCK_MOVEMENT_VIEW,
  },
  {
    label: "Assets",
    icon: Monitor,
    path: "/edu/assets",
    permission: PERMISSIONS.ASSET_VIEW,
  },
  {
    label: "Maintenance",
    icon: Wrench,
    path: "/edu/maintenance",
    permission: PERMISSIONS.MAINTENANCE_VIEW,
  },
  {
    label: "Reports",
    icon: FileBarChart,
    path: "/edu/reports",

    children: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/edu/reports",
        exact: true,
        permission: PERMISSIONS.REPORT_DASHBOARD,
        color: "text-purple-600",
      },

      {
        label: "Inventory",
        icon: Boxes,
        path: "/edu/reports/inventory",
        permission: PERMISSIONS.REPORT_INVENTORY,
        color: "text-cyan-600",
      },

      {
        label: "Low Stock",
        icon: PackageSearch,
        path: "/edu/reports/low-stock",
        permission: PERMISSIONS.REPORT_LOW_STOCK,
        color: "text-red-600",
      },

      {
        label: "Assets",
        icon: Monitor,
        path: "/edu/reports/assets",
        permission: PERMISSIONS.REPORT_ASSET,
        color: "text-lime-600",
      },

      {
        label: "Stock Movements",
        icon: ArrowLeftRight,
        path: "/edu/reports/stock-movements",
        permission: PERMISSIONS.REPORT_STOCK_MOVEMENT,
        color: "text-blue-600",
      },

      {
        label: "Purchases",
        icon: ShoppingCart,
        path: "/edu/reports/purchases",
        permission: PERMISSIONS.REPORT_PURCHASE,
        color: "text-violet-600",
      },

      {
        label: "Maintenance",
        icon: Wrench,
        path: "/edu/reports/maintenance",
        permission: PERMISSIONS.REPORT_MAINTENANCE,
        color: "text-amber-600",
      },

      {
        label: "Vendors",
        icon: Truck,
        path: "/edu/reports/vendors",
        permission: PERMISSIONS.REPORT_VENDOR,
        color: "text-orange-600",
      },
    ],
  },
  {
    label: "Activity Logs",
    path: "/edu/activity-log",
    icon: HistoryIcon,
    permission: PERMISSIONS.ACTIVITY_VIEW,
  },
  {
    label: "Analytics",
    icon: ChartColumn,
    path: "/edu/analytics",
  },
];
