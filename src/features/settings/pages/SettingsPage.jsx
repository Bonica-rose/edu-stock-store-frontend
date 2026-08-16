import { useEffect } from "react";
import { useDispatch } from "react-redux";

import CompanySettingsCard from "../components/CompanySettingsCard";
import InventorySettingsCard from "../components/InventorySettingsCard";
import SystemSettingsCard from "../components/SystemSettingsCard";

import { fetchSettings } from "../redux/settingsThunks";

import PageHeader from "@/shared/components/PageHeader";

export default function SettingsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);

    return (
        <div className="space-y-4">
            <PageHeader
                title="System Settings"
                description="Configure application settings."
            />

            <CompanySettingsCard />
            <InventorySettingsCard />
            <SystemSettingsCard />
        </div>
    );
}
