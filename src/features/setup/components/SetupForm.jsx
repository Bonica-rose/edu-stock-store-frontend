import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { setupSchema } from "../validations/setupSchema";
import { initializeSystem } from "../redux/setupThunks";
import PasswordInput from "@/shared/components/PasswordInput";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SetupForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector((state) => state.setup);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(setupSchema),
    });

    const onSubmit = async (data) => {
        // console.log(data);
        const result = await dispatch(initializeSystem(data));

        if (initializeSystem.fulfilled.match(result)) {
            toast.success(result.payload.message);

            navigate("/login", {
                replace: true,
            });

            return;
        }

        toast.error(result.payload?.message ?? "Unable to initialize system.");
    };

    return (
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-xl">
            Welcome to Edu Stock & Store
          </CardTitle>

          <CardDescription className="space-y-2 text-[13px]">
            <p>
              Complete the initial setup by creating your first branch and Super
              Administrator.
            </p>

            <p className="text-amber-600">
              This setup can only be performed once.
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Branch */}
            <div>
              <h3 className="mb-6 border-b pb-1 text-lg font-medium">
                Branch Information
              </h3>

              <div className="grid gap-5 md:grid-cols-2">
                <FormInput
                  label="Branch Name"
                  placeholder="Head Office"
                  register={register("branchName")}
                  error={errors.branchName?.message}
                />

                <FormInput
                  label="Branch Code"
                  placeholder="HO"
                  register={register("branchCode")}
                  error={errors.branchCode?.message}
                />

                <FormInput
                  label="Address"
                  placeholder="Ex: Street No. / Building, Road"
                  register={register("address")}
                  error={errors.address?.message}
                />

                <FormInput
                  label="City"
                  placeholder="Trivandrum"
                  register={register("city")}
                  error={errors.city?.message}
                />

                <FormInput
                  label="State"
                  placeholder="Kerala"
                  register={register("state")}
                  error={errors.state?.message}
                />

                <FormInput
                  label="Country"
                  placeholder="India"
                  register={register("country")}
                  error={errors.country?.message}
                />
              </div>
            </div>

            {/* Admin */}
            <div>
              <h3 className="mb-6 border-b pb-1 text-lg font-medium">
                Super Administrator
              </h3>

              <div className="grid gap-5 md:grid-cols-2">
                <FormInput
                  label="First Name"
                  placeholder="Ex: Amy"
                  register={register("firstName")}
                  error={errors.firstName?.message}
                />

                <FormInput
                  label="Last Name"
                  placeholder="Ex: Thomas P"
                  register={register("lastName")}
                  error={errors.lastName?.message}
                />

                <FormInput
                  label="Email"
                  type="email"
                  placeholder="Ex: amy.12@edustock.com"
                  register={register("email")}
                  error={errors.email?.message}
                />

                <div className="space-y-2">
                  <Label>
                    Password <span className="text-destructive">*</span>
                  </Label>

                  <PasswordInput
                    id="password"
                    register={register("password")}
                    error={errors.password?.message}
                    placeholder="Your Account Password"
                  />

                  {errors.password && (
                    <p className="text-sm text-destructive">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>
                    Confirm Password <span className="text-destructive">*</span>
                  </Label>

                  <PasswordInput
                    id="confirmPassword"
                    register={register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                    placeholder="Confirm password"
                    disablePaste
                  />

                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={loading.initialize}
                className="min-w-48"
              >
                {loading.initialize ? "Initializing..." : "Initialize System"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
}

function FormInput({label, register, error, type = "text", placeholder = "" }) {
    return (
        <div className="space-y-2">
            <Label>
                {label}
                <span className="text-destructive">*</span>
            </Label>

            <Input
                type={type}
                placeholder={placeholder}
                {...register}
                className={`${error ? "border-destructive" : ""}`}
            />

            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}
