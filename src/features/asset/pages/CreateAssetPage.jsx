import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageHeader from "@/shared/components/PageHeader";

import AssetForm from "../components/AssetForm";

import { createAsset } from "../redux/assetThunks";

import useAssetFormOptions from "../utils/useAssetFormOptions";

export default function CreateAssetPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.asset);

  const {
    inventories,
    branches,
    users,
    loading: optionsLoading,
  } = useAssetFormOptions();

  const handleCreateAsset = async (data) => {
    await dispatch(createAsset(data)).unwrap();
    toast.success("Asset created successfully");
    navigate("/edu/assets");
  };

  return (
    <div className="space-y-3">
      {/* Page Header */}
      <PageHeader
        title="Create Asset"
        description="Add a new asset"
        action={
          <Button
            type="button"
            variant="secondary"
            className="text-gray-500"
            onClick={() => navigate("/edu/assets")}
          >
            <ArrowLeft className="mr-2 h-4 w-4 text-gray-500" />
            Back to Assets
          </Button>
        }
      />

      {/* Asset Form */}
      <AssetForm
        mode="create"
        inventories={inventories}
        branches={branches}
        users={users}
        onSubmit={handleCreateAsset}
        loading={loading.create || optionsLoading}
      />
    </div>
  );
}
