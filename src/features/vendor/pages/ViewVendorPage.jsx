import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import { fetchVendorById } from "../redux/vendorThunks";
import { clearCurrentVendor } from "../redux/vendorSlice";

import VendorDetails from "../components/VendorDetails";
import Loader from "@/shared/components/Loader";
import PageHeader from "@/shared/components/PageHeader";

export default function ViewVendorPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { vendor, loading, error } = useSelector((state) => state.vendor);

  useEffect(() => {
    dispatch(fetchVendorById(id));

    return () => {
      dispatch(clearCurrentVendor());
    };
  }, [dispatch, id]);

  const handleBack = () => {
    navigate("/edu/vendors");
  };

  if (loading.vendor) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6">
        <p className="text-sm text-muted-foreground">Vendor not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <PageHeader
        title="Vendor details"
        description="View vendor information and contact details."
        action={
          <Button
            type="button"
            variant="secondary"
            className="text-gray-500"
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4 text-gray-500" />
            Back to Vendor List
          </Button>
        }
      />

      {/* Vendor Details */}
      <VendorDetails
        vendor={vendor}
      />
    </div>
  );
}
