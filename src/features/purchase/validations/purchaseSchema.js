import * as yup from "yup";

const purchaseSchema = yup.object({
  vendor: yup.string().required("Vendor is required."),

  branch: yup.string().required("Branch is required."),

  items: yup
    .array()
    .of(
      yup.object({
        inventory: yup.string().required("Inventory is required."),

        quantity: yup
          .number()
          .typeError("Quantity must be a number.")
          .integer("Quantity must be a whole number.")
          .min(1, "Quantity must be at least 1.")
          .required("Quantity is required."),

        purchasePrice: yup
          .number()
          .typeError("Purchase price must be a number.")
          .min(0, "Purchase price must be 0 or greater.")
          .required("Purchase price is required."),
      }),
    )
    .min(1, "At least one purchase item is required.")
    .required("At least one purchase item is required."),

  purchaseDate: yup
    .date()
    .typeError("Invalid purchase date.")
    .optional()
    .nullable(),

  notes: yup
    .string()
    .max(500, "Notes cannot exceed 500 characters.")
    .optional()
    .nullable(),
});

export default purchaseSchema;
