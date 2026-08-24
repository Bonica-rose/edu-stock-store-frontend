import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2, UserMinus } from "lucide-react";
import { toast } from "sonner";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { returnAssetSchema } from "../validations/assetSchema";
import { formatDate } from "../../../shared/utils/dateFormatter";

const getUserName = (user) => {
  if (!user) return "-";

  return (
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.employeeId ||
    user.email ||
    "-"
  );
};

export default function ReturnAssetForm({
  asset,
  onSubmit,
  onCancel,
  loading = false,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(returnAssetSchema),
    defaultValues: {
      remarks: "",
    },
  });

  const submitForm = async (data) => {
    try {
      await onSubmit({
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

      toast.error(error?.message ?? "Failed to return asset.");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
      {/* ASSET INFORMATION */}
      <div className="rounded-lg border border-yellow-50 bg-yellow-100 p-4">
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
              {asset?.inventory?.itemName || asset?.assetName || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Serial Number</p>

            <p className="mt-1 text-sm font-medium">
              {asset?.serialNumber || "Not provided"}
            </p>
          </div>
        </div>
      </div>

      {/* CURRENT ASSIGNMENT */}
      <div className="rounded-lg border p-4">
        <h4 className="mb-3 text-sm font-semibold">Current Assignment</h4>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-muted-foreground">
              Currently Assigned To
            </p>

            <p className="mt-1 text-sm font-medium">
              {getUserName(asset?.assignedTo)}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Employee ID</p>

            <p className="mt-1 text-sm font-medium">
              {asset?.assignedTo?.employeeId || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Assigned Date</p>

            <p className="mt-1 text-sm font-medium">
              {formatDate(asset?.assignedDate, "DD MMM, YYYY")}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Assigned By</p>

            <p className="mt-1 text-sm font-medium">
              {getUserName(asset?.assignedBy)}
            </p>
          </div>
        </div>
      </div>

      {/* RETURN REMARKS */}
      <Field>
        <FieldLabel htmlFor="remarks">Return Remarks</FieldLabel>

        <Textarea
          id="remarks"
          {...register("remarks")}
          placeholder="Enter return remarks"
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
              Returning...
            </>
          ) : (
            <>
              <UserMinus className="h-4 w-4" />
              Return Asset
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
