import { Badge } from "@/components/ui/badge";
import { TableColumnHeader } from "@/shared/components/table";
import CategoryActions from "../components/CategoryActions";
import { getCategoryTypeBadgeClass } from "../utils/categoryHelpers";

export const getCategoryColumns = ({
  onEdit,
  onStatusChange,
  onDelete,
  canUpdate,
  canStatusChange,
  canDelete,
}) => [
  {
    accessorKey: "categoryName",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Category Name" />
    ),
  },
  {
    accessorKey: "categoryCode",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Category Code" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => <TableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const type = row.original.type;
      return (
        <Badge variant="outline" className={getCategoryTypeBadgeClass(type)}>
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <span
        className="block max-w-75 truncate"
        title={row.original.description || ""}
      >
        {row.original.description || "-"}
      </span>
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
    accessorFn: (row) =>
      row.createdBy
        ? `${row.createdBy.firstName} ${row.createdBy.lastName}`
        : "-",
    id: "createdBy",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Created By" />
    ),
  },

  // Actions column only when at least one permission exists
  ...(canUpdate || canStatusChange || canDelete
    ? [
        {
          id: "actions",
          header: "Actions",
          enableSorting: false,
          cell: ({ row }) => (
            <CategoryActions
              category={row.original}
              onEdit={onEdit}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ),
        },
      ]
    : []),
];