import { Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import MaintenanceStatusBadge from "../components/MaintenanceStatusBadge";
import MaintenancePriorityBadge from "../components/MaintenancePriorityBadge";

export const getMaintenanceColumns = ({ onView, onDelete, canView, canDelete }) => [
  {
    accessorKey: "maintenanceId",
    header: "Maintenance ID",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.maintenanceId}</span>
    ),
  },

  {
    accessorKey: "asset",
    header: "Asset",
    cell: ({ row }) => {
      const asset = row.original.asset;

      return (
        <div className="flex flex-col">
          <span className="font-medium">{asset?.assetCode ?? "-"}</span>

          {asset?.inventory?.itemName && (
            <span className="text-muted-foreground text-xs">
              {asset.inventory.itemName}
            </span>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "issue",
    header: "Issue",
    cell: ({ row }) => (
      <span className="block max-w-70 truncate" title={row.original.issueTitle}>
        {row.original.issueTitle || "-"}
      </span>
    ),
  },

  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => (
      <MaintenancePriorityBadge priority={row.original.priority} />
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <MaintenanceStatusBadge status={row.original.status} />,
  },

  // Actions column only when at least one permission exists
  ...(canView || canDelete
    ? [
        {
          id: "actions",
          header: "Actions",
          enableSorting: false,
          cell: ({ row }) => {
            const maintenance = row.original;

            return (
              <div className="flex items-center gap-1">
                {canView && <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onView(maintenance)}
                  title="View maintenance"
                >
                  <Eye className="h-4 w-4" />
                </Button>}

                {canDelete && <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(maintenance)}
                  title="Delete maintenance"
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>}
              </div>
            );
          }
        },
      ]
    : []),

  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const maintenance = row.original;

  //     return (
  //       <div className="flex items-center gap-1">
  //         <Button
  //           variant="ghost"
  //           size="icon"
  //           onClick={() => onView(maintenance)}
  //           title="View maintenance"
  //         >
  //           <Eye className="h-4 w-4" />
  //         </Button>

  //         <Button
  //           variant="ghost"
  //           size="icon"
  //           onClick={() => onDelete(maintenance)}
  //           title="Delete maintenance"
  //           className="text-destructive focus:text-destructive"
  //         >
  //           <Trash2 className="h-4 w-4" />
  //         </Button>
  //       </div>
  //     );
  //   },
  // },
];
