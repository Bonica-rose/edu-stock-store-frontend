import { Badge } from "@/components/ui/badge";
import { TableColumnHeader } from "@/shared/components/table";
import AssetActions from "../components/AssetActions";

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

const getStatusBadgeClass = (status) => {
  switch (status) {
    case "Available":
      return "bg-green-100 text-green-700 border-green-200";

    case "Assigned":
      return "bg-sky-100 text-sky-700 border-sky-200";

    case "Maintenance":
      return "bg-amber-100 text-amber-700 border-amber-200";

    case "Retired":
      return "bg-gray-100 text-gray-700 border-gray-200";

    default:
      return "bg-muted text-muted-foreground";
  }
};

export const getAssetColumns = ({
  onView,
  onEdit,
  onChangeStatus,
  onDelete,
  canView,
  canUpdate,
  canStatusChange,
  canDelete,
}) => [
  // Asset Code
  {
    accessorKey: "assetCode",

    header: ({ column }) => (
      <TableColumnHeader column={column} title="Asset Code" />
    ),

    cell: ({ row }) => (
      <span className="font-medium">{row.original.assetCode ?? "-"}</span>
    ),
  },

  // Inventory
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

  // Serial Number
  {
    accessorKey: "serialNumber",

    header: ({ column }) => (
      <TableColumnHeader column={column} title="Serial Number" />
    ),

    cell: ({ row }) => <span>{row.original.serialNumber ?? "-"}</span>,
  },

  // Branch
  {
    accessorFn: (row) => row.branch?.branchName ?? "-",

    id: "branch",

    header: ({ column }) => (
      <TableColumnHeader column={column} title="Branch" />
    ),
  },

  // Assigned To
  {
    accessorFn: (row) => {
      const assignedTo = row.assignedTo;

      if (!assignedTo) {
        return "Unassigned";
      }

      return `${assignedTo.firstName ?? ""} ${
        assignedTo.lastName ?? ""
      }`.trim();
    },

    id: "assignedTo",

    header: ({ column }) => (
      <TableColumnHeader column={column} title="Assigned To" />
    ),

    cell: ({ row }) => {
      const assignedTo = row.original.assignedTo;

      if (!assignedTo) {
        return <span className="text-muted-foreground">Unassigned</span>;
      }

      return (
        <div className="flex flex-col">
          <span>
            {`${assignedTo.firstName ?? ""} ${
              assignedTo.lastName ?? ""
            }`.trim()}
          </span>

          {assignedTo.email && (
            <span className="text-xs text-muted-foreground">
              {assignedTo.email}
            </span>
          )}
        </div>
      );
    },
  },

  // Condition
  {
    accessorKey: "condition",

    header: ({ column }) => (
      <TableColumnHeader column={column} title="Condition" />
    ),

    cell: ({ row }) => {
      const condition = row.original.condition;

      return (
        <Badge className={getConditionBadgeClass(condition)}>
          {condition ?? "-"}
        </Badge>
      );
    },
  },

  // Status
  {
    accessorKey: "status",

    header: ({ column }) => (
      <TableColumnHeader column={column} title="Status" />
    ),

    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Badge className={getStatusBadgeClass(status)}>{status ?? "-"}</Badge>
      );
    },
  },

  // Active
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Active" />
    ),

    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? "active" : "inactive"}>
        {row.original.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },

  // Actions column only when at least one permission exists
  ...(canView || canUpdate || canStatusChange || canDelete
    ? [
        {
          id: "actions",
          header: "Actions",
          enableSorting: false,
          cell: ({ row }) => (
            <AssetActions
              asset={row.original}
              onView={onView}
              onEdit={onEdit}
              onStatusChange={onChangeStatus}
              onDelete={onDelete}
            />
          ),
        },
      ]
    : []),
];
