import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";

import { toast } from "sonner";

export default function PasswordInput({
    id,
    register,
    error,
    placeholder = "",
    disablePaste = false,
    className = "",
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <Input
                id={id}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                className={`pr-10 text-[15px] placeholder:text-sm ${
                error ? "border-destructive" : ""
                } ${className}`}
                autoComplete="new-password"
                onPaste={
                disablePaste
                    ? (e) => {
                        e.preventDefault();
                        toast.info("Please type the confirmation password.");
                    }
                    : undefined
                }
                {...register}
            />

            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
                {showPassword ? (
                <EyeOff className="h-4 w-4" />
                ) : (
                <Eye className="h-4 w-4" />
                )}
            </button>
        </div>
    );
}
