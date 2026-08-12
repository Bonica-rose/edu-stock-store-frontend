import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/categorySchema";
import { Save, SavePlus, Loader2 } from "lucide-react";

export default function CategoryForm({
  mode = "create",
  initialData,
  onSubmit,
  loading = false,
  categoryTypes = [],
}) {
  const schema =
    mode === "create" ? createCategorySchema : updateCategorySchema;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),

    defaultValues: {
      categoryName: "",
      categoryCode: "",
      description: "",
      type: "",
    },
  });
  
  useEffect(() => {
    register("type");
  }, [register]);

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      reset({
        categoryName: initialData.categoryName || "",
        categoryCode: initialData.categoryCode || "",
        description: initialData.description || "",
        type: initialData.type || "",
      });
    }
  }, [initialData, reset]);

  const selectedType = watch("type");

  const submitForm = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      // Handle backend validation errors
      if (error.errors?.length) {
        error.errors.forEach((err) => {
          setError(err.path, {
            type: "server",
            message: err.msg,
          });
        });

        return;
      }

      const errorMsg =
        mode === "create"
          ? "Failed to create category"
          : "Failed to update category";

      toast.error(error?.message ?? errorMsg);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {initialData
            ? "Edit Category Information"
            : "Add Category Information"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
          {/* Category Name */}
          <Field>
            <FieldLabel htmlFor="categoryName">
              Category Name <span className="text-destructive">*</span>
            </FieldLabel>

            <Input
              id="categoryName"
              {...register("categoryName")}
              placeholder="Enter category name"
              aria-invalid={!!errors.categoryName}
            />

            <FieldError>{errors.categoryName?.message}</FieldError>
          </Field>

          {/* Category Code */}
          <Field>
            <FieldLabel htmlFor="categoryCode">Category Code</FieldLabel>

            <Input
              id="categoryCode"
              {...register("categoryCode")}
              placeholder="Enter category code"
              aria-invalid={!!errors.categoryCode}
            />

            {errors.categoryCode && (
              <FieldError errors={[errors.categoryCode]} />
            )}

            <p className="text-[13px] text-muted-foreground">
              Use letters, numbers, hyphens or underscores.
            </p>
          </Field>

          {/* Category Type */}
          <Field>
            <FieldLabel htmlFor="type">
              Category Type <span className="text-destructive">*</span>
            </FieldLabel>

            <Select
              id="type"
              value={selectedType}
              onValueChange={(value) =>
                setValue("type", value, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            >
              <SelectTrigger aria-invalid={!!errors.type}>
                <SelectValue placeholder="Select category type">
                  {categoryTypes.find((type) => type.value === selectedType)
                    ?.label ?? "Select category type"}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {categoryTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FieldError>{errors.type?.message}</FieldError>
          </Field>

          {/* Description */}
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>

            <Textarea
              id="description"
              {...register("description")}
              placeholder="Enter category description"
              rows={4}
              aria-invalid={!!errors.description}
            />

            <FieldError>{errors.description?.message}</FieldError>

            <p className="text-[13px] text-muted-foreground">
              Maximum 500 characters.
            </p>
          </Field>

          {/* Submit */}
          <Button type="submit" disabled={loading} className="gap-2 rounded-lg">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : initialData ? (
              <>
                <SavePlus className="h-4 w-4" />
                Update Category
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Create Category
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
