import { useEffect } from "react";
import { useDispatch } from "react-redux";

import CompanySettingsCard from "../components/CompanySettingsCard";
import InventorySettingsCard from "../components/InventorySettingsCard";
import SystemSettingsCard from "../components/SystemSettingsCard";

import { fetchSettings } from "../redux/settingsThunks";

export default function SettingsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-xl font-semibold">System Settings</h1>

                <p className="text-sm text-muted-foreground">
                    Configure application settings.
                </p>
            </div>

            <CompanySettingsCard />
            <InventorySettingsCard />
            <SystemSettingsCard />
        </div>
    );
}
