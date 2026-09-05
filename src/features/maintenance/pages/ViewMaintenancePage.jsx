import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, UserPlus, CheckCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/shared/components/PageHeader";

import MaintenanceDetails from "../components/MaintenanceDetails";
import AssignMaintenanceForm from "../components/AssignMaintenanceForm";
import CompleteMaintenanceForm from "../components/CompleteMaintenanceForm";
import CancelMaintenanceDialog from "../components/CancelMaintenanceDialog";

import { fetchMaintenanceById } from "../redux/maintenanceThunks";
import Loader from "@/shared/components/Loader";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function ViewMaintenancePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hasPermission } = usePermission();

  const canMAssign = hasPermission(PERMISSIONS.MAINTENANCE_ASSIGN);
  const canMComplete = hasPermission(PERMISSIONS.MAINTENANCE_COMPLETE);
  const canMCancel = hasPermission(PERMISSIONS.MAINTENANCE_UPDATE_STATUS);

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

      <Card>
        <CardContent>
          {/* Actions */}
          <div className="flex flex-wrap justify-end gap-2 pb-2">
            {isPending && (
              <>
                {canMAssign && (
                  <Button
                    type="button"
                    onClick={() => setAssignOpen(true)}
                    className="bg-blue-900 hover:bg-blue-900/90 dark:text-white"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Assign
                  </Button>
                )}

                {canMCancel && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setCancelOpen(true)}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                )}
              </>
            )}

            {canMComplete && isInProgress && (
              <Button
                type="button"
                onClick={() => setCompleteOpen(true)}
                className="bg-green-700 hover:bg-green-700/90 dark:text-white"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Complete
              </Button>
            )}
          </div>

          {/* Details */}
          <MaintenanceDetails maintenance={maintenance} />
        </CardContent>
      </Card>

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
