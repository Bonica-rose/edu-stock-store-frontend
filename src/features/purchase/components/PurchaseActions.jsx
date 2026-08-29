import { Eye } from "lucide-react";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function PurchaseActions({ purchase, onView }) {
  const { hasPermission } = usePermission();

  const canView = hasPermission(PERMISSIONS.PURCHASE_VIEW);

  const actions = [
    canView && onView
      ? {
          key: "view",
          label: "View",
          icon: Eye,
          onClick: () => onView(purchase),
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

