import BranchFilter from "@/shared/components/filters/BranchFilter";
import RoleFilter from "@/shared/components/filters/RoleFilter";

export default function UserFilter({
    branch,
    role,
    branches = [],
    roles = [],
    isBranchAdmin,
    onBranchChange,
    onRoleChange,
}) {
    return (
        <div className="flex flex-wrap items-end gap-1">
            {/* Branch */}
            {!isBranchAdmin && (
                <BranchFilter
                    value={branch}
                    branches={branches}
                    onChange={onBranchChange}
                />
            )}

            {/* Role */}
            <RoleFilter value={role} roles={roles} onChange={onRoleChange} />
        </div>
    );
}
