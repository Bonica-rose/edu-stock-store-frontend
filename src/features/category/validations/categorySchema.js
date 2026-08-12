import * as yup from "yup";

import { CATEGORY_TYPES } from "@/shared/constants/category";

const commonFields = {
    categoryName: yup
        .string()
        .trim()
        .required("Category name is required")
        .min(2, "Category name must be between 2 and 100 characters")
        .max(100, "Category name must be between 2 and 100 characters"),

    categoryCode: yup
        .string()
        .trim()
        .required("Category code is required")
        .min(2, "Category code must be between 2 and 20 characters")
        .max(20, "Category code must be between 2 and 20 characters")
        .matches(
        /^[A-Za-z0-9_-]+$/,
        "Category code can contain only letters, numbers, hyphens and underscores",
        ),

    description: yup
        .string()
        .trim()
        .max(500, "Description cannot exceed 500 characters"),

    type: yup
        .string()
        .required("Category type is required")
        .oneOf(Object.values(CATEGORY_TYPES), "Invalid category type"),
};

export const createCategorySchema = yup.object({
    ...commonFields,
});

export const updateCategorySchema = yup.object({
    ...commonFields,
});
