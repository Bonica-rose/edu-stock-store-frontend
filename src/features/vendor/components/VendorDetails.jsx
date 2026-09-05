import {
  FileText,
  MessageSquareText,
  Contact,
  BookUser,
  BriefcaseBusiness,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/shared/utils/dateFormatter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DetailItem = ({ label, value, children }) => {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>

      {children ?? <p className="mt-1 text-sm font-medium">{value ?? "-"}</p>}
    </div>
  );
};

export default function VendorDetails({ vendor }) {
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
    <div className="space-y-4">
      {/* VENDOR HEADER */}
      <Card>
        <CardContent className="px-4 py-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Vendor</p>

              <h1 className="mt-1 text-[20px] text-blue-900 font-semibold tracking-tight">
                {vendor.vendorName}
              </h1>

              <p className="mt-1 text-base text-muted-foreground">
                {vendor.vendorCode || "-"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant={vendor.isActive ? "active" : "destructive"}>
                {vendor.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Contact className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-1">
            <DetailItem
              label="Contact Person"
              value={vendor.contactPerson || "-"}
            />
            <DetailItem label="Email" value={vendor.email || "-"} />
            <DetailItem label="Phone" value={vendor.phone || "-"} />
            <DetailItem
              label="Alternate Phone"
              value={vendor.alternatePhone || "-"}
            />

            <DetailItem label="Website" value={vendor.website || "-"} />
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BookUser className="h-5 w-5" />
            Address
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="md:col-span-2 lg:col-span-4">
              <DetailItem label="Address" value={vendor.address} />
            </div>

            <DetailItem label="City" value={vendor.city} />

            <DetailItem label="State" value={vendor.state} />

            <DetailItem label="Country" value={vendor.country} />

            <DetailItem label="Postal Code" value={vendor.postalCode} />
          </div>
        </CardContent>
      </Card>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BriefcaseBusiness className="h-5 w-5" />
            Business Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <DetailItem label="GST Number" value={vendor.gstNumber} />
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquareText className="h-5 w-5" />
            Additional Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <DetailItem label="Notes" value={vendor.notes} />
          </div>
        </CardContent>
      </Card>

      {/* Audit Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-5 w-5" />
            Additional Information
          </CardTitle>
        </CardHeader>

        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}
