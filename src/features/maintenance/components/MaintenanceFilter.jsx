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
    branch = "all",

    assignedStaff = [],
    branches = [],

    onStatusChange,
    onPriorityChange,
    onAssignedToChange,
    onBranchChange,
}) {
    return (
      <>
        {/* Status */}
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-36">
            <SelectValue>
              {status === "all" ? "All Status" : status}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>

            {Object.values(MAINTENANCE_STATUS).map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Priority */}
        <Select value={priority} onValueChange={onPriorityChange}>
          <SelectTrigger className="w-36">
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

        {/* Assigned Staff */}
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
            ...assignedStaff
              .filter((staff) => staff.role === ROLES.MAINTENANCE_STAFF)
              .map((staff) => ({
                value: staff._id,
                label: `${staff.firstName} ${staff.lastName} - ${staff.branch?.branchName}`,
              })),
          ]}
        />

        {/* Branch */}
        <Select value={branch} onValueChange={onBranchChange}>
          <SelectTrigger className="w-40">
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
      </>
    );
}
