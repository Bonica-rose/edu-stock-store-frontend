import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { getSetupStatus } from "../redux/setupThunks";
import SetupForm from "../components/SetupForm";
import logo from "@/assets/logo/transparent.png";
import Loader from "@/shared/components/Loader";

export default function SetupPage() {
    const dispatch = useDispatch();

    const { initialized, loading } = useSelector((state) => state.setup);

    useEffect(() => {
        if (initialized === null) {
            dispatch(getSetupStatus());
        }
    }, [dispatch, initialized]);

    if (loading.status) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (initialized) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
        <div className="flex w-full max-w-3xl flex-col items-center">
            <img src={logo} alt="Edu Stock & Store" className="mb-5 h-20 w-auto" />

            <SetupForm />
        </div>
        </div>
    );
}
