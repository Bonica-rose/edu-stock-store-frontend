import { MoreHorizontal, Pencil, Power, Eye, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function AssetActions({
  asset,
  onView,
  onEdit,
  onStatusChange,
  onDelete,
}) { 
  const { hasPermission } = usePermission();

  const canView = hasPermission(PERMISSIONS.ASSET_VIEW);
  const canUpdate = hasPermission(PERMISSIONS.ASSET_UPDATE);
  const canStatusChange = hasPermission(PERMISSIONS.ASSET_CHANGE_STATUS);
  const canDelete = hasPermission(PERMISSIONS.ASSET_DELETE);

  const actions = [
    canUpdate && onEdit && asset.status !== "Retired"
      ? {
          key: "edit",
          label: "Edit",
          icon: Pencil,
          onClick: () => onEdit(asset),
        }
      : null,

    canStatusChange && onStatusChange && !asset.assignedTo
      ? {
          key: "status",
          label: asset.isActive ? "Deactivate" : "Activate",
          icon: Power,
          onClick: () => onStatusChange(asset),
        }
      : null,

    canView && onView
      ? {
          key: "view",
          label: "View",
          icon: Eye,
          onClick: () => onView(asset),
        }
      : null,

    canDelete && onDelete && !asset.assignedTo
      ? {
          key: "delete",
          label: "Delete",
          icon: Trash2,
          onClick: () => onDelete(asset),
          destructive: true,
        }
      : null,
  ].filter(Boolean);

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
