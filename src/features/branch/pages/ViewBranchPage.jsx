import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

import { fetchBranchById } from "../redux/branchThunks";
import BranchDetails from "../components/BranchDetails";

export default function ViewBranchPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { branch, loading, error } = useSelector((state) => state.branch);

    useEffect(() => {
        if (id) {
        dispatch(fetchBranchById(id));
        }
    }, [dispatch, id]);

    const handleBack = () => {
        navigate("/edu/branches");
    };

    const handleEdit = () => {
        navigate(`/edu/branches/${id}/edit`);
    };

    if (loading.branch) {
        return (
        <div className="flex items-center justify-center py-10">
            <p className="text-sm text-muted-foreground">
            Loading branch details...
            </p>
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
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                <h1 className="text-xl font-semibold">Branch Details</h1>

                <p className="text-sm text-muted-foreground">
                    View branch information
                </p>
                </div>

                <div className="flex items-center gap-2">
                <Button
                    type="button"
                    variant="secondary"
                    className="text-gray-500"
                    onClick={handleBack}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Branches
                </Button>

                <Button type="button" onClick={handleEdit} className="rounded-lg">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Branch
                </Button>
                </div>
            </div>

            {/* Branch Details */}
            <BranchDetails branch={branch} />
        </div>
    );
}
