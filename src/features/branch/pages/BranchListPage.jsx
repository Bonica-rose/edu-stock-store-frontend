import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { fetchBranches, changeBranchStatus } from "../redux/branchThunks";

import BranchTable from "../components/BranchTable";
import { Card, CardContent } from "@/components/ui/card";
import { TablePagination, TableToolbar } from "@/shared/components/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ConfirmationDialog from "@/shared/components/ConfirmationDialog";

import { Button } from "@/components/ui/button";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function BranchListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hasPermission } = usePermission();

  const canCreate = hasPermission(PERMISSIONS.BRANCH_CREATE);

  const { branches, pagination, loading } = useSelector(
    (state) => state.branch,
  );

  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: "",
    city: "",
    state: "",
    isActive: "all", 
  });

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [openStatus, setOpenStatus] = useState(false);

  useEffect(() => {
    dispatch(fetchBranches(query));
  }, [dispatch, query]);

  const handleCreateBranch = () => {
    navigate("/edu/branches/new");
  };

  const handleView = (branch) => {
    navigate(`/edu/branches/${branch._id}`);
  };

  const handleEdit = (branch) => {
    navigate(`/edu/branches/${branch._id}/edit`);
  };

  const handleStatusChange = (branch) => {
    setSelectedBranch(branch);
    setOpenStatus(true);
  };

  const confirmStatusChange = async () => {
    try {
      await dispatch(
        changeBranchStatus({
          id: selectedBranch._id,
          isActive: !selectedBranch.isActive,
        }),
      ).unwrap();

      toast.success(
        `Branch ${selectedBranch.isActive ? "deactivated" : "activated"} successfully`,
      );

      setOpenStatus(false);
      setSelectedBranch(null);

      dispatch(fetchBranches(query));
    } catch (error) {
      toast.error(error.message || "Failed to change branch status");
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <TableToolbar
            search={query.search}
            searchPlaceholder="Search branches by code, name, city, state, ..."
            onSearchChange={(value) =>
              setQuery((prev) => ({
                ...prev,
                search: value,
                page: 1,
              }))
            }
          >
            <Select
              value={query.isActive}
              onValueChange={(value) =>
                setQuery((prev) => ({
                  ...prev,
                  isActive: value,
                  page: 1,
                }))
              }
            >
              <SelectTrigger className="w-37.5">
                <SelectValue>
                  {query.isActive === "true"
                    ? "Active"
                    : query.isActive === "false"
                      ? "Inactive"
                      : "All"}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="true">Active</SelectItem>
                <SelectItem value="false">Inactive</SelectItem>
              </SelectContent>
            </Select>

            {canCreate && (
              <Button
                onClick={handleCreateBranch}
                className="flex items-center gap-2 rounded-lg bg-blue-950 px-2 py-1 text-white hover:bg-blue-900"
              >
                <Plus className="h-4 w-4" />
                Create Branch
              </Button>
            )}
          </TableToolbar>

          <BranchTable
            branches={branches}
            loading={loading.branches}
            onView={handleView}
            onEdit={handleEdit}
            onStatusChange={handleStatusChange}
          />

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

        <ConfirmationDialog
          open={openStatus}
          onOpenChange={setOpenStatus}
          title={
            selectedBranch?.isActive ? "Deactivate Branch" : "Activate Branch"
          }
          description={
            selectedBranch?.isActive
              ? `Are you sure you want to deactivate ${selectedBranch?.branchName}?`
              : `Are you sure you want to activate ${selectedBranch?.branchName}?`
          }
          confirmText={selectedBranch?.isActive ? "Deactivate" : "Activate"}
          loading={loading.status}
          loadingText={
            selectedBranch?.isActive ? "Deactivating..." : "Activating..."
          }
          onConfirm={confirmStatusChange}
        />
      </CardContent>
    </Card>
  );
}
