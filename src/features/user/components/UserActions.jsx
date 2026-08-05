import { MoreHorizontal, Pencil, Power, Trash2, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserActions({
  user,
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
        {onView && (
          <DropdownMenuItem onClick={() => onView(user)}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </DropdownMenuItem>
        )}

        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(user)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}

        {onStatusChange && (
          <DropdownMenuItem onClick={() => onStatusChange(user)}>
            <Power className="mr-2 h-4 w-4" />

            {user.isActive ? "Deactivate" : "Activate"}
          </DropdownMenuItem>
        )}

        {onDelete && (
          <DropdownMenuItem
            onClick={() => onDelete(user)}
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
