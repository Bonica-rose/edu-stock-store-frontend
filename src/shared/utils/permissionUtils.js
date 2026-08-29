export const hasPermission = (permissions = [], requiredPermission) => {
    if (!requiredPermission) {
        return true;
    }

    if (!Array.isArray(permissions)) {
        return false;
    }

    // Super Admin
    if (permissions.includes("*")) {
        return true;
    }

    return permissions.includes(requiredPermission);
};

export const hasAnyPermission = (
    permissions = [],
    requiredPermissions = [],
) => {
    if (!Array.isArray(permissions)) {
        return false;
    }

    if (permissions.includes("*")) {
        return true;
    }

    return requiredPermissions.some((permission) =>
        permissions.includes(permission),
    );
};

export const hasAllPermissions = (
    permissions = [],
    requiredPermissions = [],
) => {
    if (!Array.isArray(permissions)) {
        return false;
    }

    if (permissions.includes("*")) {
        return true;
    }

    return requiredPermissions.every((permission) =>
        permissions.includes(permission),
    );
};
