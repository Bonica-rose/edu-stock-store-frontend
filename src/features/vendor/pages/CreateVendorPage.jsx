import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import VendorForm from "@/features/vendor/components/VendorForm";
import { createVendor } from "@/features/vendor/redux/vendorThunks";
import PageHeader from "@/shared/components/PageHeader";

const CreateVendorPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSubmitting = useSelector((state) => state.vendor.loading.create);

    const handleCreateVendor = async (data) => {
        await dispatch(createVendor(data)).unwrap();
        toast.success("Vendor created successfully.");
        navigate("/edu/vendors");
    };

    return (
        <div className="space-y-3">
            <PageHeader
                title="Create Vendor"
                description="Add a new vendor to your vendor management system."
                action={
                    <Button
                    type="button"
                    variant="secondary"
                    className={`text-gray-500`}
                    onClick={() => navigate("/edu/vendors")}
                    >
                    <ArrowLeft className="mr-2 h-4 w-4 text-gray-500" />
                    Back to Vendors
                    </Button>
                }
            />

            <VendorForm
                mode="create"
                onSubmit={handleCreateVendor}
                isSubmitting={isSubmitting}
            />
        </div>
    );
};

export default CreateVendorPage;
