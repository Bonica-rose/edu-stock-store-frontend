import { useSelector } from "react-redux";

import {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
} from "../utils/permissionUtils";

const usePermission = () => {
    const permissions = useSelector(
        (state) => state.auth.user?.permissions ?? [],
    );

    return {
        permissions,

        hasPermission: (permission) => hasPermission(permissions, permission),

        hasAnyPermission: (requiredPermissions) =>
            hasAnyPermission(permissions, requiredPermissions),

        hasAllPermissions: (requiredPermissions) =>
            hasAllPermissions(permissions, requiredPermissions),
    };
};

export default usePermission;
