import { formatDate } from "@/shared/utils/dateFormatter";
import { TableColumnHeader } from "@/shared/components/table";

export const getPurchaseReportColumns = ({ showBranch = true }) => {
  const columns = [
    {
      accessorKey: "purchaseNo",
      header: "Purchase No",
    },
    {
      accessorKey: "purchaseDate",
      header: "Purchase Date",
      cell: ({ row }) => {
        const value = row.original.purchaseDate;

        return value ? formatDate(value, "DD MMM, YYYY") : "-";
      },
    },
    {
      accessorKey: "vendor",
      header: "Vendor",
    },
    {
      accessorKey: "totalItems",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Total Items" />
      ),
    },
    {
      accessorKey: "totalQuantity",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Total Quantity" />
      ),
    },
    {
      accessorKey: "totalAmount",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Total Amount" />
      ),
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
    },
  ];

  if (showBranch) {
    columns.splice(3, 0, {
      accessorKey: "branch",
      header: "Branch",
    });
  }
  return columns;
};
