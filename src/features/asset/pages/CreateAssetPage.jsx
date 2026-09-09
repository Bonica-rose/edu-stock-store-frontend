import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageHeader from "@/shared/components/PageHeader";
import AssetForm from "../components/AssetForm";
import { createAsset } from "../redux/assetThunks";
import useAssetFormOptions from "../utils/useAssetFormOptions";
import CreationSuccessDialog from "@/shared/components/CreationSuccessDialog";

export default function CreateAssetPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const { loading } = useSelector((state) => state.asset);

  const {
    inventories,
    branches,
    users,
    loading: optionsLoading,
  } = useAssetFormOptions();

  const handleCreateAsset = async (data) => {
    await dispatch(createAsset(data)).unwrap();
  };

  const handleCreateSuccess = () => {
    setShowSuccessDialog(true);
  };

  const handleCreateAnother = () => {
    setShowSuccessDialog(false);
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
        onSuccess={handleCreateSuccess}
        onSubmit={handleCreateAsset}
        loading={loading.create || optionsLoading}
      />

      <CreationSuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        title="Asset created successfully"
        description="The asset has been created successfully. Would you like to create another asset or go to the asset list?"
        stayLabel="Create another"
        redirectLabel="Go to Assets"
        onStay={handleCreateAnother}
        onRedirect={() => navigate("/edu/assets")}
      />
    </div>
  );
}
