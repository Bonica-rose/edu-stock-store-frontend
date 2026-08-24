import * as yup from "yup";

export const assetSchema = yup.object({
    inventory: yup.string().required("Inventory is required."),

    serialNumber: yup
        .string()
        .trim()
        .max(100, "Serial number cannot exceed 100 characters.")
        .nullable()
        .transform((value) => value || ""),

    remarks: yup
        .string()
        .trim()
        .max(500, "Remarks cannot exceed 500 characters.")
        .nullable()
        .transform((value) => value || ""),
});

export const assignAssetSchema = yup.object({
    assignedTo: yup.string().required("Please select an employee."),

    remarks: yup
        .string()
        .trim()
        .max(500, "Remarks must not exceed 500 characters.")
        .default(""),
});

export const returnAssetSchema = yup.object({
    remarks: yup
        .string()
        .trim()
        .max(500, "Remarks must not exceed 500 characters.")
        .default(""),
});
