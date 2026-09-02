import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import SearchableSelect from "@/shared/components/SearchableSelect";
import { createMaintenanceSchema } from "../validations/maintenanceSchema";
import { MAINTENANCE_PRIORITY_OPTIONS } from "../utils/maintenanceConstants";

// const PRIORITY_OPTIONS = [
//   {
//     value: "Low",
//     label: "Low",
//   },
//   {
//     value: "Medium",
//     label: "Medium",
//   },
//   {
//     value: "High",
//     label: "High",
//   },
// ];

export default function CreateMaintenanceForm({
    assets = [],
    onSubmit,
    loading = false,
}) {
    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(createMaintenanceSchema),

      defaultValues: {
        asset: "",
        issueTitle: "",
        description: "",
        priority: "Medium",
      },
    });

    const submitForm = async (data) => {
        try {
            await onSubmit(data);
        } catch (error) {
            // Handle backend validation errors
            if (error.errors?.length) {
                error.errors.forEach((err) => {
                // handled by page / thunk
                });

                return;
            }

            toast.error(error?.message ?? "Failed to create maintenance.");
        }
    };

    return (
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
            {/* MAINTENANCE INFORMATION */}
            <div className="space-y-4">
              <div>
                <h3 className="text-[16px] font-semibold text-blue-900">
                  Maintenance Information
                </h3>

                <p className="text-[13px] text-muted-foreground">
                  Report an issue with an asset and create a maintenance
                  request.
                </p>
              </div>

              {/* Asset */}
              <Field>
                <FieldLabel htmlFor="asset">
                  Asset <span className="text-destructive">*</span>
                </FieldLabel>

                <Controller
                  name="asset"
                  control={control}
                  render={({ field }) => (
                    <SearchableSelect
                      id="asset"
                      value={field.value}
                      onValueChange={field.onChange}
                      error={!!errors.asset}
                      placeholder="Search asset..."
                      searchPlaceholder="Search asset..."
                      emptyMessage="No assets found."
                      options={assets
                        .filter(
                          (asset) => asset.isActive && asset.status === "Available",
                        )
                        .map((asset) => ({
                          value: asset._id,
                          label: `${asset.assetCode} - ${asset.inventory?.itemName}`,
                        }))}
                    />
                  )}
                />

                <FieldError>{errors.asset?.message}</FieldError>

                <p className="text-[13px] text-muted-foreground">
                  Select the asset that requires maintenance.
                </p>
              </Field>

              {/* Issue Title */}
              <Field>
                <FieldLabel htmlFor="issueTitle">
                  Issue Title <span className="text-destructive">*</span>
                </FieldLabel>

                <Input
                  id="issueTitle"
                  {...register("issueTitle")}
                  placeholder="Enter maintenance issue"
                  maxLength={100}
                  aria-invalid={!!errors.issueTitle}
                />

                <FieldError>{errors.issueTitle?.message}</FieldError>
              </Field>

              {/* Description */}
              <Field>
                <FieldLabel htmlFor="description">
                  Description <span className="text-destructive">*</span>
                </FieldLabel>

                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Describe the issue in detail"
                  rows={5}
                  maxLength={1000}
                  aria-invalid={!!errors.description}
                />

                <FieldError>{errors.description?.message}</FieldError>

                <p className="text-[13px] text-muted-foreground">
                  Maximum 1000 characters.
                </p>
              </Field>

              {/* Priority */}
              <Field>
                <FieldLabel htmlFor="priority">Priority</FieldLabel>

                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="priority"
                        className="w-full"
                        aria-invalid={!!errors.priority}
                      >
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>

                      <SelectContent>
                        {MAINTENANCE_PRIORITY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                <FieldError>{errors.priority?.message}</FieldError>
              </Field>
            </div>

            {/* SUBMIT */}
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={loading}
                className="gap-2 rounded-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Create Maintenance
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
}
