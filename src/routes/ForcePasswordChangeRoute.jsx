import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ForcePasswordChangeRoute() {
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Allow access to the change password page
    if (location.pathname === "/edu/change-password") {
        return <Outlet />;
    }

    // Force password change before accessing anything else
    if (user?.mustChangePassword) {
        return <Navigate to="/edu/change-password" replace />;
    }

    return <Outlet />;
}
