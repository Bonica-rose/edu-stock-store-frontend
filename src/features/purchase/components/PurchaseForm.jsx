import { useMemo } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";

import purchaseSchema from "../validations/purchaseSchema";

import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import DatePicker from "@/shared/components/DatePicker";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultValues = {
  vendor: "",
  branch: "",
  purchaseDate: new Date().toISOString().split("T")[0],
  items: [
    {
      inventory: "",
      quantity: 1,
      purchasePrice: 0,
    },
  ],
  notes: "",
};

const PurchaseForm = ({
  vendors = [],
  branches = [],
  inventories = [],
  initialData = null,
  onSubmit,
  isSubmitting = false,
  branchDisabled = false,
}) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(purchaseSchema),
    defaultValues: initialData
      ? {
          vendor: initialData.vendor?._id ?? initialData.vendor ?? "",
          branch: initialData.branch?._id ?? initialData.branch ?? "",
          purchaseDate: initialData.purchaseDate
            ? new Date(initialData.purchaseDate).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          items: initialData.items?.map((item) => ({
            inventory: item.inventory?._id ?? item.inventory ?? "",
            quantity: item.quantity ?? 1,
            purchasePrice: item.purchasePrice ?? 0,
          })) ?? [
            {
              inventory: "",
              quantity: 1,
              purchasePrice: 0,
            },
          ],
          notes: initialData.notes ?? "",
        }
      : defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const selectedVendor = useWatch({
    control,
    name: "vendor",
  });

  const selectedBranch = useWatch({
    control,
    name: "branch",
  });

  const watchedItems = useWatch({
    control,
    name: "items",
  });

  const totalAmount = useMemo(() => {
    return watchedItems?.reduce((total, item) => {
      const quantity = Number(item?.quantity) || 0;
      const purchasePrice = Number(item?.purchasePrice) || 0;

      return total + quantity * purchasePrice;
    }, 0);
  }, [watchedItems]);

  const filteredInventories = useMemo(() => {
    if (!selectedBranch) {
      return [];
    }

    return inventories.filter((inventory) => {
      const inventoryBranch = inventory.branch?._id ?? inventory.branch;

      return String(inventoryBranch) === String(selectedBranch);
    });
  }, [inventories, selectedBranch]);

  console.log("filteredInventories: ", filteredInventories);
  

  const selectedInventoryIds = useMemo(() => {
    return new Set(watchedItems?.map((item) => item.inventory).filter(Boolean));
  }, [watchedItems]);

  const handleBranchChange = (value) => {
    setValue("branch", value, {
      shouldValidate: true,
      shouldDirty: true,
    });

    // Inventory belongs to a branch.
    // Reset items when branch changes.
    setValue("items", [
      {
        inventory: "",
        quantity: 1,
        purchasePrice: 0,
      },
    ]);
  };

  const addItem = () => {
    append({
      inventory: "",
      quantity: 1,
      purchasePrice: 0,
    });
  };

  const removeItem = (index) => {
    if (fields.length === 1) {
      return;
    }

    remove(index);
  };

  const submitForm = async (data) => {
    try {
      const payload = {
        ...data,
        items: data.items.map((item) => ({
          inventory: item.inventory,
          quantity: Number(item.quantity),
          purchasePrice: Number(item.purchasePrice),
        })),
      };

      await onSubmit(payload);
    } catch (error) {
      if (error.errors?.length) {
        error.errors.forEach((err) => {
          // Convert express-validator paths such as:
          // items[0].quantity
          // into RHF paths:
          // items.0.quantity
          const fieldPath = err.path?.replace(/\[(\d+)\]/g, ".$1");

          if (fieldPath) {
            setError(fieldPath, {
              type: "server",
              message: err.msg,
            });
          }
        });

        return;
      }

      toast.error(error.message ?? "Failed to create purchase");
    }
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
          {/* Purchase Information */}
          <section className="space-y-4">
            <div>
              <h2 className="text-[17px] font-semibold text-blue-900">
                Purchase Information
              </h2>

              <p className="text-[13px] text-muted-foreground">
                Enter the basic purchase information.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Vendor */}
              <Field>
                <FieldLabel htmlFor="vendor">
                  Vendor <span className="text-destructive">*</span>
                </FieldLabel>

                <Select
                  value={selectedVendor || ""}
                  onValueChange={(value) =>
                    setValue("vendor", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                >
                  <SelectTrigger id="vendor" aria-invalid={!!errors.vendor}>
                    <SelectValue placeholder="Select vendor">
                      {vendors.find((v) => v._id === selectedVendor)
                        ?.vendorName ?? "Select vendor"}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor._id} value={vendor._id}>
                        {vendor.vendorName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.vendor && (
                  <FieldError>{errors.vendor.message}</FieldError>
                )}
              </Field>

              {/* Branch */}
              <Field>
                <FieldLabel htmlFor="branch">
                  Branch <span className="text-destructive">*</span>
                </FieldLabel>

                <Select
                  value={selectedBranch || ""}
                  onValueChange={handleBranchChange}
                  disabled={branchDisabled}
                >
                  <SelectTrigger id="branch" aria-invalid={!!errors.branch}>
                    <SelectValue placeholder="Select branch">
                      {branches.find((b) => b._id === selectedBranch)
                        ?.branchName ?? "Select branch"}
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

                {errors.branch && (
                  <FieldError>{errors.branch.message}</FieldError>
                )}
              </Field>

              {/* Purchase Date */}
              <Field>
                <FieldLabel htmlFor="purchaseDate">Purchase Date</FieldLabel>

                <Controller
                  name="purchaseDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Select purchase date"
                    />
                  )}
                />

                {errors.purchaseDate && (
                  <FieldError>{errors.purchaseDate.message}</FieldError>
                )}
              </Field>
            </div>
          </section>

          {/* Purchase Items */}
          <section className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[17px] font-semibold text-blue-900">
                  Purchase Items
                </h2>

                <p className="text-[13px] text-muted-foreground">
                  Add the inventory items included in this purchase.
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={addItem}
                disabled={!selectedBranch}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Item
              </Button>
            </div>

            {!selectedBranch && (
              <p className="text-sm text-muted-foreground">
                Please select a branch before adding inventory items.
              </p>
            )}

            <div className="space-y-4">
              {fields.map((field, index) => {
                const quantity = Number(watchedItems?.[index]?.quantity) || 0;

                const purchasePrice =
                  Number(watchedItems?.[index]?.purchasePrice) || 0;

                const lineTotal = quantity * purchasePrice;

                const itemErrors = errors.items?.[index];

                const selectedInventory = filteredInventories.find(
                  (inventory) =>
                    inventory._id === watchedItems?.[index]?.inventory,
                );

                return (
                  <div key={field.id} className="rounded-lg border p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-sm font-medium">Item {index + 1}</h3>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(index)}
                        disabled={fields.length === 1}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                      {/* Inventory */}
                      <Field className="md:col-span-2">
                        <FieldLabel htmlFor={`items-${index}-inventory`}>
                          Inventory <span className="text-destructive">*</span>
                        </FieldLabel>

                        <Select
                          value={watchedItems?.[index]?.inventory || ""}
                          onValueChange={(value) =>
                            setValue(`items.${index}.inventory`, value, {
                              shouldValidate: true,
                              shouldDirty: true,
                            })
                          }
                          disabled={!selectedBranch}
                        >
                          <SelectTrigger
                            id={`items-${index}-inventory`}
                            aria-invalid={!!itemErrors?.inventory}
                          >
                            <SelectValue placeholder="Select inventory">
                              {selectedInventory
                                ? `${selectedInventory.sku} - ${selectedInventory.itemName} (${selectedInventory.unit})`
                                : "Select inventory"}
                            </SelectValue>
                          </SelectTrigger>

                          <SelectContent>
                            {filteredInventories.length === 0 ? (
                              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                No inventory available
                              </div>
                            ) : (
                              filteredInventories.map((inventory) => {
                                const isAlreadySelected =
                                  selectedInventoryIds.has(inventory._id) &&
                                  watchedItems?.[index]?.inventory !==
                                    inventory._id;

                                return (
                                  <SelectItem
                                    key={inventory._id}
                                    value={inventory._id}
                                    disabled={isAlreadySelected}
                                  >
                                    {inventory.sku} - {inventory.itemName} (
                                    {inventory.unit})
                                  </SelectItem>
                                );
                              })
                            )}
                          </SelectContent>
                        </Select>

                        {itemErrors?.inventory && (
                          <FieldError>
                            {itemErrors.inventory.message}
                          </FieldError>
                        )}
                      </Field>

                      {/* Quantity */}
                      <Field>
                        <FieldLabel htmlFor={`items-${index}-quantity`}>
                          Quantity <span className="text-destructive">*</span>
                        </FieldLabel>
                        <div className="flex items-center gap-2">
                          <Input
                            id={`items-${index}-quantity`}
                            type="number"
                            min="1"
                            step="1"
                            {...register(`items.${index}.quantity`)}
                            aria-invalid={!!itemErrors?.quantity}
                          />
                          {selectedInventory?.unit && (
                            <span className="text-sm text-muted-foreground whitespace-nowrap">
                              {selectedInventory.unit}
                            </span>
                          )}
                        </div>

                        {itemErrors?.quantity && (
                          <FieldError>{itemErrors.quantity.message}</FieldError>
                        )}
                      </Field>

                      {/* Purchase Price */}
                      <Field>
                        <FieldLabel htmlFor={`items-${index}-purchasePrice`}>
                          Purchase Price Per Unit
                          <span className="text-destructive">*</span>
                        </FieldLabel>

                        <Input
                          id={`items-${index}-purchasePrice`}
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          {...register(`items.${index}.purchasePrice`)}
                          aria-invalid={!!itemErrors?.purchasePrice}
                        />

                        {itemErrors?.purchasePrice && (
                          <FieldError>
                            {itemErrors.purchasePrice.message}
                          </FieldError>
                        )}
                      </Field>
                    </div>

                    {/* Line Total */}
                    <div className="mt-4 flex justify-end border-t pt-3">
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Line Total:
                        </span>{" "}
                        <span className="font-semibold">
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            minimumFractionDigits: 2,
                          }).format(lineTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {errors.items?.root?.message && (
              <FieldError>{errors.items.root.message}</FieldError>
            )}
          </section>

          {/* Total */}
          <section className="flex justify-end">
            <div className="min-w-64 rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center justify-between gap-6">
                <span className="text-sm font-medium">Total Amount</span>

                <span className="text-lg font-semibold text-blue-900">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 2,
                  }).format(totalAmount)}
                </span>
              </div>
            </div>
          </section>

          {/* Notes */}
          <section className="space-y-4">
            <div>
              <h2 className="text-[17px] font-semibold text-blue-900">
                Additional Information
              </h2>

              <p className="text-[13px] text-muted-foreground">
                Add any additional notes about this purchase.
              </p>
            </div>

            <Field>
              <FieldLabel htmlFor="notes">Notes</FieldLabel>

              <Textarea
                id="notes"
                placeholder="Enter purchase notes"
                rows={4}
                maxLength={500}
                {...register("notes")}
                aria-invalid={!!errors.notes}
              />

              {errors.notes && <FieldError>{errors.notes.message}</FieldError>}
            </Field>
          </section>

          {/* Actions */}
          <div className="flex justify-start gap-2 pt-1">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Create Purchase
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PurchaseForm;
