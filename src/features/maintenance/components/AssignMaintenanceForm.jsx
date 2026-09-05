import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Loader2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import SearchableSelect from "@/shared/components/SearchableSelect";
import { assignMaintenance } from "../redux/maintenanceThunks";
import useMaintenanceStaffOptions from "../utils/useMaintenanceStaffOptions";
import { assignMaintenanceSchema } from "../validations/maintenanceSchema";

export default function AssignMaintenanceForm({
  open,
  onOpenChange,
  maintenance,
}) {
  const dispatch = useDispatch();

  const { maintenanceStaff, loading: optionsLoading } = useMaintenanceStaffOptions();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(assignMaintenanceSchema),

    defaultValues: {
      assignedTo: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        assignedTo: maintenance?.assignedTo?._id ?? "",
      });
    }
  }, [open, maintenance, reset]);

  const handleAssign = async (data) => {
    try {
      await dispatch(
        assignMaintenance({
          id: maintenance._id,
          assignmentData: data,
        }),
      ).unwrap();

      toast.success("Maintenance assigned successfully.");
      onOpenChange(false);
    } catch (error) {
      toast.error(error?.message ?? "Failed to assign maintenance.");
    }
  };

  const handleClose = (value) => {
    if (!value) {
      reset({
        assignedTo: "",
      });
    }

    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Assign Maintenance
          </DialogTitle>

          <DialogDescription>
            Assign this maintenance request to a Maintenance Staff member.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleAssign)} className="space-y-5">
          {/* Maintenance */}
          <div className="rounded-lg border border-violet/30 bg-violet/30 p-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Maintenance</p>

              <p className="font-medium">{maintenance?.maintenanceId ?? "—"}</p>
            </div>

            <div className="mt-3 space-y-1">
              <p className="text-xs text-muted-foreground">Asset</p>

              <p className="font-medium">
                {maintenance?.asset?.assetCode ?? "—"}
                {" - "}
                {maintenance?.asset?.inventory?.itemName ?? "—"}
              </p>
            </div>
          </div>

          {/* Assigned To */}
          <Field>
            <FieldLabel>
              Assign To <span className="text-destructive">*</span>
            </FieldLabel>

            <Controller
              name="assignedTo"
              control={control}
              render={({ field }) => (
                <SearchableSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  options={(Array.isArray(maintenanceStaff.users)
                    ? maintenanceStaff.users
                    : []
                  ).map((user) => ({
                    value: user._id,
                    label: `${user.firstName} ${user.lastName} - ${user.branch?.branchName}`
                  }))}
                  placeholder="Search maintenance staff..."
                  searchPlaceholder="Search maintenance staff..."
                  emptyMessage="No maintenance staff found."
                  disabled={optionsLoading}
                  error={!!errors.assignedTo}
                />
              )}
            />

            <FieldError>{errors.assignedTo?.message}</FieldError>
          </Field>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={optionsLoading}
              onClick={() => handleClose(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={optionsLoading} className="gap-2">
              {optionsLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Assign
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
