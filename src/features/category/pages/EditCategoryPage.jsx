import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { ArrowLeft } from "lucide-react";
import Loader from "@/shared/components/Loader";
import { Button } from "@/components/ui/button";
import { CATEGORY_TYPE_OPTIONS } from "@/shared/constants/category";
import CategoryForm from "../components/CategoryForm";
import { fetchCategoryById, updateCategory } from "../redux/categoryThunks";
import PageHeader from "@/shared/components/PageHeader";

export default function EditCategoryPage() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const category = useSelector((state) => state.category.category);

  const loading = useSelector((state) => state.category.loading);

  useEffect(() => {
    dispatch(fetchCategoryById(id));
  }, [dispatch, id]);

  const handleUpdateCategory = async (data) => {
    await dispatch(
      updateCategory({
        id,
        categoryData: data,
      }),
    ).unwrap();

    toast.success("Category updated successfully");
    navigate("/edu/categories");
  };
    
  if (loading.category) {
    return <div><Loader /></div>;
  }  

  return (
    <div className="space-y-3">

      {/* Page Header */}
      <PageHeader
        title="Edit Category"
        description="Update category information"
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
        mode="edit"
        initialData={category}
        categoryTypes={CATEGORY_TYPE_OPTIONS}
        onSubmit={handleUpdateCategory}
        loading={loading.update}
      />
    </div>
  );
}
