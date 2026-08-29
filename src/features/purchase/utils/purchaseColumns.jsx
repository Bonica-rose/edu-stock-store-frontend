import { TableColumnHeader } from "@/shared/components/table";
import PurchaseActions from "../components/PurchaseActions";
import { formatDate } from "@/shared/utils/dateFormatter";

export const getPurchaseColumns = ({ onView, canView }) => [
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

      return formatDate(value, "DD MMM, YYYY");
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

  // Actions column only when at least one permission exists
  ...(canView
    ? [
        {
          id: "actions",
          header: "Actions",
          enableSorting: false,
          cell: ({ row }) => (
            <PurchaseActions purchase={row.original} onView={onView} />
          ),
        },
      ]
    : []),
];
