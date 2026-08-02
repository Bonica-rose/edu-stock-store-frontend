import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import { systemSettingsSchema } from "../validations/systemSettingsSchema";
import { updateSettings } from "../redux/settingsThunks";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { Pencil, Save, X } from "lucide-react";

export default function SystemSettingsCard() {
    const dispatch = useDispatch();

    const { settings, loading } = useSelector((state) => state.settings);
    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(systemSettingsSchema),
        defaultValues: {
            defaultCurrency: "",
            timezone: "",
            dateFormat: "DD/MM/YYYY",
            isMaintenanceMode: false,
        },
    });

    useEffect(() => {
        if (!settings) return;

        reset({
            defaultCurrency: settings.defaultCurrency,
            timezone: settings.timezone,
            dateFormat: settings.dateFormat,
            isMaintenanceMode: settings.isMaintenanceMode,
        });
    }, [settings, reset]);

    const handleCancel = () => {
        reset();
        setIsEditing(false);
    };

    const onSubmit = async (data) => {
        // console.log("Form Data:", data); // Log the form data for debugging
        const result = await dispatch(updateSettings(data));

        if (updateSettings.fulfilled.match(result)) {
            toast.success(result.payload.message);
            setIsEditing(false);
        } else {
            toast.error(result.payload?.message ?? "Unable to update settings.");
        }
    };

    return (
        <Card className="rounded-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>System Settings</CardTitle>

                {!isEditing ? (
                <Button
                    type="button"
                    variant="outline"
                    className="rounded-sm"
                    onClick={() => setIsEditing(true)}
                >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                </Button>
                ) : (
                <div className="flex gap-2">
                    <Button
                    type="button"
                    variant="outline"
                    className="rounded-sm"
                    onClick={handleCancel}
                    >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                    </Button>

                    <Button
                    type="submit"
                    className="rounded-sm"
                    disabled={loading.update}
                    >
                    <Save className="mr-2 h-4 w-4" />

                    {loading.update ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
                )}
            </CardHeader>

            <CardContent className="mt-5 space-y-5">
                <div className="grid gap-4 md:grid-cols-3">                        
                    {/* Currency */}
                    <div className="space-y-2">
                        <Label>
                        Currency <span className="text-destructive">*</span>
                        </Label>

                        <Input
                        readOnly={!isEditing}
                        className="rounded-sm"
                        {...register("defaultCurrency")}
                        />

                        <p className="text-sm text-destructive">
                        {errors.defaultCurrency?.message}
                        </p>
                    </div>

                    {/* Timezone */}
                    <div className="space-y-2">
                        <Label>
                        Timezone <span className="text-destructive">*</span>
                        </Label>

                        <Input
                        readOnly={!isEditing}
                        className="rounded-sm"
                        {...register("timezone")}
                        />

                        <p className="text-sm text-destructive">
                        {errors.timezone?.message}
                        </p>
                    </div>

                    {/* Date Format */}
                    <div className="space-y-2">
                        <Label>
                        Date Format <span className="text-destructive">*</span>
                        </Label>

                        <Controller
                        control={control}
                        name="dateFormat"
                        render={({ field }) => (
                            <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={!isEditing}
                            >
                            <SelectTrigger className="rounded-sm">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>

                                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>

                                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                            </SelectContent>
                            </Select>
                        )}
                        />

                        <p className="text-sm text-destructive">
                        {errors.dateFormat?.message}
                        </p>
                    </div>
                </div>

                {/* Maintenance */}
                <div className="flex items-center justify-between rounded-sm border p-4">
                <div>
                    <Label>
                    Maintenance Mode <span className="text-destructive">*</span>
                    </Label>

                    <p className="text-sm text-muted-foreground">
                    Enable maintenance mode for the application.
                    </p>
                </div>

                <Controller
                    control={control}
                    name="isMaintenanceMode"
                    render={({ field }) => (
                    <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!isEditing}
                    />
                    )}
                />
                </div>
            </CardContent>
            </form>
        </Card>
    );
}
