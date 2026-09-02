import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { ArrowLeft, Pencil, UserMinus, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import PageHeader from "@/shared/components/PageHeader";
import { fetchAssetById, assignAsset, returnAsset } from "../redux/assetThunks";

import AssetDetails from "../components/AssetDetails";
import AssignAssetForm from "../components/AssignAssetForm";
import ReturnAssetForm from "../components/ReturnAssetForm";
import Loader from "@/shared/components/Loader";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function ViewAssetPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hasPermission } = usePermission();

  const canUpdate = hasPermission(PERMISSIONS.ASSET_UPDATE);
  const canAssetAssign = hasPermission(PERMISSIONS.ASSET_ASSIGN);
  const canAssetReturn = hasPermission(PERMISSIONS.ASSET_RETURN);

  const { asset: currentAsset, loading } = useSelector((state) => state.asset);

  /* Change this selector if employees are stored elsewhere in your Redux state.*/
  const employees = useSelector((state) => state.user?.users ?? []);

  const [assignOpen, setAssignOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchAssetById(id));
    }
  }, [dispatch, id]);

  const handleAssign = async (data) => {
    await dispatch(
      assignAsset({
        id,
        assignmentData:data,
      }),
    ).unwrap();

    toast.success("Asset assigned successfully.");
    setAssignOpen(false);
    // Refresh the asset so current assignment/history is updated.
    dispatch(fetchAssetById(id));
  };

  const handleReturn = async (data) => {
      await dispatch(
        returnAsset({
          id,
          returnData:data,
        }),
      ).unwrap();

      toast.success("Asset returned successfully.");
      setReturnOpen(false);
      // Refresh current assignment + assignment history.
      dispatch(fetchAssetById(id));
  };

  if (loading && !currentAsset) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!currentAsset) {
    return (
      <div className="space-y-4">
        <PageHeader title="Asset" description="View asset information." />

        <div className="rounded-lg border p-8 text-center">
          <p className="text-sm text-muted-foreground">Asset not found.</p>

          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate("/assets")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assets
          </Button>
        </div>
      </div>
    );
  }

  const canAssign =
    currentAsset.status === "Available" &&
    !currentAsset.assignedTo &&
    currentAsset.condition === "Good" &&
    currentAsset.isActive === true;

  const canReturn =
    currentAsset.status === "Assigned" && !!currentAsset.assignedTo;

  return (
    <>
      <div className="space-y-3">
        {/* PAGE HEADER  */}
        <PageHeader
          title="Asset details"
          description="View asset records, and operational status."
          action={
            <>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate("/edu/assets")}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Back</span>
                </Button>

                {canUpdate && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      navigate(`/edu/assets/${currentAsset._id}/edit`)
                    }
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </Button>
                )}

                {canAssetAssign && canAssign && (
                  <Button
                    onClick={() => setAssignOpen(true)}
                    className="text-sky-100 bg-sky-700 hover:bg-sky-600"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span className="hidden sm:inline">Assign</span>
                  </Button>
                )}

                {canAssetReturn && canReturn && (
                  <Button
                    onClick={() => setReturnOpen(true)}
                    className="bg-violet/40 text-violet-foreground hover:bg-violet/90"
                  >
                    <UserMinus className="mr-2 h-4 w-4" />
                    Return
                  </Button>
                )}
              </div>
            </>
          }
        ></PageHeader>

        {/* ASSET DETAILS  */}
        <AssetDetails asset={currentAsset} />
      </div>

      {/* ASSIGN ASSET DIALOG */}
      <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent className="flex max-h-[90vh] flex-col sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Assign Asset</DialogTitle>
          </DialogHeader>

          <div className="min-h-0 flex-1 overflow-y-auto py-2">
            <AssignAssetForm
              asset={currentAsset}
              employees={employees}
              loading={loading.assign}
              onSubmit={handleAssign}
              onCancel={() => setAssignOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* RETURN ASSET DIALOG */}
      <Dialog open={returnOpen} onOpenChange={setReturnOpen}>
        <DialogContent className="flex max-h-[90vh] flex-col sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Return Asset</DialogTitle>
          </DialogHeader>

          <div className="min-h-0 flex-1 overflow-y-auto py-2">
            <ReturnAssetForm
              asset={currentAsset}
              loading={loading.return}
              onSubmit={handleReturn}
              onCancel={() => setReturnOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
