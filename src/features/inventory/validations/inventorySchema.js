import * as yup from "yup";

export const inventorySchema = yup.object({
  itemName: yup
    .string()
    .trim()
    .required("Item name is required.")
    .max(100, "Item name cannot exceed 100 characters."),

  barcode: yup
    .string()
    .trim()
    .max(100, "Barcode cannot exceed 100 characters.")
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  category: yup.string().required("Category is required."),

  vendor: yup.string().required("Vendor is required."),

  branch: yup.string().required("Branch is required."),

  itemType: yup
    .string()
    .oneOf(["CONSUMABLE", "ASSET"])
    .required("Item type is required"),

  unit: yup
    .string()
    .trim()
    .required("Unit is required.")
    .max(20, "Unit cannot exceed 20 characters."),

  purchasePrice: yup
    .number()
    .typeError("Purchase price must be a number.")
    .required("Purchase price is required.")
    .min(0, "Purchase price must be 0 or greater."),

  description: yup
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters.")
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  // Existing image URL
  itemImage: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  // Newly selected browser file
  itemImageFile: yup
    .mixed()
    .nullable()
    .transform((value) => value?.[0] || null)
    .test("fileType", "Only JPG, PNG, and WEBP images are allowed.", (file) => {
      if (!file) return true;

      return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
    })
    .test("fileSize", function (file) {
      if (!file) return true;

      const maxSizeMB = 2;
      const maxSizeBytes = maxSizeMB * 1024 * 1024;

      if (file.size > maxSizeBytes) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);

        return this.createError({
          message: `Selected file size is ${fileSizeMB} MB. Maximum allowed size is ${maxSizeMB} MB.`,
        });
      }

      return true;
    }),
});
