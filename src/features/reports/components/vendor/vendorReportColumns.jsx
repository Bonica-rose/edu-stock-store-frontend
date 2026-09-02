import { formatDate } from "@/shared/utils/dateFormatter";
import { TableColumnHeader } from "@/shared/components/table";
import { Badge } from "@/components/ui/badge";

export const getVendorReportColumns = ({ showBranch = true }) => {
    const columns = [
      {
        accessorKey: "vendorCode",
        header: "Vendor Code",
      },
      {
        accessorKey: "vendorName",
        header: "Vendor Name",
      },
      {
        accessorKey: "contactPerson",
        header: "Contact Person",
      },
      {
        accessorKey: "phone",
        header: "Phone",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "city",
        header: "City",
      },
      {
        accessorKey: "state",
        header: "State",
      },
      {
        accessorKey: "inventoryCount",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Inventory Count" />
        ),
      },
      {
        accessorKey: "purchaseCount",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Purchase Count" />
        ),
      },
      {
        accessorKey: "totalPurchaseAmount",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Total Purchase Amount" />
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant={row.original.isActive ? "active" : "inactive"}>
            {row.original.isActive ? "Active" : "Inactive"}
          </Badge>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Created on",
        cell: ({ row }) => {
          const value = row.original.createdAt;

          return value ? formatDate(value, "DD MMM, YYYY") : "-";
        },
      },
    ];
    return columns;
};
