import * as yup from "yup";

export const setupSchema = yup.object({
    branchName: yup
        .string()
        .required("Branch name is required.")
        .max(100),

    branchCode: yup
        .string()
        .required("Branch code is required.")
        .max(10),

    address: yup
        .string()
        .required("Address is required.")
        .max(255),

    city: yup
        .string()
        .required("City is required.")
        .max(100),

    state: yup
        .string()
        .required("State is required.")
        .max(100),

    country: yup
        .string()
        .required("Country is required.")
        .max(100),

    firstName: yup
        .string()
        .required("First name is required.")
        .max(50),

    lastName: yup
        .string()
        .required("Last name is required.")
        .max(50),

    email: yup
        .string()
        .required("Email is required.")
        .email("Enter a valid email address."),

    password: yup
        .string()
        .required("Password is required.")
        .min(8, "Password must be at least 8 characters.")
        .matches(/[A-Z]/, "Must contain one uppercase letter.")
        .matches(/[a-z]/, "Must contain one lowercase letter.")
        .matches(/\d/, "Must contain one number.")
        .matches(/[@$!%*?&#]/, "Must contain one special character."),

    confirmPassword: yup
        .string()
        .required("Confirm password is required.")
        .oneOf(
            [yup.ref("password")],
            "Passwords do not match."
        ),
});