import { Badge } from "@/components/ui/badge";
import { TableColumnHeader } from "@/shared/components/table";

import InventoryActions from "../components/InventoryActions";

export const getInventoryColumns = ({
  onView,
  onEdit,
  onStatusChange,
  onDelete,
}) => [
  {
    accessorKey: "sku",
    header: ({ column }) => <TableColumnHeader column={column} title="SKU" />,
  },

  {
    accessorKey: "itemName",
    header: ({ column }) => <TableColumnHeader column={column} title="Item" />,
  },

  {
    accessorFn: (row) => row.category?.categoryName ?? "-",
    id: "category",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Category" />
    ),
  },

  // {
  //   accessorFn: (row) => row.vendor?.vendorName ?? "-",
  //   id: "vendor",
  //   header: ({ column }) => (
  //     <TableColumnHeader column={column} title="Vendor" />
  //   ),
  // },

  // {
  //   accessorFn: (row) => row.branch?.branchName ?? "-",
  //   id: "branch",
  //   header: ({ column }) => (
  //     <TableColumnHeader column={column} title="Branch" />
  //   ),
  // },

  {
    accessorKey: "itemType",
    header: ({ column }) => <TableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const type = row.original.itemType;

      if (!type) return <span className="text-muted-foreground">-</span>;
      const cleanType = type.replace(/[_-]/g, " ").toLowerCase();
      return (
        <span className="capitalize font-medium text-foreground">
          {" "}
          {cleanType}
        </span>
      );
    },
  },

  {
    accessorKey: "currentStock",
    header: ({ column }) => <TableColumnHeader column={column} title="Stock" />,
  },

  {
    accessorKey: "purchasePrice",

    header: ({ column }) => (
      <TableColumnHeader column={column} title="Price (Per Unit)" />
    ),

    cell: ({ row }) => {
      const price = row.original.purchasePrice;
      const unit = row.original.unit?.toLowerCase();

      const formattedPrice = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
      }).format(Number(price));

      if (price == null) {
        return "-";
      }

      return (
        <span>
          {formattedPrice}
          {unit && (
            <span className="text-[13px] text-muted-foreground">/{unit}</span>
          )}
        </span>
      );
    },
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
      <InventoryActions
        inventory={row.original}
        onView={onView}
        onEdit={onEdit}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
      />
    ),
  },
];
