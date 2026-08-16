import * as yup from "yup";

const vendorSchema = yup.object({
  vendorCode: yup
    .string()
    .trim()
    .required("Vendor code is required.")
    .min(2, "Vendor code must be between 2 and 20 characters.")
    .max(20, "Vendor code must be between 2 and 20 characters.")
    .matches(
      /^[A-Za-z0-9-_]+$/,
      "Vendor code can contain only letters, numbers, hyphens and underscores.",
    ),

  vendorName: yup
    .string()
    .trim()
    .required("Vendor name is required.")
    .min(3, "Vendor name must be between 3 and 100 characters.")
    .max(100, "Vendor name cannot exceed 100 characters."),

  contactPerson: yup
    .string()
    .trim()
    .max(100, "Contact person cannot exceed 100 characters.")
    .optional(),

  email: yup.string().trim().email("Invalid email address.").optional(),

  phone: yup
    .string()
    .trim()
    .required("Phone number is required.")
    .matches(
      /^[6-9]\d{9}$/,
      "Please provide a valid phone number & must contain 10 digits",
    ),

  alternatePhone: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .matches(/^[6-9]\d{9}$/, {
      message: "Please provide a valid phone number & must contain 10 digits",
      excludeEmptyString: true,
    }),

  address: yup
    .string()
    .trim()
    .max(255, "Address cannot exceed 255 characters.")
    .optional(),

  city: yup
    .string()
    .trim()
    .max(100, "City cannot exceed 100 characters.")
    .optional(),

  state: yup
    .string()
    .trim()
    .max(100, "State cannot exceed 100 characters.")
    .optional(),

  country: yup
    .string()
    .trim()
    .max(100, "Country cannot exceed 100 characters.")
    .optional(),

  postalCode: yup
    .string()
    .trim()
    .max(20, "Postal code cannot exceed 20 characters.")
    .optional(),

  gstNumber: yup
    .string()
    .trim()
    .test("gst-number", "Invalid GST number.", (value) => {
      if (!value) return true;

      return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
        value.toUpperCase(),
      );
    })
    .optional(),

  website: yup.string().trim().url("Invalid website URL.").optional(),

  notes: yup
    .string()
    .trim()
    .max(500, "Notes cannot exceed 500 characters.")
    .optional(),
});

export default vendorSchema;
