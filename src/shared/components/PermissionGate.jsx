import { useSelector } from "react-redux";
import { hasPermission } from "@/utils/permissionUtils";

const PermissionGate = ({ permission, children, fallback = null }) => {
    const permissions = useSelector(
        (state) => state.auth.user?.permissions ?? [],
    );

    const allowed = hasPermission(permissions, permission);

    if (!allowed) {
        return fallback;
    }

    return children;
};

export default PermissionGate;
