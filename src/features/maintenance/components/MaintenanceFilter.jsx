import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import SearchableSelect from "@/shared/components/SearchableSelect";
import { ROLES } from "@/shared/constants/roles";

import {
    MAINTENANCE_STATUS,
    MAINTENANCE_PRIORITY,
} from "../utils/maintenanceConstants";

export default function MaintenanceFilter({
  status = "all",
  priority = "all",
  assignedTo = "all",
  reportedBy = "all",
  branch = "all",

  users = [],
  branches = [],

  onStatusChange,
  onPriorityChange,
  onAssignedToChange,
  onReportedByChange,
  onBranchChange,
}) {
  return (
    <div className="flex flex-wrap items-end gap-1">
      {/* Status */}
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue>{status === "all" ? "All Maintenance Status" : status}</SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Maintenance Status</SelectItem>

          {Object.values(MAINTENANCE_STATUS).map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Priority */}
      <Select value={priority} onValueChange={onPriorityChange}>
        <SelectTrigger className="w-full sm:w-45">
          <SelectValue>
            {priority === "all" ? "All Priorities" : priority}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>

          {Object.values(MAINTENANCE_PRIORITY).map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Reported By */}
      <div className="w-full sm:w-55">
        <SearchableSelect
          value={reportedBy}
          onValueChange={onReportedByChange}
          placeholder="All Reported By"
          options={[
            {
              value: "all",
              label: "All Reported By",
            },
            ...users.map((user) => ({
              value: user._id,
              label: `${user.firstName} ${user.lastName}`,
            })),
          ]}
        />
      </div>

      {/* Assigned Staff */}
      <div className="w-full sm:w-55">
        <SearchableSelect
          value={assignedTo}
          onValueChange={onAssignedToChange}
          placeholder="All Assigned Staff"
          searchPlaceholder="Search staff..."
          emptyMessage="No staff found."
          options={[
            {
              value: "all",
              label: "All Assigned Staff",
            },
            ...users
              .filter((staff) => staff.role === ROLES.MAINTENANCE_STAFF)
              .map((staff) => ({
                value: staff._id,
                label: `${staff.firstName} ${staff.lastName} - ${staff.branch?.branchName}`,
              })),
          ]}
        />
      </div>

      {/* Branch */}
      <Select value={branch} onValueChange={onBranchChange}>
        <SelectTrigger className="w-full sm:w-45">
          <SelectValue>
            {branch === "all"
              ? "All Branches"
              : (branches.find((b) => b._id === branch)?.branchName ??
                "All Branches")}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Branches</SelectItem>

          {branches.map((item) => (
            <SelectItem key={item._id} value={item._id}>
              {item.branchName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
