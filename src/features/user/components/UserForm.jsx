import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

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
        mode === "create" ? "Failed to create user" : "Failed to update user";

      toast.error(error?.message ?? errorMsg);
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
              <FieldLabel htmlFor="firstName">
                First Name <span className="text-destructive">*</span>
              </FieldLabel>

              <Input
                id="firstName"
                {...register("firstName")}
                placeholder="Enter first name"
                aria-invalid={!!errors.firstName}
              />

              {errors.firstName && <FieldError errors={[errors.firstName]} />}
            </Field>

            <Field>
              <FieldLabel htmlFor="lastName">
                Last Name <span className="text-destructive">*</span>
              </FieldLabel>

              <Input
                id="lastName"
                {...register("lastName")}
                placeholder="Enter last name"
                aria-invalid={!!errors.lastName}
              />

              {errors.lastName && <FieldError errors={[errors.lastName]} />}
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="email">
              Email <span className="text-destructive">*</span>
            </FieldLabel>

            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter email"
              aria-invalid={!!errors.email}
            />

            {errors.email && <FieldError errors={[errors.email]} />}
          </Field>

          <Field>
            <FieldLabel htmlFor="phone">
              Phone
            </FieldLabel>

            <Input
              id="phone"
              {...register("phone")}
              placeholder="Enter phone number"
              aria-invalid={!!errors.phone}
            />

            {errors.phone && <FieldError errors={[errors.phone]} />}
          </Field>

          <Field>
            <FieldLabel htmlFor="role">
              Role <span className="text-destructive">*</span>
            </FieldLabel>
            <Select
              id="role"
              value={selectedRole}
              onValueChange={(value) =>
                setValue("role", value, { shouldValidate: true })
              }
            >
              <SelectTrigger aria-invalid={!!errors.role}>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.role && <FieldError errors={[errors.role]} />}
          </Field>

          <Field>
            <FieldLabel htmlFor="branch">
              Branch <span className="text-destructive">*</span>
            </FieldLabel>

            <Select
              id="branch"
              value={selectedBranch}
              onValueChange={(value) =>
                setValue("branch", value, { shouldValidate: true })
              }
            >
              <SelectTrigger aria-invalid={!!errors.branch}>
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

            {errors.branch && <FieldError errors={[errors.branch]} />}
          </Field>

          {mode === "create" && (
            <>
              <Field>
                <FieldLabel htmlFor="password">
                  Password <span className="text-destructive">*</span>
                </FieldLabel>

                <PasswordInput
                  id="password"
                  register={register("password")}
                  error={errors.password}
                  placeholder="Enter password"
                />

                {errors.password && <FieldError errors={[errors.password]} />}
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
