import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCurrentUser } from "@/features/auth/redux/authThunks";

export default function MainLayout() {
    const dispatch = useDispatch();

    const { isInitialized, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!isInitialized && !loading.currentUser) {
        dispatch(fetchCurrentUser());
        }
    }, [dispatch, isInitialized, loading.currentUser]);

    return <Outlet />;
}
