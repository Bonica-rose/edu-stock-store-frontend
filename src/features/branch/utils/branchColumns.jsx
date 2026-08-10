import { Badge } from "@/components/ui/badge";
import { TableColumnHeader } from "@/shared/components/table";

import BranchActions from "../components/BranchActions";

export const getBranchColumns = ({ onView, onEdit, onStatusChange }) => [
  {
    accessorKey: "branchCode",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Branch Code" />
    ),
  },

  {
    accessorKey: "branchName",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Branch Name" />
    ),
  },

  {
    accessorKey: "city",
    header: ({ column }) => <TableColumnHeader column={column} title="City" />,
  },

  {
    accessorKey: "state",
    header: ({ column }) => <TableColumnHeader column={column} title="State" />,
  },

  {
    accessorFn: (row) =>
      row.manager ? `${row.manager.firstName} ${row.manager.lastName}` : "-",
    id: "manager",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Manager" />
    ),
  },

  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Status" />
    ),

    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? "default" : "secondary"}>
        {row.original.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    enableSorting: false,

    cell: ({ row }) => (
      <BranchActions
        branch={row.original}
        onView={onView}
        onEdit={onEdit}
        onStatusChange={onStatusChange}
      />
    ),
  },
];
