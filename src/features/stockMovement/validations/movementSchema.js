import * as yup from "yup";

export const stockInSchema = yup.object({
  inventory: yup.string().required("Inventory is required."),

  quantity: yup
    .number()
    .typeError("Quantity is required.")
    .integer("Quantity must be an integer.")
    .min(1, "Quantity must be greater than zero.")
    .required("Quantity is required."),

  reason: yup
    .string()
    .trim()
    .required("Reason is required.")
    .max(100, "Reason cannot exceed 100 characters."),

  purchasePrice: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .typeError("Purchase price must be a number")
    .min(0, "Purchase price cannot be negative")
    .when("reason", {
      is: "Purchase",
      then: (schema) => schema.required("Purchase price is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

  remarks: yup
    .string()
    .trim()
    .max(500, "Remarks cannot exceed 500 characters.")
    .nullable(),
});

export const stockOutSchema = yup.object({
    inventory: yup.string().required("Inventory is required."),

    quantity: yup
        .number()
        .typeError("Quantity must be a number.")
        .integer("Quantity must be a whole number.")
        .min(1, "Quantity must be greater than zero.")
        .required("Quantity is required."),

    reason: yup
        .string()
        .trim()
        .required("Reason is required.")
        .max(100, "Reason cannot exceed 100 characters."),

    remarks: yup
        .string()
        .trim()
        .max(500, "Remarks cannot exceed 500 characters.")
        .nullable(),
});

export const stockTransferSchema = yup.object({
    inventory: yup.string().required("Source inventory is required."),

    toBranch: yup.string().required("Destination branch is required."),

    quantity: yup
        .number()
        .typeError("Quantity must be a number.")
        .integer("Quantity must be a whole number.")
        .min(1, "Quantity must be greater than zero.")
        .required("Quantity is required."),

    remarks: yup
        .string()
        .trim()
        .max(500, "Remarks cannot exceed 500 characters.")
        .nullable(),
});

export const adjustmentSchema = yup.object({
    inventory: yup.string().required("Inventory is required."),

    adjustmentType: yup
        .string()
        .oneOf(["increase", "decrease"])
        .required("Adjustment type is required."),

    quantity: yup
        .number()
        .typeError("Quantity is required.")
        .integer("Quantity must be a whole number.")
        .min(1, "Quantity must be greater than zero.")
        .required("Quantity is required."),

    reason: yup
        .string()
        .trim()
        .required("Adjustment reason is required.")
        .max(100, "Reason cannot exceed 100 characters."),

    remarks: yup
        .string()
        .trim()
        .max(500, "Remarks cannot exceed 500 characters.")
        .nullable(),
});