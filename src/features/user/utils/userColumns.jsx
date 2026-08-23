import { Badge } from "@/components/ui/badge";
import { TableColumnHeader } from "@/shared/components/table";
import UserActions from "../components/UserActions";

export const getUserColumns = ({ onEdit, onStatusChange, onDelete }) => [
  {
    accessorKey: "employeeId",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Employee ID" />
    ),
  },

  {
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    id: "name",
    header: ({ column }) => <TableColumnHeader column={column} title="Name" />,
  },

  {
    accessorKey: "email",
    header: ({ column }) => <TableColumnHeader column={column} title="Email" />,
  },

  {
    accessorKey: "role",
    header: ({ column }) => <TableColumnHeader column={column} title="Role" />,
  },

  {
    accessorFn: (row) => row.branch?.branchName ?? "-",
    id: "branch",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Branch" />
    ),
  },

  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Status" />
    ),

    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? "active" : "inactive"}>
        {row.original.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }) => (
      <UserActions
        user={row.original}
        onEdit={onEdit}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
      />
    ),
  },
];

