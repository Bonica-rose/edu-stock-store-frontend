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

      toast.error(error.message || "Something went wrong");
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
              <FieldLabel>
                Branch Code <span className="text-destructive">*</span>
              </FieldLabel>

              <Input
                {...register("branchCode")}
                disabled={mode === "edit"}
                placeholder="Enter branch code"
                className={errors.branchCode ? "border-destructive" : ""}
              />

              <FieldError>{errors.branchCode?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel>
                Branch Name <span className="text-destructive">*</span>
              </FieldLabel>

              <Input
                {...register("branchName")}
                placeholder="Enter branch name"
                className={errors.branchName ? "border-destructive" : ""}
              />

              <FieldError>{errors.branchName?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel>
                City <span className="text-destructive">*</span>
              </FieldLabel>

              <Input
                {...register("city")}
                placeholder="Enter city"
                className={errors.city ? "border-destructive" : ""}
              />

              <FieldError>{errors.city?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel>
                State <span className="text-destructive">*</span>
              </FieldLabel>

              <Input
                {...register("state")}
                placeholder="Enter state"
                className={errors.state ? "border-destructive" : ""}
              />

              <FieldError>{errors.state?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel>
                Country <span className="text-destructive">*</span>
              </FieldLabel>

              <Input
                {...register("country")}
                placeholder="Enter country"
                className={errors.country ? "border-destructive" : ""}
              />

              <FieldError>{errors.country?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel>Phone</FieldLabel>

              <Input
                {...register("phone")}
                placeholder="Enter phone"
                className={errors.phone ? "border-destructive" : ""}
              />

              <FieldError>{errors.phone?.message}</FieldError>
            </Field>

            <Field className="col-span-2">
              <FieldLabel>Email</FieldLabel>

              <Input
                type="email"
                {...register("email")}
                placeholder="Enter email"
                className={errors.email ? "border-destructive" : ""}
              />

              <FieldError>{errors.email?.message}</FieldError>
            </Field>

            <Field className="col-span-2">
              <FieldLabel>
                Address <span className="text-destructive">*</span>
              </FieldLabel>

              <Input
                {...register("address")}
                placeholder="Enter address"
                className={errors.address ? "border-destructive" : ""}
              />

              <FieldError>{errors.address?.message}</FieldError>
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
