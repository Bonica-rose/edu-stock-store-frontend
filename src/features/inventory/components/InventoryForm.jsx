import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { Save, SavePlus, Loader2 } from "lucide-react";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import SearchableSelect from "../../../shared/components/SearchableSelect";
import { inventorySchema } from "../validations/inventorySchema";

const UNIT_OPTIONS = [
    { value: "Piece", label: "Piece" },
    { value: "Pack", label: "Pack" },
    { value: "Box", label: "Box" },
    { value: "Bottle", label: "Bottle" },
    { value: "Kg", label: "Kg" },
    { value: "Litre", label: "Litre" },
    { value: "Dozen", label: "Dozen" },
    { value: "Bundle", label: "Bundle" },
];

export default function InventoryForm({
    mode = "create",
    initialData,
    onSubmit,
    loading = false,
    categories = [],
    vendors = [],
    branches = [],
}) {
    const [imagePreview, setImagePreview] = useState(null);
    const schema = inventorySchema;

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        setError,
        watch,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),

        defaultValues: {
            itemName: "",
            barcode: "",
            category: "",
            vendor: "",
            branch: "",
            unit: "",
            purchasePrice: 0,
            description: "",
            itemImageFile: null,
        },
    });

    useEffect(() => {
        register("vendor");
        register("branch");
        register("unit");
    }, [register]);

    const selectedVendor = watch("vendor");
    const selectedBranch = watch("branch");
    const selectedUnit = watch("unit");
    const selectedImage = watch("itemImageFile");

    // Populate form when editing
    useEffect(() => {
        if (initialData) {
        reset({
            itemName: initialData.itemName || "",
            barcode: initialData.barcode || "",
            category: initialData.category?._id || initialData.category || "",
            vendor: initialData.vendor?._id || initialData.vendor || "",
            branch: initialData.branch?._id || initialData.branch || "",
            unit: initialData.unit || "",
            purchasePrice:
                initialData.purchasePrice !== undefined
                ? String(initialData.purchasePrice)
              : "",
            minimumStock: initialData.minimumStock || "",
            description: initialData.description || "",
            itemImage: initialData.itemImage || "",
            itemImageFile: null,
        });
        }
    }, [initialData, reset]);

    useEffect(() => {       
        
        const file = selectedImage?.[0];
        if (!file) {
            setImagePreview(null);
            return;
        }

        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        return () => {
            URL.revokeObjectURL(previewUrl);
        };
    }, [selectedImage]);

    const submitForm = async (data) => {
        try {
          const formData = new FormData();

          // Append normal form fields
          formData.append("itemName", data.itemName);
          formData.append("barcode", data.barcode || "");
          formData.append("category", data.category);
          formData.append("vendor", data.vendor);
          formData.append("branch", data.branch);
          formData.append("unit", data.unit);
          if (mode==='create') {
            formData.append("purchasePrice", data.purchasePrice);
          } else {
            formData.append("minimumStock", data.minimumStock);
          }
          
          formData.append("description", data.description || "");

          // Append image file
          if (data.itemImageFile instanceof File) {
            formData.append("itemImageFile", data.itemImageFile);
          }

          await onSubmit(formData);
        } catch (error) {
            // Handle backend validation errors
            if (error.errors?.length) {
                error.errors.forEach((err) => {
                setError(err.path, {
                    type: "server",
                    message: err.msg,
                });
                });

                return;
            }

            const errorMsg = mode === "create" ? "Failed to create inventory" : "Failed to update inventory";

            toast.error(error?.message ?? errorMsg);
        }
    };

    return (
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
            {/* ITEM INFORMATION */}
            <div className="space-y-3">
              <div>
                <h3 className="text-[16px] font-semibold text-blue-900">
                  Item Information
                </h3>

                <p className="text-[13px] text-muted-foreground">
                  Enter the basic information about the inventory item.
                </p>
              </div>

              {/* Item Name */}
              <Field>
                <FieldLabel htmlFor="itemName">
                  Item Name <span className="text-destructive">*</span>
                </FieldLabel>

                <Input
                  id="itemName"
                  {...register("itemName")}
                  placeholder="Enter item name"
                  aria-invalid={!!errors.itemName}
                />

                <FieldError>{errors.itemName?.message}</FieldError>
              </Field>

              {/* Barcode */}
              <Field>
                <FieldLabel htmlFor="barcode">Barcode</FieldLabel>

                <Input
                  id="barcode"
                  {...register("barcode")}
                  placeholder="Enter barcode"
                  aria-invalid={!!errors.barcode}
                />

                <FieldError>{errors.barcode?.message}</FieldError>

                <p className="text-[13px] text-muted-foreground">
                  Optional. Barcode must be unique.
                </p>
              </Field>

              {/* Category */}
              <Field>
                <FieldLabel htmlFor="category">
                  Category <span className="text-destructive">*</span>
                </FieldLabel>

                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <SearchableSelect
                      id="category"
                      value={field.value}
                      onValueChange={field.onChange}
                      error={!!errors.category}
                      placeholder="Select category"
                      searchPlaceholder="Search category..."
                      emptyMessage="No categories found."
                      options={categories.map((category) => ({
                        value: category._id,
                        label: category.categoryName,
                      }))}
                    />
                  )}
                />

                <FieldError>{errors.category?.message}</FieldError>
              </Field>

              {/* Vendor */}
              <Field>
                <FieldLabel htmlFor="vendor">
                  Vendor <span className="text-destructive">*</span>
                </FieldLabel>

                <Select
                  value={selectedVendor}
                  onValueChange={(value) =>
                    setValue("vendor", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                >
                  <SelectTrigger id="vendor" aria-invalid={!!errors.vendor}>
                    <SelectValue placeholder="Select vendor">
                      {vendors.find((v) => v._id === selectedVendor)
                        ?.vendorName ?? "Select vendor"}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="" disabled>
                      Choose a vendor
                    </SelectItem>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor._id} value={vendor._id}>
                        {vendor.vendorName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FieldError>{errors.vendor?.message}</FieldError>
              </Field>

              {/* Branch */}
              <Field>
                <FieldLabel htmlFor="branch">
                  Branch <span className="text-destructive">*</span>
                </FieldLabel>

                <Select
                  value={selectedBranch}
                  onValueChange={(value) =>
                    setValue("branch", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                >
                  <SelectTrigger id="branch" aria-invalid={!!errors.branch}>
                    <SelectValue placeholder="Select branch">
                      {branches.find((b) => b._id === selectedBranch)
                        ?.branchName ?? "Select branch"}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="" disabled>
                      Choose a branch
                    </SelectItem>
                    {branches.map((branch) => (
                      <SelectItem key={branch._id} value={branch._id}>
                        {branch.branchName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FieldError>{errors.branch?.message}</FieldError>
              </Field>
            </div>

            {/* PURCHASE INFORMATION */}
            <div className="space-y-3">
              <div>
                <h3 className="text-[16px] font-semibold text-blue-900">
                  Purchase Information
                </h3>

                <p className="text-[13px] text-muted-foreground">
                  Enter the unit and purchase price information.
                </p>
              </div>

              {/* Unit */}
              <Field>
                <FieldLabel htmlFor="unit">
                  Unit <span className="text-destructive">*</span>
                </FieldLabel>

                <Select
                  value={selectedUnit}
                  onValueChange={(value) =>
                    setValue("unit", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                >
                  <SelectTrigger id="unit" aria-invalid={!!errors.unit}>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="" disabled>
                      Select unit
                    </SelectItem>
                    {UNIT_OPTIONS.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FieldError>{errors.unit?.message}</FieldError>
              </Field>

              {/* Minimum Stock */}
              {mode === 'edit' && (<Field>
                <FieldLabel htmlFor="minimumStock">
                  Minimum Stock <span className="text-destructive">*</span>
                </FieldLabel>

                <Input
                  id="minimumStock"
                  type="number"
                  min="0"
                  step="1"
                  {...register("minimumStock")}
                  aria-invalid={!!errors.minimumStock}
                  placeholder="Enter minimum stock"
                />

                {errors.minimumStock && (
                  <FieldError>{errors.minimumStock.message}</FieldError>
                )}
              </Field>)}

              {/* Purchase Price */}
              <Field>
                <FieldLabel htmlFor="purchasePrice">
                  Current Purchase Price{" "}
                  <span className="text-destructive">*</span>
                </FieldLabel>

                <Input
                  id="purchasePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  {...register("purchasePrice")}
                  placeholder="Enter purchase price"
                  aria-invalid={!!errors.purchasePrice}
                  readOnly={mode === "edit"}
                />

                <FieldError>{errors.purchasePrice?.message}</FieldError>

                <p className="text-[13px] text-muted-foreground">
                  Price per unit.
                </p>
              </Field>
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>

                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Enter inventory description"
                  rows={4}
                  aria-invalid={!!errors.description}
                />

                <FieldError>{errors.description?.message}</FieldError>

                <p className="text-[13px] text-muted-foreground">
                  Maximum 500 characters.
                </p>
              </Field>
            </div>

            {/* ITEM IMAGE */}
            <div className="space-y-2">
              <Field>
                <FieldLabel htmlFor="itemImageFile">Item Image</FieldLabel>

                <Input
                  id="itemImageFile"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  {...register("itemImageFile")}
                  aria-invalid={!!errors.itemImageFile}
                />

                <FieldError>{errors.itemImageFile?.message}</FieldError>

                <p className="text-[13px] text-muted-foreground">
                  JPG, PNG or WebP. Maximum 2 MB.
                </p>
                {/* Image Preview */}
                {imagePreview ? (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Selected inventory item"
                      className="h-32 w-32 rounded-lg border object-cover"
                    />
                  </div>
                ) : initialData?.itemImage ? (
                  <div className="mt-3">
                    <img
                      src={initialData?.itemImage}
                      alt={initialData.itemName}
                      className="h-32 w-32 rounded-lg border object-cover"
                    />
                  </div>
                ) : null}
              </Field>
            </div>

            {/* SUBMIT */}
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={loading}
                className="gap-2 rounded-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : initialData ? (
                  <>
                    <SavePlus className="h-4 w-4" />
                    Update Inventory
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Create Inventory
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
}
