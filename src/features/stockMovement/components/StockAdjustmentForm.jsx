import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { adjustmentSchema } from "../validations/movementSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import SearchableSelect from "@/shared/components/SearchableSelect";
import useStockMovementFormOptions from "../utils/useStockMovementFormOptions";
import { Card, CardContent } from "@/components/ui/card";
import { SlidersHorizontal } from "lucide-react";
import Loader from "@/shared/components/Loader";
import { Textarea } from "@/components/ui/textarea";

export default function StockAdjustmentForm({
    onSubmit,
    onCancel,
    loading = false,
}) {
    const { inventories = [] } = useStockMovementFormOptions();

    const {
        register,
        control,
        handleSubmit,
        watch,
        setError,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(adjustmentSchema),

        defaultValues: {
        inventory: "",
        adjustmentType: "increase",
        quantity: "",
        reason: "",
        remarks: "",
        },
    });

    const selectedInventoryId = watch("inventory");
    const adjustmentType = watch("adjustmentType");
    const quantity = watch("quantity");

    const selectedInventory = inventories.find(
        (inventory) => inventory._id === selectedInventoryId,
    );

    const inventoryOptions = inventories.map((inventory) => ({
        value: inventory._id,
        label: `${inventory.sku} - ${inventory.itemName}`,
    }));

    const newStock =
        selectedInventory && quantity
        ? adjustmentType === "increase"
            ? selectedInventory.currentStock + Number(quantity)
            : selectedInventory.currentStock - Number(quantity)
        : null;

    const submitForm = async (data) => {
        const signedQuantity =
            data.adjustmentType === "increase"
                ? Number(data.quantity)
                : -Number(data.quantity);

        if (
            data.adjustmentType === "decrease" &&
            selectedInventory &&
            Number(data.quantity) > selectedInventory.currentStock
        ) {
            setError("quantity", {
                type: "manual",
                message: "Adjustment cannot reduce stock below zero.",
            });

            return;
        }

        const payload = {
            inventory: data.inventory,
            quantity: signedQuantity,
            reason: data.reason,
            remarks: data.remarks || undefined,
        };

        try {
            await onSubmit(payload);
        } catch (error) {
            const serverErrors = error?.errors;

            if (Array.isArray(serverErrors)) {
                serverErrors.forEach((item) => {
                    if (item.path) {
                        setError(item.path, {
                            type: "server",
                            message: item.msg,
                        });
                    }
                });
            } else {
                setError("root", {
                    type: "server",
                    message:
                        error?.message || "Failed to adjust stock. Please try again.",
                });
            }
        }
    };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
          {/* Inventory */}
          <Field>
            <FieldLabel>
              Inventory <span className="text-destructive">*</span>
            </FieldLabel>

            <Controller
              name="inventory"
              control={control}
              render={({ field }) => (
                <SearchableSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  options={inventoryOptions}
                  placeholder="Select inventory"
                  searchPlaceholder="Search inventory..."
                  emptyMessage="No inventory found."
                  disabled={loading}
                />
              )}
            />

            {errors.inventory && (
              <FieldError>{errors.inventory.message}</FieldError>
            )}
          </Field>

          {/* Current Stock */}
          {selectedInventory && (
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="text-sm text-muted-foreground">Current Stock</div>

              <div className="mt-1 text-xl font-semibold">
                {selectedInventory.currentStock}
                {selectedInventory.unit && (
                  <span className="ml-1 text-sm font-normal text-muted-foreground">
                    {selectedInventory.unit}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Adjustment Type */}
          <Field>
            <FieldLabel>
              Adjustment Type <span className="text-destructive">*</span>
            </FieldLabel>

            <Controller
              name="adjustmentType"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant={field.value === "increase" ? "active" : "outline"}
                    onClick={() => field.onChange("increase")}
                    disabled={loading}
                  >
                    Increase Stock
                  </Button>

                  <Button
                    type="button"
                    variant={
                      field.value === "decrease" ? "destructive" : "outline"
                    }
                    onClick={() => field.onChange("decrease")}
                    disabled={loading}
                  >
                    Decrease Stock
                  </Button>
                </div>
              )}
            />

            {errors.adjustmentType && (
              <FieldError>{errors.adjustmentType.message}</FieldError>
            )}
          </Field>

          {/* Quantity */}
          <Field>
            <FieldLabel htmlFor="quantity">
              Adjustment Quantity <span className="text-destructive">*</span>
            </FieldLabel>

            <Input
              id="quantity"
              type="number"
              min="1"
              step="1"
              placeholder="Enter quantity"
              {...register("quantity")}
              disabled={loading}
              className={
                errors.quantity
                  ? "focus-visible:border-destructive/40 focus-visible:ring-destructive/20"
                  : "focus-visible:border-blue-500 focus-visible:ring-blue-100"
              }
            />

            {errors.quantity && (
              <FieldError>{errors.quantity.message}</FieldError>
            )}
          </Field>

          {/* New Stock Preview */}
          {newStock !== null && (
            <div
              className={`rounded-lg border p-4 ${
                newStock < 0
                  ? "border-destructive bg-destructive/5"
                  : "bg-muted/30"
              }`}
            >
              <div className="text-sm text-muted-foreground">New Stock</div>

              <div className="mt-1 text-xl font-semibold">
                {newStock}
                {selectedInventory?.unit && (
                  <span className="ml-1 text-sm font-normal text-muted-foreground">
                    {selectedInventory.unit}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Reason */}
          <Field>
            <FieldLabel htmlFor="reason">
              Reason <span className="text-destructive">*</span>
            </FieldLabel>

            <Input
              id="reason"
              placeholder="Enter adjustment reason"
              maxLength={100}
              {...register("reason")}
              disabled={loading}
              className={
                errors.reason
                  ? "focus-visible:border-destructive/40 focus-visible:ring-destructive/20"
                  : "focus-visible:border-blue-500 focus-visible:ring-blue-100"
              }
            />

            {errors.reason && <FieldError>{errors.reason.message}</FieldError>}
          </Field>

          {/* Remarks */}
          <Field>
            <FieldLabel htmlFor="remarks">Remarks</FieldLabel>

            <Textarea
              id="remarks"
              placeholder="Enter additional remarks"
              rows={4}
              maxLength={500}
              disabled={loading}
              {...register("remarks")}
            />

            {errors.remarks && (
              <FieldError>{errors.remarks.message}</FieldError>
            )}
          </Field>

          {/* Root error */}
          {errors.root && (
            <p className="text-sm text-destructive">{errors.root.message}</p>
          )}

          {/* Actions */}
          <div className="flex justify-start gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader /> Adjusting...
                </>
              ) : (
                <>
                  <SlidersHorizontal /> Adjust Stock
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
