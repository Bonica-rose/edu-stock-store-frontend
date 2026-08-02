import * as yup from "yup";

export const changePasswordSchema = yup.object({

    currentPassword: yup
        .string()
        .required("Current password is required."),

    newPassword: yup
        .string()
        .required("New password is required.")
        .min(8, "Password must be at least 8 characters.")
        .matches(
            /[A-Z]/,
            "Must contain one uppercase letter."
        )
        .matches(
            /[a-z]/,
            "Must contain one lowercase letter."
        )
        .matches(
            /\d/,
            "Must contain one number."
        )
        .matches(
            /[@$!%*?&#]/,
            "Must contain one special character."
        ),

    confirmPassword: yup
        .string()
        .required("Confirm your password.")
        .oneOf(
            [yup.ref("newPassword")],
            "Passwords do not match."
        ),
});