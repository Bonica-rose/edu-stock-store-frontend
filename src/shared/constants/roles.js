export const ROLES = {
    SUPER_ADMIN: "Super Admin",
    BRANCH_ADMIN: "Branch Admin",
    INVENTORY_STAFF: "Inventory Staff",
    MAINTENANCE_STAFF: "Maintenance Staff",
    AUDITOR: "Auditor",
};

export const ROLE_ARRAY = Object.values(ROLES);

export const ROLE_OPTIONS = [
    {
        value: ROLES.SUPER_ADMIN,
        label: "Super Admin",
    },
    {
        value: ROLES.BRANCH_ADMIN,
        label: "Branch Admin",
    },
    {
        value: ROLES.INVENTORY_STAFF,
        label: "Inventory Staff",
    },
    {
        value: ROLES.MAINTENANCE_STAFF,
        label: "Maintenance Staff",
    },
    {
        value: ROLES.AUDITOR,
        label: "Auditor",
    },
];
