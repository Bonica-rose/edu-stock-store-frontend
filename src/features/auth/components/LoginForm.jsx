import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { loginSchema } from "../validations/loginSchema";
import { loginUser } from "../redux/authThunks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Loader2, LogIn } from "lucide-react";

export default function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),

        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        const result = await dispatch(loginUser(data));

        if (loginUser.fulfilled.match(result)) {
            toast.success(result.payload.message);

            if (result.payload.data.mustChangePassword) {
                navigate("/edu/change-password",{
                    replace: true,
                });
            } else {
                navigate("/edu/dashboard", {
                    replace: true,
                });
            }

            return;
        }

        toast.error(result.payload.message);
    };

    return (
      <Card className="w-full max-w-md p-3 shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">Sign In</CardTitle>

          <CardDescription className="text-[13px] text-muted-foreground">
            Enter your email and password to continue.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />

                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>

                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  aria-invalid={!!errors.password}
                  {...register("password")}
                />

                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-2 justify-end hidden">
              {/* Future make it visible: mt-2 flex justify-end */}
              {/* Forgot Password Link */}
              <Link
                to="/forgot-password"
                className="text-sm text-blue-700 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-9 my-4 bg-blue-900 text-white hover:bg-blue-800 disabled:opacity-50"
              disabled={loading.login}
            >
              {loading.login ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                    <LogIn />
                    Sign In
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
}
