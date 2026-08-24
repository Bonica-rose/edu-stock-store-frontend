import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { ROLE_OPTIONS } from "@/shared/constants/roles";
import UserForm from "../components/UserForm";
import { createUser } from "../redux/userThunks";
import { fetchBranches } from "../../branch/redux/branchThunks";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/shared/components/PageHeader";
import Loader from "@/shared/components/Loader";

export default function CreateUserPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading: userLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const { branches, loading: branchLoading } = useSelector(
    (state) => state.branch
  );

  const handleCreateUser = async (data) => {
      await dispatch(createUser(data)).unwrap();
      toast.success("User created successfully");
      navigate("/edu/users");
  };

  if (branchLoading.branches) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <PageHeader
        title="Create User"
        description="Add a new system user"
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
        mode="create"
        roles={ROLE_OPTIONS}
        branches={branches}
        onSubmit={handleCreateUser}
        loading={userLoading.create}
      />
    </div>
  );
}
