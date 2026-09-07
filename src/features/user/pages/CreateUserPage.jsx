import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  ROLES,
  USER_CREATE_ROLE_OPTIONS,
  BRANCH_ADMIN_ROLE_OPTIONS,
} from "@/shared/constants/roles";
import UserForm from "../components/UserForm";
import { createUser } from "../redux/userThunks";
import { fetchBranches } from "../../branch/redux/branchThunks";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/shared/components/PageHeader";
import Loader from "@/shared/components/Loader";
import CreationSuccessDialog from "@/shared/components/CreationSuccessDialog";

export default function CreateUserPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const { loading: userLoading } = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const { branches, loading: branchLoading } = useSelector(
    (state) => state.branch
  );

  const ALLOWED_ROLES =
    currentUser.role === ROLES.BRANCH_ADMIN
      ? BRANCH_ADMIN_ROLE_OPTIONS
      : USER_CREATE_ROLE_OPTIONS;  

  const handleCreateUser = async (data) => {
    await dispatch(createUser(data)).unwrap();
  };

  const handleCreateSuccess = () => {
    setShowSuccessDialog(true);
  };

  const handleCreateAnother = () => {
    setShowSuccessDialog(false);
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
        roles={ALLOWED_ROLES}
        branches={branches}
        onSuccess={handleCreateSuccess}
        onSubmit={handleCreateUser}
        loading={userLoading.create}
        currentUser={currentUser}
      />

      <CreationSuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        title="User created successfully"
        description="The user has been created successfully. Would you like to stay here or go back to the users list?"
        stayLabel="Create another"
        redirectLabel="Go to Users"
        onStay={handleCreateAnother}
        onRedirect={() => navigate("/edu/users")}
      />
    </div>
  );
}
