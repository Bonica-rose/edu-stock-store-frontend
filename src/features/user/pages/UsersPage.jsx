import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers } from "../redux/userThunks";

import UserTable from "../components/UserTable";
import { TablePagination, TableToolbar } from "@/shared/components/table";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import RoleFilter from "@/shared/components/filters/RoleFilter";
import { ROLE_ARRAY } from "@/shared/constants/roles";
import { Button } from "@/components/ui/button";

export default function UsersPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { users, pagination, loading, error } = useSelector((state) => state.user);

    console.log(users);

    const [query, setQuery] = useState({
        page: 1,
        limit: 10,
        search: "",
        role: "all",
        branch: "all",
    });

    useEffect(() => {
        dispatch(fetchUsers(query));
    }, [dispatch, query]);   

    const handleCreateUser = () => {
        navigate(`/edu/users/new`);
    }

    const handleView = (user) => {
        navigate(`/edu/users/${user._id}`);
    };

    const handleEdit = (user) => {
        navigate(`/edu/users/${user._id}/edit`);
    };

    const handleStatusChange = (user) => {
        console.log("Status", user);
        // dispatch(changeUserStatus(...))
    };

    const handleDelete = (user) => {
        console.log("Delete", user);
        // open confirmation dialog
    };

    return (
      <div className="bg-white rounded-lg border border-muted p-3">
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
            searchPlaceholder="Search users..."
          >
            <RoleFilter
              value={query.role}
              roles={ROLE_ARRAY}
              onChange={(role) =>
                setQuery((prev) => ({
                  ...prev,
                  role,
                  page: 1,
                }))
              }
            />

            <Button
              onClick={handleCreateUser}
              className="py-1 px-2 rounded-lg bg-blue-950 hover:bg-blue-900 text-white flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create User
            </Button>
          </TableToolbar>

          <UserTable
            users={users}
            loading={loading.users}
            onView={handleView}
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
      </div>
    );
}
