import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { createUserSchema, updateUserSchema } from "../validations/userSchema";
import { Save, SavePlus, Loader2 } from "lucide-react";
import PasswordInput from "@/shared/components/PasswordInput";

export default function UserForm({
  mode = 'create',
  initialData,
  onSubmit,
  loading = false,
  roles = [],
  branches = [],
}) {
  const schema = mode === "create" ? createUserSchema : updateUserSchema;
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
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      branch: "",
    },
  });

  useEffect(() => {
    register("role");
    register("branch");
  }, [register]);

  useEffect(() => {
    if (initialData) {
      reset({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        role: initialData.role || "",
        branch: initialData.branch?._id || "",
      });
    }
  }, [initialData, reset]);

  const selectedRole = watch("role");
  const selectedBranch = watch("branch");

  const submitForm = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      if (error.errors) {
        error.errors.forEach((err) => {
          setError(err.path, {
            type: "server",
            message: err.msg,
          });
        });
      }

      throw error;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className={`text-lg`}>
          {initialData ? "Edit User Information" : "Add User Information"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel>
                First Name <span className="text-destructive">*</span>
              </FieldLabel>

              <Input
                {...register("firstName")}
                placeholder="Enter first name"
                className={`${errors.firstName ? "border-destructive" : ""}`}
              />

              <FieldError>{errors.firstName?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel>
                Last Name <span className="text-destructive">*</span>
              </FieldLabel>

              <Input
                {...register("lastName")}
                placeholder="Enter last name"
                className={`${errors.lastName ? "border-destructive" : ""}`}
              />

              <FieldError>{errors.lastName?.message}</FieldError>
            </Field>
          </div>

          <Field>
            <FieldLabel>
              Email <span className="text-destructive">*</span>
            </FieldLabel>

            <Input
              type="email"
              {...register("email")}
              placeholder="Enter email"
              className={`${errors.email ? "border-destructive" : ""}`}
            />

            <FieldError>{errors.email?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>
              Phone <span className="text-destructive">*</span>
            </FieldLabel>

            <Input
              {...register("phone")}
              placeholder="Enter phone number"
              className={`${errors.phone ? "border-destructive" : ""}`}
            />

            <FieldError>{errors.phone?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>
              Role <span className="text-destructive">*</span>
            </FieldLabel>
            <Select
              value={selectedRole}
              onValueChange={(value) =>
                setValue("role", value, { shouldValidate: true })
              }
              className={`${errors.role ? "border-destructive" : ""}`}
            >
              <SelectTrigger>
                <SelectValue>
                  {roles.find((r) => r.value === selectedRole)?.label ??
                    "Select role"}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError>{errors.role?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>
              Branch <span className="text-destructive">*</span>
            </FieldLabel>

            <Select
              value={selectedBranch}
              onValueChange={(value) =>
                setValue("branch", value, { shouldValidate: true })
              }
              className={`${errors.branch ? "border-destructive" : ""}`}
            >
              <SelectTrigger>
                <SelectValue>
                  {branches.find((b) => b._id === selectedBranch)?.branchName ??
                    "Select branch"}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch._id} value={branch._id}>
                    {branch.branchName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FieldError>{errors.branch?.message}</FieldError>
          </Field>

          {mode === "create" && (
            <>
              <Field>
                <FieldLabel>
                  Password <span className="text-destructive">*</span>
                </FieldLabel>

                <PasswordInput
                  id="password"
                  register={register("password")}
                  error={errors.password}
                  placeholder="Enter password"
                />

                <FieldError>{errors.password?.message}</FieldError>
                <p className="text-[13px] text-muted-foreground">
                  Password must contain:
                </p>

                <ul className="ml-5 list-disc text-[13px] text-muted-foreground">
                  <li>Minimum 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One number</li>
                  <li>One special character</li>
                </ul>
              </Field>
            </>
          )}

          <Button type="submit" disabled={loading} className="rounded-lg gap-2">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : initialData ? (
              <>
                <SavePlus className="h-4 w-4" />
                Update User
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Create User
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
