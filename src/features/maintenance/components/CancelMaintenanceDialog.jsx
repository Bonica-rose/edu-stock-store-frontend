import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Loader2, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { updateMaintenanceStatus } from "../redux/maintenanceThunks";

export default function CancelMaintenanceDialog({
  open,
  onOpenChange,
  maintenance,
}) {

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.maintenance);

  const handleCancel = async () => {
    try {
      await dispatch(
        updateMaintenanceStatus({
          id: maintenance._id,
          statusData: {
            status: "Cancelled",
          },
        }),
      ).unwrap();

      toast.success("Maintenance cancelled successfully.");
      onOpenChange(false);
    } catch (error) {
      toast.error(error?.message ?? "Failed to cancel maintenance.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-destructive" />
            Cancel Maintenance
          </DialogTitle>

          <DialogDescription>
            Are you sure you want to cancel this maintenance request?
          </DialogDescription>
        </DialogHeader>

        {/* Maintenance Summary */}
        <div className="rounded-lg border border-violet/30 bg-violet/30 p-4">
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Maintenance ID</p>

              <p className="font-medium">{maintenance?.maintenanceId ?? "—"}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Issue</p>

              <p className="font-medium">{maintenance?.issueTitle ?? "—"}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Asset</p>

              <p className="font-medium">
                {maintenance?.asset?.assetCode ?? "—"}
                {" - "}
                {maintenance?.asset?.inventory?.itemName ?? "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3">
          <p className="text-sm text-destructive">
            This action cannot be undone. The maintenance request will be marked
            as cancelled.
          </p>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={loading.changeStatus}
            onClick={() => onOpenChange(false)}
          >
            Keep Request
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={loading.changeStatus}
            onClick={handleCancel}
            className="gap-2"
          >
            {loading.changeStatus ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Cancelling...
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4" />
                Cancel Maintenance
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
