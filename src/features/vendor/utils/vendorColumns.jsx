import { Badge } from "@/components/ui/badge";
import { TableColumnHeader } from "@/shared/components/table";

import VendorActions from "../components/VendorActions";

export const getVendorColumns = ({ onView, onEdit, onStatusChange, onDelete }) => [
  {
    accessorKey: "vendorCode",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Vendor Code" />
    ),
  },

  {
    accessorKey: "vendorName",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Vendor Name" />
    ),
  },

  {
    accessorKey: "contactPerson",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Contact Person" />
    ),

    cell: ({ row }) => <span>{row.original.contactPerson || "-"}</span>,
  },

  {
    accessorKey: "phone",
    header: ({ column }) => <TableColumnHeader column={column} title="Phone" />,
  },

  {
    accessorKey: "email",
    header: ({ column }) => <TableColumnHeader column={column} title="Email" />,

    cell: ({ row }) => <span>{row.original.email || "-"}</span>,
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
      <VendorActions
        vendor={row.original}
        onView={onView}
        onEdit={onEdit}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
      />
    ),
  },
];
