import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers, deleteUser, changeUserStatus } from "../redux/userThunks";
import { fetchBranches } from "../../branch/redux/branchThunks";

import UserTable from "../components/UserTable";
import { Card, CardContent } from "@/components/ui/card";
import { TablePagination, TableToolbar } from "@/shared/components/table";
import ConfirmationDialog from "@/shared/components/ConfirmationDialog";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import RoleFilter from "@/shared/components/filters/RoleFilter";
import {
  ROLES,
  ROLE_ARRAY,
  BRANCH_ADMIN_ALLOWED_USER_ROLES,
} from "@/shared/constants/roles";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BranchFilter from "@/shared/components/filters/BranchFilter";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function UsersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, pagination, loading } = useSelector((state) => state.user);  
  const currentUser = useSelector((state) => state.auth.user);
  const branches = useSelector((state) => state.branch.branches);
  const { hasPermission } = usePermission();

  const canCreate = hasPermission(PERMISSIONS.USER_CREATE);

  const ALLOWED_ROLES =
    currentUser.role === ROLES.BRANCH_ADMIN
      ? BRANCH_ADMIN_ALLOWED_USER_ROLES
      : ROLE_ARRAY;  

  const [query, setQuery] = useState({
      page: 1,
      limit: 10,
      search: "",
      role: "all",
      branch: "all",
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  useEffect(() => {
      dispatch(fetchUsers(query));
  }, [dispatch, query]);  

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]); 

  const handleCreateUser = () => {
      navigate(`/edu/users/new`);
  }

  const handleEdit = (user) => {
      navigate(`/edu/users/${user._id}/edit`);
  };

  const handleStatusChange = (user) => {
    setSelectedUser(user);
    setOpenStatus(true);
  };

  const confirmStatusChange = async () => {
    try {
      await dispatch(
        changeUserStatus({
          id: selectedUser._id,
          isActive: !selectedUser.isActive,
        }),
      ).unwrap();

      toast.success(
        `User ${
          selectedUser.isActive ? "deactivated" : "activated"
        } successfully`,
      );

      setOpenStatus(false);
      setSelectedUser(null);

      dispatch(fetchUsers(query));
    } catch (error) {
      toast.error(error.message || "Failed to change status");
    }
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setOpenDelete(true);
  };
  
  const confirmDelete = async () => {
    if (!selectedUser) return;

    try {
      await dispatch(deleteUser(selectedUser._id)).unwrap();

      toast.success("User deleted successfully");

      setOpenDelete(false);
      setSelectedUser(null);

      dispatch(fetchUsers(query));
    } catch (error) {
      toast.error(error.message || "Failed to delete user");
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <TableToolbar
            search={query.search}
            onSearchChange={(value) =>
              setQuery((prev) => ({
                ...prev,
                search: value,
                page: 1,
              }))
            }
            searchPlaceholder="Search users by ID, name, email, ..."
          >
            <BranchFilter
              value={query.branch}
              branches={branches}
              onChange={(branch) =>
                setQuery((prev) => ({
                  ...prev,
                  branch,
                  page: 1,
                }))
              }
            />
            <RoleFilter
              value={query.role}
              roles={ALLOWED_ROLES}
              onChange={(role) =>
                setQuery((prev) => ({
                  ...prev,
                  role,
                  page: 1,
                }))
              }
            />

            {canCreate && (
              <Button
                onClick={handleCreateUser}
                className="py-1 px-2 rounded-lg bg-blue-950 hover:bg-blue-900 text-white flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create User
              </Button>
            )}
          </TableToolbar>

          <UserTable
            users={users}
            loading={loading.users}
            onEdit={handleEdit}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
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
          open={openDelete}
          onOpenChange={setOpenDelete}
          title="Delete User"
          description={
            selectedUser
              ? `Are you sure you want to delete ${selectedUser.firstName} ${selectedUser.lastName}? This action cannot be undone.`
              : ""
          }
          confirmText="Delete"
          confirmVariant="destructive"
          loading={loading.delete}
          onConfirm={confirmDelete}
          loadingText="Deleting..."
        />

        <ConfirmationDialog
          open={openStatus}
          onOpenChange={setOpenStatus}
          title={selectedUser?.isActive ? "Deactivate User" : "Activate User"}
          description={
            selectedUser?.isActive
              ? `Are you sure you want to deactivate ${selectedUser?.firstName} ${selectedUser?.lastName}? They will no longer be able to sign in.`
              : `Are you sure you want to activate ${selectedUser?.firstName} ${selectedUser?.lastName}?`
          }
          confirmText={selectedUser?.isActive ? "Deactivate" : "Activate"}
          loading={loading.status}
          onConfirm={confirmStatusChange}
          loadingText={
            selectedUser?.isActive ? "Deactivating" : "Activating..."
          }
        />
      </CardContent>
    </Card>
  );
}
