import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { getSetupStatus } from "../redux/setupThunks";
import SetupForm from "../components/SetupForm";
import logoPic from "@/assets/images/logo-pic.png";
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
            <div className="flex items-center gap-1 mb-5">
                <img
                    src={logoPic}
                    alt="Edu Stock & Store"
                    className="h-15 w-auto object-contain"
                />

                <div className="leading-tight">
                    <h1 className="text-lg font-bold">
                        <span className="text-blue-900">Edu</span>{" "}
                        <span className="text-blue-800">Stock</span>
                        <span className="text-slate-700 dark:text-slate-500">&</span>
                        <span className="text-green-700">Store</span>
                    </h1>

                    <p className="text-[10px] text-muted-foreground">
                        Manage Smarter. Store Better.
                    </p>
                </div>
            </div>

            <SetupForm />
        </div>
        </div>
    );
}
