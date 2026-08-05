import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import UserForm from "../components/UserForm";

import { fetchUserById, updateUser } from "../redux/userThunks";

// import { fetchBranches } from "@/features/branches/redux/branchThunks";
import { ROLE_OPTIONS } from "@/shared/constants/roles";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditUserPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  // const branches = useSelector((state) => state.branch.branches);
  const branches = [
    {
      _id: "6a715a7cbbac34ebacd78c60",
      branchName: "Head Office",
      branchCode: "HO",
    },
  ];

  useEffect(() => {
    dispatch(fetchUserById(id));
    // dispatch(fetchBranches());
  }, [dispatch, id]);

  const handleUpdateUser = async (data) => {
    console.log(data);
    try {
      await dispatch(
        updateUser({
          id,
          userData: data,
        }),
      ).unwrap();

      toast.success("User updated successfully");

      navigate("/edu/users");
    } catch (error) {
        toast.error(
          error.message ?? error.errors?.[0]?.msg ?? "Failed to update user",
        );
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Edit User</h1>
          <p className="text-sm text-muted-foreground">
            Update user information
          </p>
        </div>

        <Button
          type="button"
          variant="secondary"
          className={`text-gray-500`}
          onClick={() => navigate("/edu/users")}
        >
          <ArrowLeft className="mr-2 h-4 w-4 text-gray-500" />
          Back to Users
        </Button>
      </div>

      <UserForm
        mode="edit"
        initialData={user}
        roles={ROLE_OPTIONS}
        branches={branches}
        onSubmit={handleUpdateUser}
        loading={loading.update}
      />
    </div>
  );
}
