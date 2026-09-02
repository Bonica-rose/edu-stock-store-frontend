import { formatCurrency } from "@/shared/utils/formatCurrency";
import { TableColumnHeader } from "@/shared/components/table";

export const getLowStockReportColumns = ({ showBranch = true }) => {
  const columns = [
    {
      accessorKey: "sku",
      header: "SKU",
    },

    {
      accessorKey: "itemName",
      header: "Item Name",
    },

    {
      accessorKey: "category",
      header: "Category",
    },

    {
      accessorKey: "vendor",
      header: "Vendor",
    },

    {
      accessorKey: "currentStock",
      header: "Current Stock",
    },

    {
      accessorKey: "minimumStock",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Minimum Stock" />
      ),
    },

    {
      id: "shortage",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Shortage" />
      ),

      cell: ({ row }) => {
        const currentStock = Number(row.original.currentStock ?? 0);

        const minimumStock = Number(row.original.minimumStock ?? 0);

        return Math.max(minimumStock - currentStock, 0);
      },
    },

    {
      accessorKey: "unit",
      header: "Unit",
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
      header: "Stock Value",

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
};

