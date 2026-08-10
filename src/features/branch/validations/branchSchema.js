import * as yup from "yup";

const phoneRegex = /^[6-9]\d{9}$/;

const commonFields = {
    branchName: yup
        .string()
        .trim()
        .required("Branch name is required")
        .min(3, "Branch name must be between 3 and 50 characters")
        .max(50, "Branch name must be between 3 and 50 characters"),

    address: yup
        .string()
        .trim()
        .required("Address is required")
        .max(100, "Address cannot exceed 100 characters"),

    city: yup
        .string()
        .trim()
        .required("City is required")
        .max(50, "City cannot exceed 50 characters"),

    state: yup
        .string()
        .trim()
        .required("State is required")
        .max(50, "State cannot exceed 50 characters"),

    country: yup
        .string()
        .trim()
        .required("Country is required")
        .max(50, "Country cannot exceed 50 characters"),

    phone: yup
        .string()
        .nullable()
        .transform((value) => (value === "" ? null : value))
        .matches(phoneRegex, {
            message: "Please provide a valid phone number",
            excludeEmptyString: true,
        }),

    email: yup
        .string()
        .nullable()
        .transform((value) => (value === "" ? null : value))
        .email("Invalid email address"),

    manager: yup
        .string()
        .nullable()
        .transform((value) => (value === "" ? null : value))
        .matches(/^[0-9a-fA-F]{24}$/, {
            message: "Invalid manager",
            excludeEmptyString: true,
        }),
};

export const createBranchSchema = yup.object({
    branchCode: yup
        .string()
        .trim()
        .required("Branch code is required")
        .min(2, "Branch code must be between 2 and 20 characters")
        .max(20, "Branch code must be between 2 and 20 characters")
        .matches(
            /^[A-Za-z0-9_-]+$/,
            "Branch code can contain only letters, numbers, hyphens and underscores"
        ),

    ...commonFields,
});

export const updateBranchSchema = yup.object({
    ...commonFields,
});