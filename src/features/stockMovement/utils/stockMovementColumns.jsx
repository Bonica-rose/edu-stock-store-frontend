import { Badge } from "@/components/ui/badge";
import { TableColumnHeader } from "@/shared/components/table";

import StockMovementActions from "../components/StockMovementActions";

const getMovementBadgeClass = (type) => {
  switch (type) {
    case "Stock In":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";

    case "Stock Out":
      return "bg-red-100 text-red-700 border-red-200";

    case "Transfer":
      return "bg-sky-100 text-sky-700 border-sky-200";

    case "Adjustment":
      return "bg-purple-100 text-purple-700 border-purple-200";

    default:
      return "bg-muted text-muted-foreground";
  }
};

export const getStockMovementColumns = ({ onView }) => [
  {
    accessorKey: "createdAt",
    header: ({ column }) => <TableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => {
      const date = row.original.createdAt;

      if (!date) {
        return "-";
      }

      return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date(date));
    },
  },

  {
    accessorFn: (row) => row.inventory?.sku ?? "-",
    id: "inventory",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Inventory" />
    ),
    cell: ({ row }) => {
      const inventory = row.original.inventory;

      if (!inventory) {
        return "-";
      }

      return (
        <div className="min-w-40">
          <div className="flex flex-col">
            <span className="font-medium">{inventory.sku}</span>

            <span className="text-xs text-muted-foreground">
              {inventory.itemName}
            </span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "movementType",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Movement Type" />
    ),
    cell: ({ row }) => {
      const type = row.original.movementType;

      return (
        <div className="min-w-24">
          <Badge className={getMovementBadgeClass(type)}>{type}</Badge>
        </div>
      );
    },
  },

  {
    accessorFn: (row) => row.branch?.branchName ?? "-",
    id: "branch",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Branch" />
    ),
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Quantity" />
    ),
  },

  {
    accessorKey: "previousStock",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Previous Stock" />
    ),
  },

  {
    accessorKey: "newStock",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="New Stock" />
    ),
  },

  {
    accessorFn: (row) => {
      const performedBy = row.performedBy;
      if (!performedBy) {
        return "-";
      }

      return `${performedBy.firstName ?? ""} ${
        performedBy.lastName ?? ""
      }`.trim();
    },

    id: "performedBy",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Performed By" />
    ),
  },

  {
    id: "action",
    header: "Action",
    enableSorting: false,
    cell: ({ row }) => (
      <StockMovementActions movement={row.original} onView={onView} />
    ),
  },
];
