import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
    const { isAuthenticated, isInitialized, loading } = useSelector(
        (state) => state.auth,
    );

    // Wait until authentication check finishes
    if (!isInitialized && loading.currentUser) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
