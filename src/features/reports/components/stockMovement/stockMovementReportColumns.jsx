import { TableColumnHeader } from "@/shared/components/table";
import { formatDate } from "@/shared/utils/dateFormatter";
import { Badge } from "@/components/ui/badge";

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

export const getStockMovementReportColumns = ({ showBranch = true }) => {
  const columns = [
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        const value = row.original.createdAt;
        return value ? formatDate(value, "DD MMM, YYYY") : "-";
      },
    },

    {
      accessorKey: "inventory",
      header: "Inventory",
      cell: ({ row }) => {
        const inventory = row.original.itemName;

        if (!inventory) {
          return "-";
        }

        return (
          <div className="min-w-40">
            <div className="flex flex-col">
              <span className="font-medium">{row.original.sku}</span>

              <span className="text-xs text-muted-foreground">{inventory}</span>
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
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "previousStock",
      header: "Previous Stock",
    },
    {
      accessorKey: "newStock",
      header: "New Stock",
    },
    {
      accessorKey: "branch",
      header: "Branch",
    },
    {
      accessorKey: "fromBranch",
      header: "From Branch",
      cell: ({ row }) => {
        const value = row.original.fromBranch;
        return value ? value : "-";
      },
    },
    {
      accessorKey: "toBranch",
      header: "To Branch",
      cell: ({ row }) => {
        const value = row.original.toBranch;
        return value ? value : "-";
      },
    },
    {
      accessorKey: "reason",
      header: "Reason",
    },
    {
      accessorKey: "remarks",
      header: "Remarks",
    },
    {
      accessorKey: "performedBy",
      header: "Performed By",
    },
  ];

  if (showBranch) {
    columns.splice(5, 0, {
      accessorKey: "branch",
      header: "Branch",
    });
  }

  return columns;
};
