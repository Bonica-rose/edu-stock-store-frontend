import * as yup from "yup";

export const companySettingsSchema = yup.object({

    companyName: yup
        .string()
        .trim()
        .required("Company name is required."),

    companyEmail: yup
        .string()
        .trim()
        .email("Enter a valid email address.")
        .notRequired(),

    companyPhone: yup
        .string()
        .trim()
        .matches(
            /^[6-9]\d{9}$/,
            {
                message: "Enter a valid 10-digit phone number.",
                excludeEmptyString: true,
            }
        )
        .notRequired(),

    companyAddress: yup
        .string()
        .trim()
        .max(200)
        .notRequired(),

});