import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import ActivityModuleBadge from "../components/ActivityModuleBadge";
import ActivityActionBadge from "../components/ActivityActionBadge";
import { formatDateTime } from "@/shared/utils/dateFormatter";

export const getActivityColumns = ({ onView }) => [
  {
    accessorKey: "createdAt",
    header: "Date & Time",
    cell: ({ row }) => {
      const date = row.original.createdAt;

      if (!date) {
        return "-";
      }

      return (
        <div>
          <div className="font-medium">
            {formatDateTime(date, "DD MMMM, YYYY")}
          </div>

          <div className="text-muted-foreground text-xs">
            {formatDateTime(date, "h:mm A")}
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const user = row.original.user;

      if (!user) {
        return "-";
      }

      const fullName = [user.firstName, user.lastName]
        .filter(Boolean)
        .join(" ");

      return (
        <div>
          <div className="font-medium">{fullName || "-"}</div>

          {user.email && (
            <div className="text-muted-foreground text-xs">{user.email}</div>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "module",
    header: "Module",
    cell: ({ row }) => <ActivityModuleBadge module={row.original.module} />,
  },

  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <ActivityActionBadge action={row.original.action} />,
  },

  {
    accessorKey: "recordCode",
    header: "Record",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.recordCode || "-"}</span>
    ),
  },

  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-87.5 truncate">
        {row.original.description || "-"}
      </div>
    ),
  },

  {
    accessorKey: "branch",
    header: "Branch",
    cell: ({ row }) => {
      const branch = row.original.branch;

      if (!branch) {
        return <span className="text-muted-foreground">Global</span>;
      }

      return (
        <div>
          <div className="font-medium">{branch.branchName || "-"}</div>

          {branch.branchCode && (
            <div className="text-muted-foreground text-xs">
              {branch.branchCode}
            </div>
          )}
        </div>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    enableHiding: false,

    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onView(row.original)}
        title="View Activity"
      >
        <Eye className="size-4" />
      </Button>
    ),
  },
];
