import * as yup from "yup";
import { ROLES } from "@/shared/constants/roles";

export const createUserSchema = yup.object({
    firstName: yup
        .string()
        .trim()
        .required("First name is required")
        .min(3, "First name must be between 3 and 25 characters")
        .max(25, "First name must be between 3 and 25 characters")
        .matches(/^[A-Za-z]+$/, "First name must contain only letters"),

    lastName: yup
        .string()
        .trim()
        .required("Last name is required")
        .min(3, "Last name must be between 3 and 50 characters")
        .max(50, "Last name must be between 3 and 50 characters")
        .matches(
        /^[a-zA-Z. ]+$/,
        "Last name must contain only letters, periods, and spaces"
        ),

    email: yup
        .string()
        .trim()
        .required("Email is required")
        .email("Invalid email address"),

    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be between 8 and 32 characters")
        .max(32, "Password must be between 8 and 32 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(
        /[@$!%*?&#]/,
        "Password must contain at least one special character (@, $, !, %, *, ?, &, #)"
        ),

    phone: yup
        .string()
        .nullable()
        .transform((value) => (value === "" ? null : value))
        .matches(/^[6-9]\d{9}$/, {
        message: "Please provide a valid phone number",
        excludeEmptyString: true,
        }),

    role: yup
        .string()
        .required("Role is required")
        .oneOf(Object.values(ROLES), "Invalid role"),

    branch: yup
        .string()
        .required("Branch is required")
        .matches(/^[0-9a-fA-F]{24}$/, "Invalid branch ID"),
});

export const updateUserSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    role: yup.string().required(),
    branch: yup.string().required(),
});