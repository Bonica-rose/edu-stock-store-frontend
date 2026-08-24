import * as yup from "yup";

export const createMaintenanceSchema = yup.object({
    asset: yup.string().required("Asset is required."),

    issueTitle: yup
        .string()
        .trim()
        .required("Issue title is required.")
        .max(100, "Issue title cannot exceed 100 characters."),

    description: yup
        .string()
        .trim()
        .required("Description is required.")
        .max(1000, "Description cannot exceed 1000 characters."),

    priority: yup
        .string()
        .oneOf(["Low", "Medium", "High"], "Invalid priority.")
        .required("Priority is required."),
});

export const assignMaintenanceSchema = yup.object({
    assignedTo: yup.string().required("Maintenance Staff is required."),
});

export const completeMaintenanceSchema = yup.object({
    repairNotes: yup
        .string()
        .trim()
        .required("Repair notes are required.")
        .max(1000, "Repair notes cannot exceed 1000 characters."),

    repairCost: yup
        .number()
        .typeError("Repair cost must be a number.")
        .min(0, "Repair cost cannot be negative.")
        .nullable(),

    partsReplaced: yup
        .string()
        .trim()
        .max(500, "Parts replaced cannot exceed 500 characters.")
        .nullable(),

    vendor: yup.string().nullable(),

    assetCondition: yup
        .string()
        .oneOf(["Good", "Damaged"])
        .required("Asset condition is required."),
});
