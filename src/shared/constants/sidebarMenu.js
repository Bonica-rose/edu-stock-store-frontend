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
  Settings,
  User,
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
    permission: PERMISSIONS.REPORT_DASHBOARD,
  },
  {
    label: "Activity Logs",
    path: "/edu/activity-log",
    icon: HistoryIcon,
    permission: PERMISSIONS.ACTIVITY_VIEW,
  },
  //   {
  //     label: "Analytics",
  //     icon: ChartColumn,
  //     path: "/edu/analytics",
  //   },
];
