import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageHeader from "@/shared/components/PageHeader";
import CreateMaintenanceForm from "../components/CreateMaintenanceForm";
import { createMaintenance } from "../redux/maintenanceThunks";
import useMaintenanceFormOptions from "../utils/useMaintenanceFormOptions";

export default function CreateMaintenancePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector((state) => state.maintenance);

    const { assets, loading: optionsLoading } = useMaintenanceFormOptions();  

    const handleCreateMaintenance = async (data) => {
        await dispatch(createMaintenance(data)).unwrap();
        toast.success("Maintenance request created successfully");
        navigate("/edu/maintenance");
    };

    return (
        <div className="space-y-3">
            {/* Page Header */}
            <PageHeader
                title="Create Maintenance"
                description="Create a new maintenance request"
                action={
                    <Button
                        type="button"
                        variant="secondary"
                        className="text-gray-500"
                        onClick={() => navigate("/edu/maintenance")}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 text-gray-500" />
                        Back to Maintenance
                    </Button>
                }
            />

            {/* Maintenance Form */}
            <CreateMaintenanceForm
                assets={assets}
                onSubmit={handleCreateMaintenance}
                loading={loading.create || optionsLoading}
            />
        </div>
    );
}
