import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

import { fetchBranchById } from "../redux/branchThunks";
import BranchDetails from "../components/BranchDetails";
import PageHeader from "@/shared/components/PageHeader";
import Loader from "@/shared/components/Loader";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function ViewBranchPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { hasPermission } = usePermission();

    const canUpdate = hasPermission(PERMISSIONS.BRANCH_UPDATE);

    const { branch, loading, error } = useSelector((state) => state.branch);

    useEffect(() => {
        if (id) {
        dispatch(fetchBranchById(id));
        }
    }, [dispatch, id]);

    const handleBack = () => {
        navigate("/edu/branches");
    };

    if (loading.branch) {
        return (
            <div>
            <Loader />
            </div>
        );
    }

    if (error) {
        return (
        <div className="space-y-4">
            <div>
                <h1 className="text-xl font-semibold">Branch Details</h1>
                <p className="text-sm text-destructive">{error}</p>
            </div>

            <Button
                type="button"
                variant="secondary"
                className="text-gray-500"
                onClick={handleBack}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Branches
            </Button>
        </div>
        );
    }

    if (!branch) {
        return (
            <div className="space-y-4">
                <div>
                    <h1 className="text-xl font-semibold">Branch Details</h1>
                    <p className="text-sm text-muted-foreground">Branch not found.</p>
                </div>

                <Button
                    type="button"
                    variant="secondary"
                    className="text-gray-500"
                    onClick={handleBack}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Branches
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-3">

            {/* Page Header */}
            <PageHeader
                title="Branch Details"
                description="View branch information"
                action={
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="secondary"
                            className="text-gray-500"
                            onClick={() => navigate("/edu/branches")}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Branches
                        </Button>

                        {canUpdate && <Button
                            type="button"
                            onClick={() => navigate(`/edu/branches/${id}/edit`)}
                            className="rounded-lg"
                        >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Branch
                        </Button>}
                    </div>
                }
            />

            {/* Branch Details */}
            <BranchDetails branch={branch} />
        </div>
    );
}
