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
