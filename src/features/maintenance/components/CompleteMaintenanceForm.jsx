import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, CheckCircle } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import SearchableSelect from "@/shared/components/SearchableSelect";
import { completeMaintenance } from "../redux/maintenanceThunks";
import useMaintenanceFormOptions from "../utils/useMaintenanceFormOptions";
import { completeMaintenanceSchema } from "../validations/maintenanceSchema";
import { ASSET_CONDITION_OPTIONS } from "../utils/maintenanceConstants";

export default function CompleteMaintenanceForm({
    open,
    onOpenChange,
    maintenance,
}) {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.maintenance);
    const { vendors, loading: optionsLoading } = useMaintenanceFormOptions();

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(completeMaintenanceSchema),

        defaultValues: {
            repairNotes: "",
            partsReplaced: "",
            repairCost: "",
            vendor: "",
            assetCondition: "",
        },
    });

    useEffect(() => {
        if (open) {
        reset({
            repairNotes: maintenance?.repairNotes ?? "",
            partsReplaced: maintenance?.partsReplaced ?? "",
            repairCost: maintenance?.repairCost ?? "",
            vendor: maintenance?.vendor?._id ?? "",
            assetCondition: maintenance?.asset?.condition === "Damaged" ? "Damaged" : "",
        });
        }
    }, [open, maintenance, reset]);

    const handleComplete = async (data) => {
        try {
            const completionData = {
                ...data,
                // Empty optional values should be sent as null
                repairCost: data.repairCost === "" ? null : Number(data.repairCost),
                partsReplaced: data.partsReplaced?.trim() || null,
                vendor: data.vendor || null,
            };

            await dispatch(
                completeMaintenance({
                    id: maintenance._id,
                    completionData,
                }),
            ).unwrap();

            toast.success("Maintenance completed successfully.");
            onOpenChange(false);
        } catch (error) {
        toast.error(error?.message ?? "Failed to complete maintenance.");
        }
    };

    const handleClose = (value) => {
        if (!value) {
            reset({
                repairNotes: "",
                partsReplaced: "",
                repairCost: "",
                vendor: "",
                assetCondition: "",
            });
        }

        onOpenChange(value);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Complete Maintenance
            </DialogTitle>

            <DialogDescription>
                Enter the repair details and final asset condition before completing
                this maintenance.
            </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleComplete)} className="space-y-5">
            {/* Maintenance / Asset Summary */}
            <div className="rounded-lg border bg-muted/30 p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Maintenance</p>

                    <p className="font-medium">
                    {maintenance?.maintenanceId ?? "—"}
                    </p>
                </div>

                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Asset</p>

                    <p className="font-medium">
                    {maintenance?.asset?.assetCode ?? "—"}
                    {" - "}
                    {maintenance?.asset?.inventory?.itemName ?? "—"}
                    </p>
                </div>
                </div>
            </div>

            {/* Repair Notes */}
            <Field>
                <FieldLabel htmlFor="repairNotes">
                Repair Notes <span className="text-destructive">*</span>
                </FieldLabel>

                <Textarea
                id="repairNotes"
                {...register("repairNotes")}
                placeholder="Describe the repair performed..."
                rows={5}
                maxLength={1000}
                aria-invalid={!!errors.repairNotes}
                />

                <FieldError>{errors.repairNotes?.message}</FieldError>

                <p className="text-[13px] text-muted-foreground">
                Maximum 1000 characters.
                </p>
            </Field>

            {/* Parts Replaced */}
            <Field>
                <FieldLabel htmlFor="partsReplaced">Parts Replaced</FieldLabel>

                <Textarea
                id="partsReplaced"
                {...register("partsReplaced")}
                placeholder="Enter parts replaced, if any"
                rows={3}
                maxLength={500}
                aria-invalid={!!errors.partsReplaced}
                />

                <FieldError>{errors.partsReplaced?.message}</FieldError>
            </Field>

            {/* Repair Cost */}
            <Field>
                <FieldLabel htmlFor="repairCost">Repair Cost</FieldLabel>

                <Input
                id="repairCost"
                type="number"
                min="0"
                step="0.01"
                {...register("repairCost")}
                placeholder="0.00"
                aria-invalid={!!errors.repairCost}
                />

                <FieldError>{errors.repairCost?.message}</FieldError>
            </Field>

            {/* Vendor */}
            <Field>
                <FieldLabel>Vendor</FieldLabel>

                <Controller
                name="vendor"
                control={control}
                render={({ field }) => (
                    <SearchableSelect
                    value={field.value}
                    onValueChange={field.onChange}
                    options={vendors.map((vendor) => ({
                        value: vendor._id,
                        label: `${vendor.vendorCode} - ${vendor.vendorName}`,
                    }))}
                    placeholder="Search vendor..."
                    searchPlaceholder="Search vendor..."
                    emptyMessage="No vendors found."
                    disabled={optionsLoading}
                    error={!!errors.vendor}
                    />
                )}
                />

                <FieldError>{errors.vendor?.message}</FieldError>
            </Field>

            {/* Asset Condition */}
            <Field>
                <FieldLabel htmlFor="assetCondition">
                Asset Condition <span className="text-destructive">*</span>
                </FieldLabel>

                <Controller
                name="assetCondition"
                control={control}
                render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                        id="assetCondition"
                        className="w-full"
                        aria-invalid={!!errors.assetCondition}
                    >
                        <SelectValue placeholder="Select asset condition" />
                    </SelectTrigger>

                    <SelectContent>
                        {ASSET_CONDITION_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                )}
                />

                <FieldError>{errors.assetCondition?.message}</FieldError>

                <p className="text-[13px] text-muted-foreground">
                The selected condition will be applied to the asset when
                maintenance is completed.
                </p>
            </Field>

            <DialogFooter>
                <Button
                type="button"
                variant="outline"
                disabled={loading.complete}
                onClick={() => handleClose(false)}
                >
                Cancel
                </Button>

                <Button
                type="submit"
                disabled={loading.complete || optionsLoading}
                className="gap-2"
                >
                {loading.complete ? (
                    <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Completing...
                    </>
                ) : (
                    <>
                    <CheckCircle className="h-4 w-4" />
                    Complete Maintenance
                    </>
                )}
                </Button>
            </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>
    );
}
