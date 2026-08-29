export const ROLES = {
    SUPER_ADMIN: "Super Admin",
    BRANCH_ADMIN: "Branch Admin",
    INVENTORY_STAFF: "Inventory Staff",
    MAINTENANCE_STAFF: "Maintenance Staff",
    AUDITOR: "Auditor",
};

export const ROLE_ARRAY = Object.values(ROLES);

export const BRANCH_ADMIN_ALLOWED_USER_ROLES = Object.freeze([
    ROLES.INVENTORY_STAFF,
    ROLES.MAINTENANCE_STAFF,
    ROLES.AUDITOR,
]);

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

export const USER_CREATE_ROLE_OPTIONS = ROLE_OPTIONS.filter(
    (option) => option.value !== ROLES.SUPER_ADMIN,
);

export const BRANCH_ADMIN_ROLE_OPTIONS = ROLE_OPTIONS.filter((option) =>
    BRANCH_ADMIN_ALLOWED_USER_ROLES.includes(option.value),
);
