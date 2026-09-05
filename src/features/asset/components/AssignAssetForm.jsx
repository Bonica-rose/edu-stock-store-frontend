import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { Loader2, UserPlus } from "lucide-react";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SearchableSelect from "@/shared/components/SearchableSelect";
import { assignAssetSchema } from "../validations/assetSchema";

export default function AssignAssetForm({
  asset,
  employees = [],
  onSubmit,
  onCancel,
  loading = false,
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(assignAssetSchema),
    defaultValues: {
      assignedTo: "",
      remarks: "",
    },
  });

  const submitForm = async (data) => {
    try {
      await onSubmit({
        assignedTo: data.assignedTo,
        remarks: data.remarks?.trim() || "",
      });
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

      toast.error(error?.message ?? "Failed to assign asset.");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
      {/* ASSET INFORMATION */}
      <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/20 p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-muted-foreground">Asset</p>

            <p className="mt-1 text-sm font-medium">
              {asset?.assetCode || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Inventory</p>

            <p className="mt-1 text-sm font-medium">
              {asset?.inventory?.itemName || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Serial Number</p>

            <p className="mt-1 text-sm font-medium">
              {asset?.serialNumber || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Branch</p>

            <p className="mt-1 text-sm font-medium">
              {asset?.branch?.branchName ||
                asset?.inventory?.branch?.branchName ||
                "-"}
            </p>
          </div>
        </div>
      </div>

      {/* ASSIGN TO */}
      <Field>
        <FieldLabel htmlFor="assignedTo">
          Assign To <span className="text-destructive">*</span>
        </FieldLabel>

        <Controller
          name="assignedTo"
          control={control}
          render={({ field }) => (
            <SearchableSelect
              id="assignedTo"
              value={field.value}
              onValueChange={field.onChange}
              error={!!errors.assignedTo}
              placeholder="Search employee..."
              searchPlaceholder="Search employee..."
              emptyMessage="No employees found."
              options={employees
                .filter((employee) => employee.isActive !== false)
                .map((employee) => ({
                  value: employee._id,
                  label: `${employee.firstName || ""} ${
                    employee.lastName || ""
                  }${
                    employee.employeeId ? ` (${employee.employeeId})` : ""
                  }`.trim(),
                }))}
            />
          )}
        />

        <FieldError>{errors.assignedTo?.message}</FieldError>
      </Field>

      {/* REMARKS */}
      <Field>
        <FieldLabel htmlFor="remarks">Remarks</FieldLabel>

        <Textarea
          id="remarks"
          {...register("remarks")}
          placeholder="Enter assignment remarks"
          rows={4}
          maxLength={500}
          aria-invalid={!!errors.remarks}
        />

        <FieldError>{errors.remarks?.message}</FieldError>

        <p className="text-[13px] text-muted-foreground">
          Maximum 500 characters.
        </p>
      </Field>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 border-t pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={loading} className="gap-2">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Assigning...
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              Assign Asset
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
