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

export default function EditBranchPage() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const branch = useSelector((state) => state.branch.branch);
  const loading = useSelector((state) => state.branch.loading);  
  const managers = useSelector((state) => state.user.users);

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
    try {
      const { branchCode, ...branchData } = data;
      await dispatch(
        updateBranch({
          id,
          branchData,
        }),
      ).unwrap();

      toast.success("Branch updated successfully");

      navigate("/edu/branches");
    } catch (error) {
      toast.error(error.message || "Failed to update branch");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Edit Branch</h1>

          <p className="text-sm text-muted-foreground">
            Update branch information
          </p>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate("/edu/branches")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Branches
        </Button>
      </div>

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
