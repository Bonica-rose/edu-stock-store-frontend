import { ArrowLeft, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/shared/utils/dateFormatter";

const DetailItem = ({ label, value }) => {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="text-sm font-medium wrap-break-word">{value || "-"}</p>
    </div>
  );
};

const DetailSection = ({ title, children }) => {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-[16px] font-semibold text-blue-900/90">{title}</h2>
      </div>

      <div className="rounded-lg border bg-white p-3">{children}</div>
    </section>
  );
};

export default function VendorDetails({ vendor, onBack, onEdit, canUpdate }) {

  const getUserName = (user) => {
    if (!user) return "-";

    return (
      `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() ||
      user.employeeId ||
      user.email ||
      "-"
    );
  };

  return (
    <div className="space-y-3">
      {/* Top Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {canUpdate && (
          <Button
            onClick={onEdit}
            className="flex items-center gap-2 bg-blue-900 hover:bg-blue-900/80"
          >
            <Pencil className="h-4 w-4" />
            Edit Vendor
          </Button>
        )}
      </div>

      {/* Vendor Header */}
      <div className="rounded-lg border bg-white p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-[15px] font-semibold">{vendor.vendorName}</h2>

              <Badge variant={vendor.isActive ? "active" : "destructive"}>
                {vendor.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>

            <p className="mt-1 text-[13px] text-muted-foreground">
              {vendor.vendorCode}
            </p>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <DetailSection title="Basic Information">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DetailItem label="Vendor Code" value={vendor.vendorCode} />

          <DetailItem label="Vendor Name" value={vendor.vendorName} />

          <DetailItem label="Contact Person" value={vendor.contactPerson} />
        </div>
      </DetailSection>

      {/* Contact Information */}
      <DetailSection title="Contact Information">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DetailItem label="Email" value={vendor.email} />

          <DetailItem label="Phone" value={vendor.phone} />

          <DetailItem label="Alternate Phone" value={vendor.alternatePhone} />

          <DetailItem label="Website" value={vendor.website} />
        </div>
      </DetailSection>

      {/* Address */}
      <DetailSection title="Address">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="md:col-span-2 lg:col-span-4">
            <DetailItem label="Address" value={vendor.address} />
          </div>

          <DetailItem label="City" value={vendor.city} />

          <DetailItem label="State" value={vendor.state} />

          <DetailItem label="Country" value={vendor.country} />

          <DetailItem label="Postal Code" value={vendor.postalCode} />
        </div>
      </DetailSection>

      {/* Business Information */}
      <DetailSection title="Business Information">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <DetailItem label="GST Number" value={vendor.gstNumber} />
        </div>
      </DetailSection>

      {/* Additional Information */}
      <DetailSection title="Additional Information">
        <DetailItem label="Notes" value={vendor.notes} />
      </DetailSection>

      {/* Audit Information */}
      <DetailSection title="Audit Information">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DetailItem
            label="Created By"
            value={getUserName(vendor.createdBy)}
          />

          <DetailItem
            label="Created At"
            value={formatDate(vendor.createdAt, "DD MMM, YYYY")}
          />

          <DetailItem
            label="Updated By"
            value={getUserName(vendor.updatedBy)}
          />

          <DetailItem
            label="Updated At"
            value={formatDate(vendor.updatedAt, "DD MMM, YYYY")}
          />
        </div>
      </DetailSection>
    </div>
  );
}
