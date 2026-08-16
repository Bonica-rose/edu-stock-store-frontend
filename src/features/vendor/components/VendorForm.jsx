import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import vendorSchema from "../validations/vendorSchema";

import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Save, SavePlus } from "lucide-react";

const defaultValues = {
  vendorCode: "",
  vendorName: "",
  contactPerson: "",
  email: "",
  phone: "",
  alternatePhone: "",
  address: "",
  city: "",
  state: "",
  country: "India",
  postalCode: "",
  gstNumber: "",
  website: "",
  notes: "",
};

const VendorForm = ({
  mode = "create",
  initialData = null,
  onSubmit,
  isSubmitting = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(vendorSchema),
    defaultValues,
  });

  // Populate form when editing
  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset({
        vendorCode: initialData.vendorCode ?? "",
        vendorName: initialData.vendorName ?? "",
        contactPerson: initialData.contactPerson ?? "",
        email: initialData.email ?? "",
        phone: initialData.phone ?? "",
        alternatePhone: initialData.alternatePhone ?? "",
        address: initialData.address ?? "",
        city: initialData.city ?? "",
        state: initialData.state ?? "",
        country: initialData.country ?? "India",
        postalCode: initialData.postalCode ?? "",
        gstNumber: initialData.gstNumber ?? "",
        website: initialData.website ?? "",
        notes: initialData.notes ?? "",
      });
    }
  }, [mode, initialData, reset]);

  const submitForm = async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {      
      if (error.errors?.length) {
        error.errors.forEach((err) => {
          setError(err.path, {
            type: "server",
            message: err.msg,
          });
        });
        return;
      }

      const errorMsg =
        mode === "create"
          ? "Failed to create vendor"
          : "Failed to update vendor";

      toast.error(error.message ?? errorMsg);
    }
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
          {/* Basic Information */}
          <section className="space-y-4">
            <div>
              <h2 className="text-[17px] font-semibold text-blue-900">
                Basic Information
              </h2>

              <p className="text-[13px] text-muted-foreground">
                Enter the basic vendor information.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Vendor Code */}
              <Field>
                <FieldLabel htmlFor="vendorCode">
                  Vendor Code <span className="text-destructive">*</span>
                </FieldLabel>

                <Input
                  id="vendorCode"
                  placeholder="Enter vendor code"
                  {...register("vendorCode")}
                  aria-invalid={!!errors.vendorCode}
                />

                {errors.vendorCode && (
                  <FieldError>{errors.vendorCode.message}</FieldError>
                )}
              </Field>

              {/* Vendor Name */}
              <Field>
                <FieldLabel htmlFor="vendorName">
                  Vendor Name <span className="text-destructive">*</span>
                </FieldLabel>

                <Input
                  id="vendorName"
                  placeholder="Enter vendor name"
                  {...register("vendorName")}
                  aria-invalid={!!errors.vendorName}
                />

                {errors.vendorName && (
                  <FieldError>{errors.vendorName.message}</FieldError>
                )}
              </Field>

              {/* Contact Person */}
              <Field>
                <FieldLabel htmlFor="contactPerson">Contact Person</FieldLabel>

                <Input
                  id="contactPerson"
                  placeholder="Enter contact person"
                  {...register("contactPerson")}
                  aria-invalid={!!errors.contactPerson}
                />

                {errors.contactPerson && (
                  <FieldError>{errors.contactPerson.message}</FieldError>
                )}
              </Field>
            </div>
          </section>

          {/* Contact Information */}
          <section className="space-y-4">
            <div>
              <h2 className="text-[17px] font-semibold text-blue-900">
                Contact Information
              </h2>

              <p className="text-[13px] text-muted-foreground">
                Enter the vendor's contact details.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>

                <Input
                  id="email"
                  type="email"
                  placeholder="vendor@example.com"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />

                {errors.email && (
                  <FieldError>{errors.email.message}</FieldError>
                )}
              </Field>

              {/* Phone */}
              <Field>
                <FieldLabel htmlFor="phone">
                  Phone <span className="text-destructive">*</span>
                </FieldLabel>

                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  {...register("phone")}
                  aria-invalid={!!errors.phone}
                />

                {errors.phone && (
                  <FieldError>{errors.phone.message}</FieldError>
                )}
              </Field>

              {/* Alternate Phone */}
              <Field>
                <FieldLabel htmlFor="alternatePhone">
                  Alternate Phone
                </FieldLabel>

                <Input
                  id="alternatePhone"
                  type="tel"
                  placeholder="Enter alternate phone number"
                  {...register("alternatePhone")}
                  aria-invalid={!!errors.alternatePhone}
                />

                {errors.alternatePhone && (
                  <FieldError>{errors.alternatePhone.message}</FieldError>
                )}
              </Field>

              {/* Website */}
              <Field>
                <FieldLabel htmlFor="website">Website</FieldLabel>

                <Input
                  id="website"
                  type="url"
                  placeholder="https://example.com"
                  {...register("website")}
                  aria-invalid={!!errors.website}
                />

                {errors.website && (
                  <FieldError>{errors.website.message}</FieldError>
                )}
              </Field>
            </div>
          </section>

          {/* Address */}
          <section className="space-y-4">
            <div>
              <h2 className="text-[17px] font-semibold text-blue-900">
                Address
              </h2>

              <p className="text-[13px] text-muted-foreground">
                Enter the vendor's address details.
              </p>
            </div>

            <div className="space-y-4">
              {/* Address */}
              <Field>
                <FieldLabel htmlFor="address">Address</FieldLabel>

                <Textarea
                  id="address"
                  placeholder="Enter vendor address"
                  rows={3}
                  {...register("address")}
                  aria-invalid={!!errors.address}
                />

                {errors.address && (
                  <FieldError>{errors.address.message}</FieldError>
                )}
              </Field>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* City */}
                <Field>
                  <FieldLabel htmlFor="city">City</FieldLabel>

                  <Input
                    id="city"
                    placeholder="Enter city"
                    {...register("city")}
                    aria-invalid={!!errors.city}
                  />

                  {errors.city && (
                    <FieldError>{errors.city.message}</FieldError>
                  )}
                </Field>

                {/* State */}
                <Field>
                  <FieldLabel htmlFor="state">State</FieldLabel>

                  <Input
                    id="state"
                    placeholder="Enter state"
                    {...register("state")}
                    aria-invalid={!!errors.state}
                  />

                  {errors.state && (
                    <FieldError>{errors.state.message}</FieldError>
                  )}
                </Field>

                {/* Country */}
                <Field>
                  <FieldLabel htmlFor="country">Country</FieldLabel>

                  <Input
                    id="country"
                    placeholder="Enter country"
                    {...register("country")}
                    aria-invalid={!!errors.country}
                  />

                  {errors.country && (
                    <FieldError>{errors.country.message}</FieldError>
                  )}
                </Field>

                {/* Postal Code */}
                <Field>
                  <FieldLabel htmlFor="postalCode">Postal Code</FieldLabel>

                  <Input
                    id="postalCode"
                    placeholder="Enter postal code"
                    {...register("postalCode")}
                    aria-invalid={!!errors.postalCode}
                  />

                  {errors.postalCode && (
                    <FieldError>{errors.postalCode.message}</FieldError>
                  )}
                </Field>
              </div>
            </div>
          </section>

          {/* Business Information */}
          <section className="space-y-4">
            <div>
              <h2 className="text-[17px] font-semibold text-blue-900">
                Business Information
              </h2>

              <p className="text-[13px] text-muted-foreground">
                Enter GST and other business information.
              </p>
            </div>

            <Field>
              <FieldLabel htmlFor="gstNumber">GST Number</FieldLabel>

              <Input
                id="gstNumber"
                placeholder="Enter GST number"
                {...register("gstNumber")}
                onInput={(event) => {
                  event.target.value = event.target.value.toUpperCase();
                }}
                aria-invalid={!!errors.gstNumber}
              />

              {errors.gstNumber && (
                <FieldError>{errors.gstNumber.message}</FieldError>
              )}
            </Field>
          </section>

          {/* Additional Information */}
          <section className="space-y-4">
            <div>
              <h2 className="text-[17px] font-semibold text-blue-900">
                Additional Information
              </h2>

              <p className="text-[13px] text-muted-foreground">
                Add any additional notes about this vendor.
              </p>
            </div>

            <Field>
              <FieldLabel htmlFor="notes">Notes</FieldLabel>

              <Textarea
                id="notes"
                placeholder="Enter additional notes"
                rows={4}
                maxLength={500}
                {...register("notes")}
                aria-invalid={!!errors.notes}
              />

              {errors.notes && <FieldError>{errors.notes.message}</FieldError>}
            </Field>
          </section>

          {/* Actions */}
          <div className="flex justify-start gap-2 pt-1">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                mode === "edit" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </>
                )
              ) : mode === "edit" ? (
                <>
                  <SavePlus className="h-4 w-4" />
                  Update Vendor
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Create Vendor
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VendorForm;
