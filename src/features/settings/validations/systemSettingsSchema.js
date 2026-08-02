import * as yup from "yup";

export const systemSettingsSchema = yup.object({

    defaultCurrency: yup
        .string()
        .required("Currency is required.")
        .length(3, "Currency must be a 3-letter code.")
        .uppercase(),

    timezone: yup
        .string()
        .required("Timezone is required."),

    dateFormat: yup
        .string()
        .oneOf(
            [
                "DD/MM/YYYY",
                "MM/DD/YYYY",
                "YYYY-MM-DD",
            ],
            "Invalid date format."
        )
        .required("Date format is required."),

    isMaintenanceMode: yup
        .boolean()
        .required(),
});