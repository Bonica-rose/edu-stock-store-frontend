import pluralize from "pluralize";
import { TableColumnHeader } from "@/shared/components/table";
import { formatCurrency } from "@/shared/utils/formatCurrency";

export const getInventoryReportColumns = ({ showBranch = true }) => {
  const columns = [
    {
      accessorKey: "sku",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="SKU" />
      ),
    },
    {
      accessorKey: "itemName",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Item" />
      ),
    },
    {
      accessorFn: (row) => row.category ?? "-",
      id: "category",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Category" />
      ),
    },
    {
      accessorFn: (row) => row.vendor ?? "-",
      id: "vendor",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Vendor" />
      ),
    },
    {
      accessorKey: "currentStock",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Stock" />
      ),

      cell: ({ row }) => {
        const unit = row.original.unit?.toLowerCase();
        return (
          <span>
            {row.original.currentStock}{" "}
            {pluralize(unit, row.original.currentStock)}
          </span>
        );
      },
    },

    {
      accessorKey: "purchasePrice",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Unit Price" />
      ),
      cell: ({ row }) => formatCurrency(row.original.purchasePrice),
    },

    {
      accessorKey: "stockValue",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Stock Value" />
      ),
      cell: ({ row }) => formatCurrency(row.original.stockValue),
    },
  ];

  if (showBranch) {
    columns.splice(4, 0, {
      accessorKey: "branch",
      header: "Branch",
    });
  }

  return columns;
}
  

