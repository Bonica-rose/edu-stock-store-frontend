import {
  Users,
  Building2,
  Package,
  Boxes,
  Truck,
  Wrench,
  TriangleAlert,
  ArrowDownToLine,
  ArrowUpFromLine,
  ClipboardList,
} from "lucide-react";

import SummaryCard from "./SummaryCard";

const summaryConfig = {
  totalUsers: {
    title: "Total Users",
    icon: Users,
    iconClass: "text-blue-600",
  },
  totalBranches: {
    title: "Total Branches",
    icon: Building2,
    iconClass: "text-violet-600",
  },
  totalVendors: {
    title: "Total Vendors",
    icon: Truck,
    iconClass: "text-orange-600",
  },
  totalInventory: {
    title: "Inventory Items",
    icon: Boxes,
    iconClass: "text-cyan-600",
  },
  totalAssets: {
    title: "Assets",
    icon: Package,
    iconClass: "text-lime-600",
  },
  inventory: {
    title: "Inventory",
    icon: Boxes,
  },
  assets: {
    title: "Assets",
    icon: Package,
  },
  users: {
    title: "Users",
    icon: Users,
  },
  maintenance: {
    title: "Maintenance",
    icon: Wrench,
    iconClass: "text-amber-600",
  },
  pending: {
    title: "Pending",
    icon: ClipboardList,
  },
  inProgress: {
    title: "In Progress",
    icon: Wrench,
  },
  completed: {
    title: "Completed",
    icon: ClipboardList,
  },
  lowStock: {
    title: "Low Stock",
    icon: TriangleAlert,
    iconClass: "text-red-600",
  },
  stockInToday: {
    title: "Stock In",
    icon: ArrowDownToLine,
  },
  stockOutToday: {
    title: "Stock Out",
    icon: ArrowUpFromLine,
  },
  movements: {
    title: "Stock Movements",
    icon: ArrowUpFromLine,
  },
};

export default function SummaryCards({ summary = {} }) {
  
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Object.entries(summary).map(([key, value]) => {
        const config = summaryConfig[key];

        if (!config) return null;

        return (
          <SummaryCard
            key={key}
            title={config.title}
            value={value}
            icon={config.icon}
            iconColor={config.iconClass}
            cardColor={config.bgClass}
          />
        );
      })}
    </div>
  );
}
