import { MoreHorizontal, Pencil, Power, Trash2, Eye } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function CategoryActions({
  category,
  onEdit,
  onStatusChange,
  onDelete,
}) {
  const { hasPermission } = usePermission();

  const canStatusChange = hasPermission(PERMISSIONS.CATEGORY_CHANGE_STATUS);
  const canUpdate = hasPermission(PERMISSIONS.CATEGORY_UPDATE);
  const canDelete = hasPermission(PERMISSIONS.CATEGORY_DELETE);

  const actions = [
    canUpdate && onEdit
      ? {
          key: "edit",
          label: "Edit",
          icon: Pencil,
          onClick: () => onEdit(category),
        }
      : null,

    canStatusChange && onStatusChange
      ? {
          key: "status",
          label: category.isActive ? "Deactivate" : "Activate",
          icon: Power,
          onClick: () => onStatusChange(category),
        }
      : null,

    canDelete && onDelete
      ? {
          key: "delete",
          label: "Delete",
          icon: Trash2,
          onClick: () => onDelete(category),
          destructive: true,
        }
      : null,
  ].filter(Boolean);

  // No available actions
  if (actions.length === 0) {
    return null;
  }

  // Only one available action
  if (actions.length === 1) {
    const action = actions[0];
    const Icon = action.icon;

    return (
      <button
        type="button"
        onClick={action.onClick}
        title={action.label}
        className="inline-flex size-8 items-center justify-center rounded-md hover:bg-muted"
      >
        <Icon className="h-4 w-4" />
      </button>
    );
  }

  // Multiple available actions
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex size-8 items-center justify-center rounded-md hover:bg-muted">
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <DropdownMenuItem
              key={action.key}
              onClick={action.onClick}
              className={
                action.destructive
                  ? "text-destructive focus:text-destructive"
                  : ""
              }
            >
              <Icon className="mr-2 h-4 w-4" />
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
