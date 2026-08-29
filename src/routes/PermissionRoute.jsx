import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { hasPermission } from "../shared/utils/permissionUtils";

const PermissionRoute = ({ permission }) => {
    const location = useLocation();

    const permissions = useSelector(
        (state) => state.auth.user?.permissions ?? [],
    );

    const allowed = hasPermission(permissions, permission);

    if (!allowed) {
        return (
            <Navigate
                to="/edu/unauthorized"
                replace
                state={{ from: `${location.pathname}${location.search}` }}
            />
        );
    }

    return <Outlet />;
};

export default PermissionRoute;
