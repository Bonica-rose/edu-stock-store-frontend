import { MoreHorizontal, Pencil, Power, Eye, Trash2, UserPlus, UserMinus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AssetActions({
  asset,
  onView,
  onEdit,
  onStatusChange,
  onDelete,
  onAssign,
  onReturn,
}) { 
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex size-8 items-center justify-center rounded-md hover:bg-muted">
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {onView && (
          <DropdownMenuItem onClick={() => onView(asset)}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </DropdownMenuItem>
        )}

        {onEdit && asset.status !== "Retired" && (
          <DropdownMenuItem onClick={() => onEdit(asset)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}

        {onAssign && asset.status === "Available" && (
          <DropdownMenuItem onClick={() => onAssign(asset)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Assign
          </DropdownMenuItem>
        )}

        {onReturn && asset.status === "Assigned" && (
          <DropdownMenuItem onClick={() => onReturn(asset)}>
            <UserMinus className="mr-2 h-4 w-4" />
            Return
          </DropdownMenuItem>
        )}

        {onStatusChange && !asset.assignedTo && (
          <DropdownMenuItem onClick={() => onStatusChange(asset)}>
            <Power className="mr-2 h-4 w-4" />
            {asset.isActive ? "Deactivate" : "Activate"}
          </DropdownMenuItem>
        )}

        {onDelete && !asset.assignedTo && (
          <DropdownMenuItem
            onClick={() => onDelete(asset)}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
