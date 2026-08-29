import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import { inventorySettingsSchema } from "../validations/inventorySettingsSchema";
import { updateSettings } from "../redux/settingsThunks";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Pencil, Save, X } from "lucide-react";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function InventorySettingsCard() {
  const dispatch = useDispatch();
  const { hasPermission } = usePermission();

  const canUpdate = hasPermission(PERMISSIONS.SETTINGS_UPDATE);

  const { settings, loading } = useSelector((state) => state.settings);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(inventorySettingsSchema),
    defaultValues: {
      lowStockQuantityThreshold: 10,
      predictionAlertDays: 10,
      predictionHistoryDays: 30,
    },
  });

  useEffect(() => {
    if (!canUpdate && isEditing) {
      setIsEditing(false);
    }
  }, [canUpdate, isEditing]);

  useEffect(() => {
    if (!settings) return;

    reset({
      lowStockQuantityThreshold: settings.lowStockQuantityThreshold,
      predictionAlertDays: settings.predictionAlertDays,
      predictionHistoryDays: settings.predictionHistoryDays,
    });
  }, [settings, reset]);

  const handleCancel = () => {
    if (settings) {
      reset({
        lowStockQuantityThreshold: settings.lowStockQuantityThreshold,
        predictionAlertDays: settings.predictionAlertDays,
        predictionHistoryDays: settings.predictionHistoryDays,
      });
    }

    setIsEditing(false);
  };

  const onSubmit = async (data) => {
    const result = await dispatch(updateSettings(data));

    if (updateSettings.fulfilled.match(result)) {
      toast.success(result.payload.message);

      setIsEditing(false);
    } else {
      toast.error(result.payload?.message || "Unable to update settings.");
    }
  };

  return (
    <Card className="rounded-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className={`text-blue-900`}>Inventory Settings</CardTitle>

          {canUpdate && (
            <>
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
            </>
          )}
        </CardHeader>

        <CardContent className="mt-5 space-y-5">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Low Stock */}
            <div className="space-y-2">
              <Label htmlFor="lowStockQuantityThreshold">
                Low Stock Threshold <span className="text-destructive">*</span>
              </Label>

              <Input
                id="lowStockQuantityThreshold"
                type="number"
                className={`rounded-sm text-[15px] placeholder:text-sm  
                ${errors.lowStockQuantityThreshold ? "border-destructive" : ""}`}
                readOnly={!isEditing}
                {...register("lowStockQuantityThreshold", {
                  valueAsNumber: true,
                })}
              />

              <p className="text-sm text-destructive">
                {errors.lowStockQuantityThreshold?.message}
              </p>
            </div>

            {/* Prediction Alert */}
            <div className="space-y-2">
              <Label htmlFor="predictionAlertDays">
                Prediction Alert Days{" "}
                <span className="text-destructive">*</span>
              </Label>

              <Input
                id="predictionAlertDays"
                type="number"
                className={`rounded-sm text-[15px] placeholder:text-sm  
                  ${errors.predictionAlertDays ? "border-destructive" : ""}`}
                readOnly={!isEditing}
                {...register("predictionAlertDays", {
                  valueAsNumber: true,
                })}
              />

              <p className="text-sm text-destructive">
                {errors.predictionAlertDays?.message}
              </p>
            </div>

            {/* Prediction History */}
            <div className="space-y-2">
              <Label htmlFor="predictionHistoryDays">
                Prediction History Days{" "}
                <span className="text-destructive">*</span>
              </Label>

              <Input
                id="predictionHistoryDays"
                type="number"
                className={`rounded-sm text-[15px] placeholder:text-sm  
                  ${errors.predictionHistoryDays ? "border-destructive" : ""}`}
                readOnly={!isEditing}
                {...register("predictionHistoryDays", {
                  valueAsNumber: true,
                })}
              />

              <p className="text-sm text-destructive">
                {errors.predictionHistoryDays?.message}
              </p>
            </div>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
