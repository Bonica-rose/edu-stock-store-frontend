import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { fetchVendorById } from "../redux/vendorThunks";
import { clearCurrentVendor } from "../redux/vendorSlice";

import VendorDetails from "../components/VendorDetails";

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

  const handleEdit = () => {
    navigate(`/edu/vendors/${id}/edit`);
  };

  if (loading.vendor) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-sm text-muted-foreground">Loading vendor...</p>
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
      <div className="rounded-lg border bg-white p-6">
        <p className="text-sm text-muted-foreground">Vendor not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          Vendor Details
        </h1>

        <p className="text-[13px] text-muted-foreground">
          View vendor information and contact details.
        </p>
      </div>

      {/* Vendor Details */}
      <VendorDetails vendor={vendor} onBack={handleBack} onEdit={handleEdit} />
    </div>
  );
}
