import * as yup from "yup";

export const profileSchema = yup.object({

    firstName: yup
        .string()
        .required("First name is required.")
        .max(50),

    lastName: yup
        .string()
        .required("Last name is required.")
        .max(50)
        .test(
            "different-name",
            "Last name cannot be identical to first name.",
            function (value) {
                return (
                    value?.trim().toLowerCase() !==
                    this.parent.firstName?.trim().toLowerCase()
                );
            }
        ),

    phone: yup
        .string()
        .nullable()
        .matches(
            /^[6-9]\d{9}$/,
            "Enter a valid 10-digit phone number."
        ),

    profileImage: yup
        .string()
        .nullable(),
});