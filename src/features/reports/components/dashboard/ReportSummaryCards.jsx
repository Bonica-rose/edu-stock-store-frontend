import {
  Package,
  Boxes,
  Truck,
  GitBranch,
  ArrowLeftRight,
  AlertTriangle,
  Wrench,
} from "lucide-react";

import ReportSummaryCard from "./ReportSummaryCard";

export default function ReportSummaryCards({ data, loading }) {
  const cards = [
    {
      title: "Inventory Items",
      value: data?.inventoryItems ?? 0,
      icon: Package,
      color: "text-cyan-600 bg-cyan-100 border-cyan-600",
    },
    {
      title: "Assets",
      value: data?.assets ?? 0,
      icon: Boxes,
      color: "text-lime-600 bg-lime-100 border-lime-600",
    },
    {
      title: "Vendors",
      value: data?.vendors ?? 0,
      icon: Truck,
      color: "text-orange-600 bg-orange-100 border-orange-600",
    },
    {
      title: "Branches",
      value: data?.branches ?? 0,
      icon: GitBranch,
      color: "text-violet-600 bg-violet-100 border-violet-600",
    },
    {
      title: "Stock Movements",
      value: data?.stockMovements ?? 0,
      icon: ArrowLeftRight,
      color: "text-blue-600 bg-blue-100 border-blue-600",
    },
    {
      title: "Low Stock Items",
      value: data?.lowStockItems ?? 0,
      icon: AlertTriangle,
      color: "text-red-600 bg-red-100 border-red-600",
    },
    {
      title: "Pending Maintenance",
      value: data?.pendingMaintenance ?? 0,
      icon: Wrench,
      color: "text-amber-600 bg-amber-100 border-amber-600",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {cards.map((card) => (
        <ReportSummaryCard key={card.title} {...card} loading={loading} />
      ))}
    </div>
  );
}
