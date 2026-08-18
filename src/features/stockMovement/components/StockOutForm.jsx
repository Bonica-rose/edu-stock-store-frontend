import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import SearchableSelect from "@/shared/components/SearchableSelect";
import useStockMovementFormOptions from "../utils/useStockMovementFormOptions";
import { stockOutSchema } from "../validations/movementSchema";
import { PackageMinus } from "lucide-react";
import Loader from "@/shared/components/Loader";

const defaultValues = {
    inventory: "",
    quantity: "",
    reason: "",
    remarks: "",
};

export default function StockOutForm({ onSubmit, onCancel, loading = false }) {
    const { inventories = [] } = useStockMovementFormOptions();

    const [selectedInventory, setSelectedInventory] = useState(null);

    const {
        register,
        control,
        handleSubmit,
        setError,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(stockOutSchema),
        defaultValues,
    });

    const inventoryId = watch("inventory");
    const quantity = watch("quantity");

    // Find selected inventory
    useEffect(() => {
        if (!inventoryId) {
            setSelectedInventory(null);
            return;
        }

        const inventory = inventories.find((item) => item._id === inventoryId);

        setSelectedInventory(inventory ?? null);
    }, [inventoryId, inventories]);

    const inventoryOptions = inventories.map((inventory) => ({
        value: inventory._id,
        label: `${inventory.sku} - ${inventory.itemName}`,
    }));

    const currentStock = selectedInventory?.currentStock ?? 0;

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
                quantity: Number(data.quantity),
                reason: data.reason.trim(),
                remarks: data.remarks?.trim() || undefined,
            });

            reset(defaultValues);
        } catch (error) {
            // Backend validation / business errors
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
                    message: error?.message || "Failed to issue stock. Please try again.",
                });
            }
        }
    };

    return (
        <Card>
            <CardContent>
            <form
                onSubmit={handleSubmit(submitForm)}
                className="max-w-2xl space-y-6"
            >
                {/* INVENTORY */}
                <div className="space-y-2">
                <Field>
                    <FieldLabel htmlFor="inventory">
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
                        />
                    )}
                    />

                    {errors.inventory && (
                    <FieldError>{errors.inventory.message}</FieldError>
                    )}
                </Field>
                </div>

                {/* CURRENT STOCK */}
                {selectedInventory && (
                <div className="rounded-md border bg-muted/30 p-4">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">
                        Current Stock
                        </p>

                        <p className="text-lg font-semibold">
                        {currentStock} {selectedInventory.unit ?? "units"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">Item</p>

                        <p className="font-medium">{selectedInventory.itemName}</p>
                    </div>
                    </div>
                </div>
                )}

                {/* QUANTITY */}
                <div className="space-y-2">
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
                </div>

                {/* REASON */}
                <div className="space-y-2">
                <Field>
                    <FieldLabel htmlFor="reason">
                    Reason <span className="text-destructive">*</span>
                    </FieldLabel>

                    <Input
                    id="reason"
                    placeholder="Enter reason for stock out"
                    {...register("reason")}
                    />

                    {errors.reason && (
                    <FieldError>{errors.reason.message}</FieldError>
                    )}
                </Field>
                </div>

                {/* REMARKS */}
                <div className="space-y-2">
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
                </div>

                {/* ROOT ERROR */}
                {errors.root && (
                <p className="text-sm text-destructive">{errors.root.message}</p>
                )}

                {/* ACTIONS */}
                <div className="flex justify-start gap-3">
                    <Button type="submit" disabled={loading}>
                        {loading ? (
                        <>
                            <Loader /> Issuing...
                        </>
                        ) : (
                        <>
                            <PackageMinus /> Issue Stock
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
