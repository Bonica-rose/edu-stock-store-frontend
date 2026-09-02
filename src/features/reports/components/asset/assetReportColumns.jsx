import { formatDate } from "@/shared/utils/dateFormatter";
import { Badge } from "@/components/ui/badge";
import AssetStatusBadge from "@/features/asset/components/AssetStatusBadge";

const getConditionBadgeClass = (condition) => {
  switch (condition) {
    case "Good":
      return "bg-blue-100 text-blue-700 border-blue-200";

    case "Damaged":
      return "bg-red-100 text-red-700 border-red-200";

    case "Under Maintenance":
      return "bg-orange-100 text-orange-700 border-orange-200";

    case "Retired":
      return "bg-slate-100 text-slate-700 border-slate-200";

    default:
      return "bg-muted text-muted-foreground";
  }
};

export const getAssetReportColumns = ({ showBranch = true }) => {
  const columns = [
    {
      accessorKey: "assetCode",
      header: "Asset Code",
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
      accessorKey: "serialNumber",
      header: "Serial Number",
    },

    {
      accessorKey: "status",
      header: "Asset Status",
      cell: ({ row }) => <AssetStatusBadge status={row.original.status} />,
    },

    {
      accessorKey: "condition",
      header: "Asset Condition",
      cell: ({ row }) => {
        const condition = row.original.condition;

        return (
          <Badge className={getConditionBadgeClass(condition)}>
            {condition ?? "-"}
          </Badge>
        );
      },
    },

    {
      accessorKey: "assignedTo",
      header: "Asset Assigned To",
      cell: ({ row }) => {
        const assignedTo = row.original.assignedTo;

        if (!assignedTo) {
          return "-";
        }

        return (
          <div className="min-w-40">
            <div className="flex flex-col">
              <span className="font-medium">{assignedTo}</span>

              <span className="text-xs text-muted-foreground">
                {row.original.assignedEmployeeId}
              </span>
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "assignedDate",
      header: "Asset Assigned On",
      cell: ({ row }) => {
        const value = row.original.assignedDate;

        return value ? formatDate(value, "DD MMM, YYYY") : "-";
      },
    },

    {
      accessorKey: "createdAt",
      header: "Asset Creation",
      cell: ({ row }) => {
        const value = row.original.createdAt;

        return value ? formatDate(value, "DD MMM, YYYY") : "-";
      },
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
