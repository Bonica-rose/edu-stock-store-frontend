import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import BranchForm from "../components/BranchForm";
import { fetchBranchById, updateBranch } from "../redux/branchThunks";
import { ROLES } from "@/shared/constants/roles"
import { fetchUsers } from "@/features/user/redux/userThunks";
import PageHeader from "@/shared/components/PageHeader";
import Loader from "@/shared/components/Loader";

export default function EditBranchPage() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const branch = useSelector((state) => state.branch.branch);
  const loading = useSelector((state) => state.branch.loading);  
  const managers = useSelector((state) => state.user.users);
  const userLoading = useSelector((state) => state.user.loading);  

  useEffect(() => {
    dispatch(fetchBranchById(id));

    dispatch(
      fetchUsers({
        role: ROLES.BRANCH_ADMIN,
        branch: id, // Branch ID
        isActive: true,
        limit: 100,
      }),
    );
  }, [dispatch, id]);

  const handleUpdateBranch = async (data) => {
    const { branchCode, ...branchData } = data;
    await dispatch(
      updateBranch({
        id,
        branchData,
      }),
    ).unwrap();

    toast.success("Branch updated successfully");
    navigate("/edu/branches");
  };

  if (loading.branch || userLoading.users) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <PageHeader
        title="Edit Branch"
        description="Update branch information"
        action={
          <Button
            type="button"
            variant="secondary"
            className={`text-gray-500`}
            onClick={() => navigate("/edu/branches")}
          >
            <ArrowLeft className="mr-2 h-4 w-4 text-gray-500" />
            Back to Branches
          </Button>
        }
      />

      <BranchForm
        mode="edit"
        initialData={branch}
        managers={managers}
        onSubmit={handleUpdateBranch}
        loading={loading.update}
      />
    </div>
  );
}
