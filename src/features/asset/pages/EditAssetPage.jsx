import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageHeader from "@/shared/components/PageHeader";

import AssetForm from "../components/AssetForm";
import { fetchAssetById, updateAsset } from "../redux/assetThunks";
import { clearCurrentAsset } from "../redux/assetSlice";
import Loader from "@/shared/components/Loader";

export default function EditAssetPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { asset, loading } = useSelector((state) => state.asset);

  useEffect(() => {
    if (!id) return;

    dispatch(clearCurrentAsset());
    dispatch(fetchAssetById(id));
  }, [dispatch, id]);

  const handleSubmit = async (data) => {
    await dispatch(
      updateAsset({
        id,
        assetData: data,
      }),
    ).unwrap();

    toast.success("Asset updated successfully.");
    navigate(`/edu/assets/${id}`);
  };

  if (loading && !asset) {
    return <div><Loader /></div>;
  }

  if (!asset) {
    return (
      <div className="space-y-4">
        <PageHeader
          title="Edit Asset"
          description="Update asset information."
        />

        <div className="rounded-lg border p-6 text-center">
          <p className="text-sm text-muted-foreground">Asset not found.</p>

          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate("/edu/assets")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assets
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Asset"
        description="Update the identifying information of this asset."
        action={
          <Button
            type="button"
            variant="secondary"
            className={`text-gray-500`}
            onClick={() => navigate("/edu/assets")}
          >
            <ArrowLeft className="mr-2 h-4 w-4 text-gray-500" />
            Back to assets
          </Button>
        }
      >
      </PageHeader>

      <AssetForm
        mode="edit"
        initialData={asset}
        onSubmit={handleSubmit}
        loading={loading.update}
      />
    </div>
  );
}
