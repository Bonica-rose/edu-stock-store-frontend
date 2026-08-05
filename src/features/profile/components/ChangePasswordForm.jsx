import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { changePasswordSchema } from "../validations/changePasswordSchema";
import { changePassword } from "../redux/profileThunks";
import { resetAuthState } from "@/features/auth/redux/authSlice";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import PasswordInput from "@/shared/components/PasswordInput";

export default function ChangePasswordForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.profile);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data) => {
        const result = await dispatch(changePassword(data));

        if (changePassword.fulfilled.match(result)) {
            toast.success("Password changed successfully. Please sign in again.");
            dispatch(resetAuthState());
            navigate("/login", { replace: true, });
        } else {
            toast.error(result.payload?.message || "Unable to change password.");
        }
    };

    return (
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>

              <PasswordInput
                id="currentPassword"
                register={register("currentPassword")}
                error={errors.currentPassword}
              />

              {errors.currentPassword && (
                <p className="text-sm text-destructive">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>

              <PasswordInput
                id="newPassword"
                register={register("newPassword")}
                error={errors.newPassword}
              />
              {errors.newPassword && (
                <p className="text-sm text-destructive">
                  {errors.newPassword.message}
                </p>
              )}
              <p className="text-[13px] text-muted-foreground">
                Password must contain:
              </p>

              <ul className="ml-5 list-disc text-[13px] text-muted-foreground">
                <li>Minimum 8 characters</li>
                <li>One uppercase letter</li>
                <li>One lowercase letter</li>
                <li>One number</li>
                <li>One special character</li>
              </ul>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>

              <PasswordInput
                id="confirmPassword"
                register={register("confirmPassword")}
                error={errors.confirmPassword}
                disablePaste
              />

              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading.changePassword}>
                {loading.changePassword ? "Changing..." : "Change Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
}
