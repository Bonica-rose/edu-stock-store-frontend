import { MoreHorizontal, Pencil, Power, Trash2, Eye } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function VendorActions({
  vendor,
  onView,
  onEdit,
  onStatusChange,
  onDelete,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex size-8 items-center justify-center rounded-md hover:bg-muted">
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {/* View */}
        {onView && (
          <DropdownMenuItem onClick={() => onView(vendor)}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </DropdownMenuItem>
        )}

        {/* Edit */}
        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(vendor)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}

        {/* Activate / Deactivate */}
        {onStatusChange && (
          <DropdownMenuItem onClick={() => onStatusChange(vendor)}>
            <Power className="mr-2 h-4 w-4" />

            {vendor.isActive ? "Deactivate" : "Activate"}
          </DropdownMenuItem>
        )}

        {/* Delete */}
        {onDelete && (
          <DropdownMenuItem
            onClick={() => onDelete(vendor)}
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
