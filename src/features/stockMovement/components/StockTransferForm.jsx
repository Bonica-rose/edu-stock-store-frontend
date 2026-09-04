import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { stockTransferSchema } from "../validations/movementSchema";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import SearchableSelect from "@/shared/components/SearchableSelect";
import useStockMovementFormOptions from "../utils/useStockMovementFormOptions";
import { Card, CardContent } from "@/components/ui/card";
import { MoveHorizontal } from "lucide-react";
import Loader from "@/shared/components/Loader";

const defaultValues = {
  inventory: "",
  toBranch: "",
  quantity: "",
  remarks: "",
};

export default function StockTransferForm({
  onSubmit,
  onCancel,
  loading = false,
}) {
  const { inventories = [], branches = [] } = useStockMovementFormOptions();
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [destinationInventory, setDestinationInventory] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(stockTransferSchema),
    defaultValues,
  });

  const inventoryId = watch("inventory");
  const toBranch = watch("toBranch");
  const quantity = watch("quantity");

  // Selected source inventory
  useEffect(() => {
    if (!inventoryId) {
      setSelectedInventory(null);
      return;
    }

    const inventory = inventories.find((item) => item._id === inventoryId);

    setSelectedInventory(inventory ?? null);
  }, [inventoryId, inventories]);

  // About destination inventory
  useEffect(() => {
      if (!selectedInventory || !toBranch) {
          setDestinationInventory(null);
          return;
      }

      const inventory = inventories.find(
      (item) =>
          item.sku === selectedInventory.sku &&
          item.branch?._id === toBranch,
      );

      setDestinationInventory(inventory ?? null);
  }, [selectedInventory, toBranch, inventories]);

  const inventoryOptions = inventories
    .filter((inventory) => inventory.currentStock > 0)
    .map((inventory) => ({
      value: inventory._id,
      label: `${inventory.sku} - ${inventory.itemName}`,
    }));

  // Do not allow transferring to the same branch.
  const destinationBranches = branches.filter(
    (branch) => branch._id !== selectedInventory?.branch?._id,
  );

  const branchOptions = destinationBranches.map((branch) => ({
    value: branch._id,
    label: branch.branchName,
  }));

  const currentStock = selectedInventory?.currentStock ?? 0;
  console.log("Submitting stock transfer form:", destinationInventory);

  const submitForm = async (data) => {
    // Frontend stock validation
    if (Number(data.quantity) > currentStock) {
      setError("quantity", {
        type: "manual",
        message: `Only ${currentStock} units are available.`,
      });

      return;
    }    

    try {
      await onSubmit({
        inventory: data.inventory,
        toBranch: data.toBranch,
        quantity: Number(data.quantity),
        remarks: data.remarks?.trim() || undefined,
      });

      reset(defaultValues);
    } catch (error) {
      if (error?.errors) {
        Object.entries(error.errors).forEach(([field, message]) => {
          setError(field, {
            type: "server",
            message: typeof message === "string" ? message : message?.message,
          });
        });
      } else {
        setError("root", {
          type: "server",
          message:
            error?.message || "Failed to transfer stock. Please try again.",
        });
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <form
          onSubmit={handleSubmit(submitForm)}
          className="max-w-2xl space-y-5"
        >
          {/* SOURCE INVENTORY */}
          <Field>
            <FieldLabel htmlFor="inventory">
              Source Inventory <span className="text-destructive">*</span>
            </FieldLabel>

            <Controller
              name="inventory"
              control={control}
              render={({ field }) => (
                <SearchableSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  options={inventoryOptions}
                  placeholder="Select source inventory"
                  searchPlaceholder="Search inventory..."
                  emptyMessage="No inventory found."
                  aria-invalid={!!errors.inventory}
                />
              )}
            />

            {errors.inventory && (
              <FieldError>{errors.inventory.message}</FieldError>
            )}
          </Field>

          {/* SOURCE STOCK INFORMATION */}
          {selectedInventory && (
            <div className="rounded-md border border-blue-100 bg-blue-500/10 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Item</p>

                  <p className="font-medium">{selectedInventory.itemName}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Source Branch</p>

                  <p className="font-medium">
                    {selectedInventory.branch?.branchName ?? "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Available Stock
                  </p>

                  <p className="text-lg font-semibold">
                    {currentStock} {selectedInventory.unit ?? "units"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">SKU</p>

                  <p className="font-medium">{selectedInventory.sku}</p>
                </div>
              </div>
            </div>
          )}

          {/* DESTINATION BRANCH */}
          <div className="space-y-2">
            <FieldLabel htmlFor="toBranch">
              Destination Branch <span className="text-destructive">*</span>
            </FieldLabel>

            <Controller
              name="toBranch"
              control={control}
              render={({ field }) => (
                <SearchableSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  options={branchOptions}
                  placeholder="Select destination branch"
                  searchPlaceholder="Search branch..."
                  emptyMessage="No branch found."
                  disabled={loading}
                />
              )}
            />

            {errors.toBranch && (
              <p className="text-sm text-destructive">
                {errors.toBranch.message}
              </p>
            )}
          </div>

          {/* DESTINATION INVENTORY STATUS */}
          {selectedInventory && toBranch && (
            <div
              className={`rounded-md border p-4 ${
                !destinationInventory
                  ? "border-yellow-100/80 bg-yellow-500/20"
                  : "border-lime-100/70 bg-lime-500/20"
              }`}
            >
              {destinationInventory ? (
                <div>
                  <p className="text-sm font-medium">
                    Destination inventory found
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {destinationInventory.sku} - {destinationInventory.itemName}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Current stock: {destinationInventory.currentStock}{" "}
                    {destinationInventory.unit ?? "units"}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium">
                    Inventory will be created automatically
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {selectedInventory.sku} - {selectedInventory.itemName}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    This item does not currently exist in the selected branch.
                    It will be created automatically when the transfer is
                    completed.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* QUANTITY */}
          <Field>
            <FieldLabel htmlFor="quantity">
              Quantity <span className="text-destructive">*</span>
            </FieldLabel>

            <Input
              id="quantity"
              type="number"
              min="1"
              max={currentStock || undefined}
              placeholder="Enter quantity"
              disabled={!selectedInventory}
              {...register("quantity")}
            />

            {selectedInventory && (
              <p className="text-xs text-muted-foreground">
                Available stock: {currentStock}
              </p>
            )}

            {errors.quantity && (
              <FieldError>{errors.quantity.message}</FieldError>
            )}
          </Field>

          {/* REMARKS */}
          <Field>
            <FieldLabel htmlFor="remarks">Remarks</FieldLabel>

            <Textarea
              id="remarks"
              placeholder="Enter additional remarks"
              rows={4}
              {...register("remarks")}
            />

            {errors.remarks && (
              <FieldError>{errors.remarks.message}</FieldError>
            )}
          </Field>

          {/* ROOT ERROR */}
          {errors.root && (
            <p className="text-sm text-destructive">{errors.root.message}</p>
          )}

          {/* ACTIONS */}
          <div className="flex justify-start gap-3">
            <Button
              type="submit"
              disabled={loading || !selectedInventory || !toBranch}
            >
              {loading ? (
                <>
                  <Loader /> Transferring...
                </>
              ) : (
                <>
                  <MoveHorizontal /> Transfer Stock
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
