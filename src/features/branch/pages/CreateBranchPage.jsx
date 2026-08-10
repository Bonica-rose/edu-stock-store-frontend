import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import BranchForm from "../components/BranchForm";
import { createBranch } from "../redux/branchThunks";

export default function CreateBranchPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.branch);

  const handleCreateBranch = async (data) => {
    try {
      await dispatch(createBranch(data)).unwrap();

      toast.success("Branch created successfully");

      navigate("/edu/branches");
    } catch (error) {
      toast.error(error.message || "Failed to create branch");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Create Branch</h1>

          <p className="text-sm text-muted-foreground">Add a new branch</p>
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
        mode="create"
        onSubmit={handleCreateBranch}
        loading={loading.create}
      />
    </div>
  );
}
