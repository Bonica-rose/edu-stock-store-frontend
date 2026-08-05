import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { ROLE_OPTIONS } from "@/shared/constants/roles";
import UserForm from "../components/UserForm";
import { createUser } from "../redux/userThunks";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreateUserPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.user);

  // useEffect(() => {
  //   dispatch(fetchBranches());
  // }, [dispatch]);

  // const branches = useSelector((state) => state.branch.branches);

  const branches = [
    {
      _id: "6a715a7cbbac34ebacd78c60",
      branchName: "Head Office",
      branchCode: "HO",
    },
  ];

  const handleCreateUser = async (data) => {
    try {
      console.log(data);
      await dispatch(createUser(data)).unwrap();

      toast.success("User created successfully");

      navigate("/edu/users");
    } catch (error) {
      toast.error(error || "Failed to create user");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Create User</h1>
          <p className="text-sm text-muted-foreground">Add a new system user</p>
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
        mode="create"
        roles={ROLE_OPTIONS}
        branches={branches}
        onSubmit={handleCreateUser}
        loading={loading.create}
      />
    </div>
  );
}
