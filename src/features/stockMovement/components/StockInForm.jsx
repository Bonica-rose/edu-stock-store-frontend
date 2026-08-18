import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PackagePlus } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { stockInSchema } from "../validations/movementSchema";
import SearchableSelect from "@/shared/components/SearchableSelect";
import useStockMovementFormOptions from "../utils/useStockMovementFormOptions";
import Loader from "@/shared/components/Loader";

const REASON_OPTIONS = [
  {
    value: "Purchase",
    label: "Purchase",
  },
  {
    value: "Return",
    label: "Return",
  },
  {
    value: "Found",
    label: "Found",
  },
  {
    value: "Other",
    label: "Other",
  },
];

export default function StockInForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}) {
  const { inventories = [] } = useStockMovementFormOptions();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(stockInSchema),

    defaultValues: {
      inventory: "",
      quantity: "",
      reason: "",
      purchasePrice: "",
      remarks: "",
    },
  });

  const selectedReason = watch("reason");

  useEffect(() => {
    if (initialData) {
      reset({
        inventory: initialData.inventory?._id ?? "",
        quantity: initialData.quantity ?? "",
        reason: initialData.reason ?? "",
        purchasePrice: initialData.purchasePrice ?? "",
        remarks: initialData.remarks ?? "",
      });
    }
  }, [initialData, reset]);

  const inventoryOptions = inventories.map((inventory) => ({
    value: inventory._id,
    label: `${inventory.sku} - ${inventory.itemName}`,
  }));

  const submitForm = async (data) => {
    try {
      const payload = {
        inventory: data.inventory,
        quantity: Number(data.quantity),
        reason: data.reason,
        remarks: data.remarks?.trim() || undefined,
      };

      if (
        data.reason === "Purchase" &&
        data.purchasePrice !== "" &&
        data.purchasePrice != null
      ) {
        payload.purchasePrice = Number(data.purchasePrice);
      }

      await onSubmit(payload);
    } catch (error) {
      if (error?.errors) {
        Object.entries(error.errors).forEach(([field, message]) => {
          setError(field, {
            type: "server",
            message: typeof message === "string" ? message : message?.message,
          });
        });
      } else {
        setError("root.server", {
          type: "server",
          message: error?.message || "Failed to add stock.",
        });
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
          {/* INVENTORY */}
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
                  aria-invalid={!!errors.inventory}
                />
              )}
            />

            {errors.inventory && (
              <FieldError>{errors.inventory.message}</FieldError>
            )}
          </Field>

          {/* QUANTITY */}
          <Field>
            <FieldLabel htmlFor="quantity">
              Quantity <span className="text-destructive">*</span>
            </FieldLabel>

            <Input
              id="quantity"
              type="number"
              min="1"
              step="1"
              placeholder="Enter quantity"
              disabled={loading}
              {...register("quantity")}
              aria-invalid={!!errors.quantity}
            />

            {errors.quantity && (
              <FieldError>{errors.quantity.message}</FieldError>
            )}
          </Field>

          {/* REASON */}
          <Field>
            <FieldLabel>
              Reason <span className="text-destructive">*</span>
            </FieldLabel>

            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <SearchableSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  options={REASON_OPTIONS}
                  placeholder="Select reason"
                  searchPlaceholder="Search reason..."
                  emptyMessage="No reason found."
                  disabled={loading}
                />
              )}
            />

            {errors.reason && <FieldError>{errors.reason.message}</FieldError>}
          </Field>

          {/* PURCHASE PRICE */}
          {selectedReason === "Purchase" && (
            <Field>
              <FieldLabel htmlFor="purchasePrice">Purchase Price</FieldLabel>

              <Input
                id="purchasePrice"
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter purchase price"
                disabled={loading}
                {...register("purchasePrice")}
              />

              {errors.purchasePrice && (
                <FieldError>{errors.purchasePrice.message}</FieldError>
              )}
            </Field>
          )}

          {/* REMARKS */}
          <Field>
            <FieldLabel htmlFor="remarks">Remarks</FieldLabel>

            <Textarea
              id="remarks"
              placeholder="Enter remarks"
              rows={4}
              disabled={loading}
              {...register("remarks")}
            />

            {errors.remarks && (
              <FieldError>{errors.remarks.message}</FieldError>
            )}
          </Field>

          {/* SERVER ERROR */}
          {errors.root?.server && (
            <p className="text-sm text-destructive">
              {errors.root.server.message}
            </p>
          )}

          {/* ACTIONS */}
          <div className="flex justify-start gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader /> Adding...
                </>
              ) : (
                <>
                  <PackagePlus /> Add Stock
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
