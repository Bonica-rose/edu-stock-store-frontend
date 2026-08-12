import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import UserForm from "../components/UserForm";

import { fetchUserById, updateUser } from "../redux/userThunks";

import { fetchBranches } from "../../branch/redux/branchThunks";
import { ROLE_OPTIONS } from "@/shared/constants/roles";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/shared/components/PageHeader";
import Loader from "@/shared/components/Loader";

export default function EditUserPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const branches = useSelector((state) => state.branch.branches);

  useEffect(() => {
    dispatch(fetchUserById(id));
    dispatch(fetchBranches());
  }, [dispatch, id]);

  const handleUpdateUser = async (data) => {
    await dispatch(
      updateUser({
        id,
        userData: data,
      }),
    ).unwrap();

    toast.success("User updated successfully");
    navigate("/edu/users");
  };

  if (loading.user) {
    return <div><Loader /></div>;
  }

  return (
    <div className="space-y-3">
      <PageHeader
        title="Edit User"
        description="Update user information"
        action={
          <Button
            type="button"
            variant="secondary"
            className={`text-gray-500`}
            onClick={() => navigate("/edu/users")}
          >
            <ArrowLeft className="mr-2 h-4 w-4 text-gray-500" />
            Back to Users
          </Button>
        }
      />

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
