import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import {
  fetchMaintenances,
  deleteMaintenance,
} from "../redux/maintenanceThunks";
import MaintenanceTable from "../components/MaintenanceTable";
import MaintenanceFilter from "../components/MaintenanceFilter";
import { TablePagination, TableToolbar } from "@/shared/components/table";
import { Card, CardContent } from "@/components/ui/card";
import ConfirmationDialog from "@/shared/components/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import useMaintenanceFormOptions from "../utils/useMaintenanceFormOptions";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function MaintenanceListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hasPermission } = usePermission();

  const canCreate = hasPermission(PERMISSIONS.MAINTENANCE_CREATE);

  const { maintenances, pagination, loading } = useSelector(
    (state) => state.maintenance,
  );  

  const { users, branches } = useMaintenanceFormOptions(); 

  const [query, setQuery] = useState({
    page: 1,
    limit: 10,

    search: "",

    status: "all",
    priority: "all",
    assignedTo: "all",
    reportedBy: "all",
    branch: "all",

    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const [selectedMaintenance, setSelectedMaintenance] = useState(null);

  const [openDelete, setOpenDelete] = useState(false);

  // Fetch maintenance records
  useEffect(() => {
    dispatch(fetchMaintenances(query));
  }, [dispatch, query]);

  // Create
  const handleCreate = () => {
    navigate("/edu/maintenance/new");
  };

  // View
  const handleView = (maintenance) => {
    navigate(`/edu/maintenance/${maintenance._id}`);
  };

  // Delete
  const handleDelete = (maintenance) => {
    setSelectedMaintenance(maintenance);
    setOpenDelete(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!selectedMaintenance) return;

    try {
      await dispatch(deleteMaintenance(selectedMaintenance._id)).unwrap();

      toast.success("Maintenance deleted successfully");

      setOpenDelete(false);
      setSelectedMaintenance(null);

      dispatch(fetchMaintenances(query));
    } catch (error) {
      toast.error(error.message || "Failed to delete maintenance");
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          {/* TOOLBAR */}
          <TableToolbar
            search={query.search}
            searchPlaceholder="Search maintenance..."
            searchTitle="Search maintenance ID, issue, or asset"
            onSearchChange={(value) =>
              setQuery((prev) => ({
                ...prev,
                search: value,
                page: 1,
              }))
            }
            filterRow={
              <MaintenanceFilter
                status={query.status}
                priority={query.priority}
                assignedTo={query.assignedTo}
                reportedBy={query.reportedBy}
                branch={query.branch}
                assignedStaff={users}
                branches={branches}
                onStatusChange={(value) =>
                  setQuery((prev) => ({
                    ...prev,
                    status: value,
                    page: 1,
                  }))
                }
                onPriorityChange={(value) =>
                  setQuery((prev) => ({
                    ...prev,
                    priority: value,
                    page: 1,
                  }))
                }
                onAssignedToChange={(value) =>
                  setQuery((prev) => ({
                    ...prev,
                    assignedTo: value,
                    page: 1,
                  }))
                }
                onReportedByChange={(value) =>
                  setQuery((prev) => ({
                    ...prev,
                    reportedBy: value,
                    page: 1,
                  }))
                }
                onBranchChange={(value) =>
                  setQuery((prev) => ({
                    ...prev,
                    branch: value,
                    page: 1,
                  }))
                }
              />
            }
          >
            {/* CREATE MAINTENANCE */}
            {canCreate && (
              <Button
                onClick={handleCreate}
                className="flex items-center gap-2 rounded-lg bg-blue-950 px-2 py-1 text-white hover:bg-blue-900"
              >
                <Plus className="h-4 w-4" />
                New Maintenance
              </Button>
            )}
          </TableToolbar>

          {/* TABLE */}
          <MaintenanceTable
            maintenances={maintenances}
            loading={loading.maintenances}
            onView={handleView}
            onDelete={handleDelete}
          />

          {/* PAGINATION */}
          <TablePagination
            pagination={pagination}
            onPageChange={(page) =>
              setQuery((prev) => ({
                ...prev,
                page,
              }))
            }
          />
        </div>

        {/* DELETE CONFIRMATION */}
        <ConfirmationDialog
          open={openDelete}
          onOpenChange={setOpenDelete}
          title="Delete Maintenance"
          description={
            selectedMaintenance
              ? `Are you sure you want to delete ${selectedMaintenance.maintenanceId}? This action cannot be undone.`
              : ""
          }
          confirmText="Delete"
          confirmVariant="destructive"
          loading={loading.delete}
          onConfirm={confirmDelete}
          loadingText="Deleting..."
        />
      </CardContent>
    </Card>
  );
}
