import { TableColumnHeader } from "@/shared/components/table";

import PurchaseActions from "../components/PurchaseActions";

export const getPurchaseColumns = ({ onView }) => [
  {
    accessorKey: "purchaseNo",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Purchase No" />
    ),
  },

  {
    accessorFn: (row) => row.vendor?.vendorName ?? "-",
    id: "vendor",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Vendor" />
    ),
  },

  {
    accessorFn: (row) => row.branch?.branchName ?? "-",
    id: "branch",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Branch" />
    ),
  },

  {
    accessorKey: "purchaseDate",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Purchase Date" />
    ),

    cell: ({ row }) => {
      const value = row.original.purchaseDate;

      if (!value) {
        return "-";
      }

      return new Date(value).toLocaleDateString("en-IN");
    },
  },

  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Total Amount" />
    ),

    cell: ({ row }) => {
      const amount = row.original.totalAmount ?? 0;

      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
      }).format(amount);
    },
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

  {
    id: "actions",
    header: "Actions",
    enableSorting: false,

    cell: ({ row }) => (
      <PurchaseActions purchase={row.original} onView={onView} />
    ),
  },
];
