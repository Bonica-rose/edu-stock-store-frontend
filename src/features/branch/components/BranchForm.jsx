import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { createBranchSchema, updateBranchSchema } from "../validations/branchSchema";
import { Save, SavePlus, Loader2 } from "lucide-react";
import BranchManagerSelect from "./BranchManagerSelect";

export default function BranchForm({
  mode = "create",
  initialData,
  managers = [],
  onSubmit,
  loading = false,
}) {
  const schema = mode === "create" ? createBranchSchema : updateBranchSchema;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),

    defaultValues: {
      branchCode: "",
      branchName: "",
      address: "",
      city: "",
      state: "",
      country: "India",
      phone: "",
      email: "",
      manager: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        branchCode: initialData.branchCode || "",
        branchName: initialData.branchName || "",
        address: initialData.address || "",
        city: initialData.city || "",
        state: initialData.state || "",
        country: initialData.country || "India",
        phone: initialData.phone || "",
        email: initialData.email || "",
        manager: initialData?.manager?._id || "",
      });
    }
  }, [initialData, reset]);

  const submitForm = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
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
          ? "Failed to create branch"
          : "Failed to update branch";

      toast.error(error.message ?? errorMsg);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {mode === "create"
            ? "Add Branch Information"
            : "Edit Branch Information"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="branchCode">
                Branch Code <span className="text-destructive">*</span>
              </FieldLabel>

              <Input
                id="branchCode"
                {...register("branchCode")}
                disabled={mode === "edit"}
                placeholder="Enter branch code"
                aria-invalid={!!errors.branchCode}
              />

              {errors.branchCode && <FieldError errors={[errors.branchCode]} />}
            </Field>

            <Field htmlFor="branchName">
              <FieldLabel>
                Branch Name <span className="text-destructive">*</span>
              </FieldLabel>

              <Input
                id="branchName"
                {...register("branchName")}
                placeholder="Enter branch name"
                aria-invalid={!!errors.branchName}
              />

              {errors.branchName && <FieldError errors={[errors.branchName]} />}
            </Field>

            <Field>
              <FieldLabel htmlFor="city">
                City <span className="text-destructive">*</span>
              </FieldLabel>

              <Input
                id="city"
                {...register("city")}
                placeholder="Enter city"
                aria-invalid={!!errors.city}
              />

              {errors.city && <FieldError errors={[errors.city]} />}
            </Field>

            <Field>
              <FieldLabel htmlFor="state">
                State <span className="text-destructive">*</span>
              </FieldLabel>

              <Input
                id="state"
                {...register("state")}
                placeholder="Enter state"
                aria-invalid={!!errors.state}
              />

              {errors.state && <FieldError errors={[errors.state]} />}
            </Field>

            <Field>
              <FieldLabel htmlFor="country">
                Country <span className="text-destructive">*</span>
              </FieldLabel>

              <Input
                id="country"
                {...register("country")}
                placeholder="Enter country"
                aria-invalid={!!errors.country}
              />

              {errors.country && <FieldError errors={[errors.country]} />}
            </Field>

            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>

              <Input
                {...register("phone")}
                placeholder="Enter phone"
                aria-invalid={!!errors.phone}
              />

              {errors.phone && <FieldError errors={[errors.phone]} />}
            </Field>

            <Field className="col-span-2">
              <FieldLabel htmlFor="email">Email</FieldLabel>

              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Enter email"
                aria-invalid={!!errors.email}
              />

              {errors.email && <FieldError errors={[errors.email]} />}
            </Field>

            <Field className="col-span-2">
              <FieldLabel htmlFor="address">
                Address <span className="text-destructive">*</span>
              </FieldLabel>

              <Input
                id="address"
                {...register("address")}
                placeholder="Enter address"
                aria-invalid={!!errors.address}
              />

              {errors.address && <FieldError errors={[errors.address]} />}
            </Field>

            {mode === "edit" && (
              <BranchManagerSelect
                value={watch("manager")}
                managers={managers}
                error={errors.manager}
                onChange={(value) =>
                  setValue("manager", value, {
                    shouldValidate: true,
                  })
                }
              />
            )}
          </div>

          <Button type="submit" disabled={loading} className="rounded-lg gap-2">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : mode === "edit" ? (
              <>
                <SavePlus className="h-4 w-4" />
                Update Branch
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Create Branch
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
