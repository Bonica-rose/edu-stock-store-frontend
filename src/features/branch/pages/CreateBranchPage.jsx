import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import BranchForm from "../components/BranchForm";
import { createBranch } from "../redux/branchThunks";
import PageHeader from "@/shared/components/PageHeader";

export default function CreateBranchPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.branch);

  const handleCreateBranch = async (data) => {
    await dispatch(createBranch(data)).unwrap();
    toast.success("Branch created successfully");
    navigate("/edu/branches");
  };

  return (
    <div className="space-y-3">
      <PageHeader
        title="Create Branch"
        description="Add a new branch"
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
        mode="create"
        onSubmit={handleCreateBranch}
        loading={loading.create}
      />
    </div>
  );
}
