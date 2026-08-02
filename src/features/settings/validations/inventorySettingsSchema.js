import * as yup from "yup";

export const inventorySettingsSchema = yup.object({

    lowStockQuantityThreshold: yup
        .number()
        .typeError("Low stock threshold must be a number.")
        .required("Low stock threshold is required.")
        .integer("Must be a whole number.")
        .min(1, "Must be greater than 0."),

    predictionAlertDays: yup
        .number()
        .typeError("Prediction alert days must be a number.")
        .required("Prediction alert days is required.")
        .integer("Must be a whole number.")
        .min(1, "Must be greater than 0."),

    predictionHistoryDays: yup
        .number()
        .typeError("Prediction history days must be a number.")
        .required("Prediction history days is required.")
        .integer("Must be a whole number.")
        .min(7, "Prediction history must be at least 7 days."),
});