import { formatDate } from "@/shared/utils/dateFormatter";
import { TableColumnHeader } from "@/shared/components/table";
import MaintenanceStatusBadge from "@/features/maintenance/components/MaintenanceStatusBadge";
import MaintenancePriorityBadge from "@/features/maintenance/components/MaintenancePriorityBadge";

export const getMaintenanceReportColumns = ({ showBranch = true }) => {
  const columns = [
    {
      accessorKey: "maintenanceId",
      header: "Maintenance ID",
    },
    {
      accessorKey: "assetCode",
      header: "Asset Code",
    },
    {
      accessorKey: "itemName",
      header: "Item Name",
    },
    {
      accessorKey: "issueTitle",
      header: "Issue Title",
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => (
        <MaintenancePriorityBadge priority={row.original.priority} />
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <MaintenanceStatusBadge status={row.original.status} />
      ),
    },
    {
      accessorKey: "reportedBy",
      header: "Reported By",
    },
    {
      accessorKey: "assignedTo",
      header: "Assigned To",
      cell: ({ row }) => {
        const assignedTo = row.original.assignedTo;
        return assignedTo ? assignedTo : "-";
      },
    },
    {
      accessorKey: "vendor",
      header: "Vendor",
      cell: ({ row }) => {
        const vendor = row.original.vendor;
        return vendor ? vendor : "-";
      },
    },
    {
      accessorKey: "repairCost",
      header: ({ column }) => (
        <TableColumnHeader column={column} title="Repair Cost" />
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created On",
      cell: ({ row }) => {
        const value = row.original.createdAt;

        return value ? formatDate(value, "DD MMM, YYYY") : "-";
      },
    },
    {
      accessorKey: "completedDate",
      header: "Completed On",
      cell: ({ row }) => {
        const value = row.original.completedDate;

        return value ? formatDate(value, "DD MMM, YYYY") : "-";
      },
    },
  ];

  return columns;
};
