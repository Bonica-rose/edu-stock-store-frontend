import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import VendorForm from "@/features/vendor/components/VendorForm";
import { fetchVendorById, updateVendor } from "@/features/vendor/redux/vendorThunks";
import { clearCurrentVendor } from "@/features/vendor/redux/vendorSlice";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/shared/components/PageHeader";
import Loader from "@/shared/components/Loader";

const EditVendorPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const vendor = useSelector((state) => state.vendor.vendor);
  const isLoading = useSelector((state) => state.vendor.loading.vendor);
  const isSubmitting = useSelector((state) => state.vendor.loading.update);

  useEffect(() => {
    dispatch(fetchVendorById(id));

    return () => {
      dispatch(clearCurrentVendor());
    };
  }, [dispatch, id]);

  const handleUpdateVendor = async (data) => {    
    await dispatch(
      updateVendor({
        id,
        vendorData: data,
      }),
    ).unwrap();

    toast.success("Vendor updated successfully.");
    navigate("/edu/vendors");
  };

  if (isLoading) {
    return <div><Loader /></div>;
  }

  if (!vendor) {
    return (
      <div className="flex items-center justify-center py-10">
        Vendor not found.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <PageHeader
        title="Edit Vendor"
        description="Update vendor information."
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
        mode="edit"
        initialData={vendor}
        onSubmit={handleUpdateVendor}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default EditVendorPage;
