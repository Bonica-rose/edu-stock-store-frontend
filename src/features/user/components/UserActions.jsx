import { MoreHorizontal, Pencil, Power, Trash2, Eye } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function UserActions({
  user,
  onEdit,
  onStatusChange,
  onDelete,
}) {
  const { hasPermission } = usePermission();

  const canUpdate = hasPermission(PERMISSIONS.USER_UPDATE);
  const canChangeStatus = hasPermission(PERMISSIONS.USER_STATUS_UPDATE);
  const canDelete = hasPermission(PERMISSIONS.USER_DELETE);

  const showActions =
    (canUpdate && onEdit) ||
    (canChangeStatus && onStatusChange) ||
    (canDelete && onDelete);

  /* Don't render the Actions button if user has none of the available action permissions */
  if (!showActions) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex size-8 items-center justify-center rounded-md hover:bg-muted">
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {canUpdate && onEdit && (
          <DropdownMenuItem onClick={() => onEdit(user)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}

        {canChangeStatus && onStatusChange && (
          <DropdownMenuItem onClick={() => onStatusChange(user)}>
            <Power className="mr-2 h-4 w-4" />

            {user.isActive ? "Deactivate" : "Activate"}
          </DropdownMenuItem>
        )}

        {canDelete && onDelete && (
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
