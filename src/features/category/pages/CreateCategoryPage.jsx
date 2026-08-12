import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CATEGORY_TYPE_OPTIONS } from "@/shared/constants/category";

import CategoryForm from "../components/CategoryForm";
import { createCategory } from "../redux/categoryThunks";
import PageHeader from "@/shared/components/PageHeader";

export default function CreateCategoryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.category);

  const handleCreateCategory = async (data) => {
    await dispatch(createCategory(data)).unwrap();
    toast.success("Category created successfully");
    navigate("/edu/categories");
  };

  return (
    <div className="space-y-3">
      {/* Page Header */}
      <PageHeader
        title="Create Category"
        description="Add a new category"
        action={
          <Button
            type="button"
            variant="secondary"
            className={`text-gray-500`}
            onClick={() => navigate("/edu/categories")}
          >
            <ArrowLeft className="mr-2 h-4 w-4 text-gray-500" />
            Back to Categories
          </Button>
        }
      />

      {/* Category Form */}
      <CategoryForm
        mode="create"
        categoryTypes={CATEGORY_TYPE_OPTIONS}
        onSubmit={handleCreateCategory}
        loading={loading.create}
      />
    </div>
  );
}
