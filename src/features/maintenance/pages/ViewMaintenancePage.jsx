import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, UserPlus, CheckCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageHeader from "@/shared/components/PageHeader";

import MaintenanceDetails from "../components/MaintenanceDetails";
import AssignMaintenanceForm from "../components/AssignMaintenanceForm";
import CompleteMaintenanceForm from "../components/CompleteMaintenanceForm";
import CancelMaintenanceDialog from "../components/CancelMaintenanceDialog";

import { fetchMaintenanceById } from "../redux/maintenanceThunks";
import Loader from "@/shared/components/Loader";

export default function ViewMaintenancePage() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { maintenance, loading } = useSelector((state) => state.maintenance);

  const [assignOpen, setAssignOpen] = useState(false);
  const [completeOpen, setCompleteOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMaintenanceById(id));
  }, [dispatch, id]);

  if (loading.maintenance) {
    return <div><Loader /></div>;
  }

  if (!maintenance) {
    return null;
  }

  const isPending = maintenance.status === "Pending";

  const isInProgress = maintenance.status === "In Progress";

  return (
    <div className="space-y-4">
      <PageHeader
        title="Maintenance Details"
        description="Manage, track, and update your asset maintenance schedules"
        action={
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/edu/maintenance")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Maintenance
          </Button>
        }
      />

      <div className="bg-white rounded-lg border border-muted p-3">
        {/* Actions */}
        <div className="flex flex-wrap justify-end gap-2 pb-2">
          {isPending && (
            <>
              <Button
                type="button"
                onClick={() => setAssignOpen(true)}
                className="bg-blue-900 hover:bg-blue-900/90"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Assign
              </Button>

              <Button
                type="button"
                variant="destructive"
                onClick={() => setCancelOpen(true)}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </>
          )}

          {isInProgress && (
            <Button
              type="button"
              onClick={() => setCompleteOpen(true)}
              className="bg-green-700 hover:bg-green-700/90"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Complete
            </Button>
          )}
        </div>

        {/* Details */}
        <MaintenanceDetails maintenance={maintenance} />
      </div>

      {/* Assign */}
      <AssignMaintenanceForm
        open={assignOpen}
        onOpenChange={setAssignOpen}
        maintenance={maintenance}
      />

      {/* Complete */}
      <CompleteMaintenanceForm
        open={completeOpen}
        onOpenChange={setCompleteOpen}
        maintenance={maintenance}
      />

      {/* Cancel */}
      <CancelMaintenanceDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        maintenance={maintenance}
      />
    </div>
  );
}
