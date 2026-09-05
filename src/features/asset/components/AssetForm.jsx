import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2, Save, SavePlus } from "lucide-react";
import { toast } from "sonner";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import SearchableSelect from "@/shared/components/SearchableSelect";
import { assetSchema } from "../validations/assetSchema";

export default function AssetForm({
    mode = "create",
    initialData,
    onSubmit,
    loading = false,
    inventories = [],
}) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(assetSchema),
        defaultValues: {
            inventory: "",
            serialNumber: "",
            remarks: "",
        },
    });

    const selectedInventoryId = watch("inventory");
    const selectedInventory = inventories.find(
        (inventory) => inventory._id === selectedInventoryId,
    );

    useEffect(() => {
      if (!initialData) {
        reset({
          inventory: "",
          serialNumber: "",
          remarks: "",
        });

        return;
      }

      reset({
          inventory: initialData.inventory?._id || initialData.inventory || "",
          serialNumber: initialData.serialNumber || "",
          remarks: initialData.remarks || "",
      });
    }, [initialData, reset]);

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

            const errorMsg = mode === "create" ? "Failed to create asset": "Failed to update asset";

            toast.error(error?.message ?? errorMsg);
        }
    };

    return (
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
            {/* ASSET INFORMATION */}
            <div className="space-y-4">
              <div>
                <h3 className="text-[16px] font-semibold text-blue-900">
                  Asset Information
                </h3>

                <p className="text-[13px] text-muted-foreground">
                  {mode === "create"
                    ? "Select the inventory item from which this asset will be created."
                    : "Selected inventory item."}
                </p>
              </div>

              {/* Inventory */}
              {mode === "create" ? (
                <Field>
                  <FieldLabel htmlFor="inventory">
                    Inventory <span className="text-destructive">*</span>
                  </FieldLabel>

                  <Controller
                    name="inventory"
                    control={control}
                    render={({ field }) => (
                      <SearchableSelect
                        id="inventory"
                        value={field.value}
                        onValueChange={field.onChange}
                        error={!!errors.inventory}
                        placeholder="Search inventory..."
                        searchPlaceholder="Search inventory..."
                        emptyMessage="No inventory items found."
                        options={inventories.map((inventory) => ({
                          value: inventory._id,
                          label: `${inventory.sku} - ${inventory.itemName}`,
                        }))}
                      />
                    )}
                  />

                  <FieldError>{errors.inventory?.message}</FieldError>
                </Field>
              ) : (
                <div className="rounded-lg border border-sky-800/40 bg-sky-800/10 p-4">
                  <h4 className="mb-3 text-sm font-semibold">
                    Inventory Information
                  </h4>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-muted-foreground">SKU</p>

                      <p className="text-sm font-medium">
                        {initialData?.inventory?.sku || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Item</p>

                      <p className="text-sm font-medium">
                        {initialData?.inventory?.itemName || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Branch</p>

                      <p className="text-sm font-medium">
                        {initialData?.branch?.branchName || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Selected Inventory Information */}
              {selectedInventory && (
                <div className="rounded-lg border border-sky-800/30 bg-sky-800/10 p-4">
                  <h4 className="mb-3 text-sm font-semibold">
                    Selected Inventory
                  </h4>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-muted-foreground">SKU</p>
                      <p className="text-sm font-medium">
                        {selectedInventory.sku}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Item</p>
                      <p className="text-sm font-medium">
                        {selectedInventory.itemName}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Unit</p>
                      <p className="text-sm font-medium">
                        {selectedInventory.unit || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground dark:text-gray-500">
                        Branch
                      </p>
                      <p className="text-sm font-medium">
                        {selectedInventory.branch?.branchName || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground dark:text-gray-500">
                        Available Stock
                      </p>
                      <p className="text-sm font-medium">
                        {selectedInventory.currentStock ?? 0}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ASSET DETAILS */}
            <div className="space-y-4">
              <div>
                <h3 className="text-[16px] font-semibold text-blue-900">
                  Asset Details
                </h3>

                <p className="text-[13px] text-muted-foreground">
                  Enter the identifying information for the physical asset.
                </p>
              </div>

              {/* Serial Number */}
              <Field>
                <FieldLabel htmlFor="serialNumber">Serial Number</FieldLabel>

                <Input
                  id="serialNumber"
                  {...register("serialNumber")}
                  placeholder="Enter serial number"
                  aria-invalid={!!errors.serialNumber}
                />

                <FieldError>{errors.serialNumber?.message}</FieldError>

                <p className="text-[13px] text-muted-foreground">
                  Optional. Serial number must be unique when provided.
                </p>
              </Field>

              {/* Remarks */}
              <Field>
                <FieldLabel htmlFor="remarks">Remarks</FieldLabel>

                <Textarea
                  id="remarks"
                  {...register("remarks")}
                  placeholder="Enter asset remarks"
                  rows={4}
                  aria-invalid={!!errors.remarks}
                />

                <FieldError>{errors.remarks?.message}</FieldError>

                <p className="text-[13px] text-muted-foreground">
                  Maximum 500 characters.
                </p>
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
                    Saving...
                  </>
                ) : mode === "edit" ? (
                  <>
                    <SavePlus className="h-4 w-4" />
                    Update Asset
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Create Asset
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
}
