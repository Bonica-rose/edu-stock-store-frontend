import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/shared/utils/dateFormatter";

function isMetadataId(key) {
  return key.endsWith("Id") || key.endsWith("ID");
}

export default function ActivityDetailsSheet({ activity, open, onOpenChange }) {
  if (!activity) {
    return null;
  }

  const user = activity.user;
  const branch = activity.branch;

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  const hasMetadata =
    activity.metadata &&
    typeof activity.metadata === "object" &&
    !Array.isArray(activity.metadata) &&
    Object.keys(activity.metadata).length > 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Activity Details</SheetTitle>

          <SheetDescription>
            Detailed information about this activity.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-4 pb-6">
          {/* Activity */}
          <section className="space-y-4">
            <SectionTitle>Activity</SectionTitle>

            <DetailRow label="Module">{activity.module || "-"}</DetailRow>

            <DetailRow label="Action">{activity.action || "-"}</DetailRow>

            <DetailRow label="Description">
              {activity.description || "-"}
            </DetailRow>
          </section>

          <Separator />

          {/* Record */}
          <section className="space-y-4">
            <SectionTitle>Record</SectionTitle>

            <DetailRow label="Record Code">
              {activity.recordCode || "-"}
            </DetailRow>

            <DetailRow label="Record ID">
              <span className="break-all font-mono text-xs">
                {activity.recordId || "-"}
              </span>
            </DetailRow>
          </section>

          <Separator />

          {/* User & Branch */}
          <section className="space-y-4">
            <SectionTitle>User & Branch</SectionTitle>

            <DetailRow label="User">
              <div>
                <div className="font-medium">{fullName || "-"}</div>

                {user?.email && (
                  <div className="text-xs text-muted-foreground">
                    {user.email}
                  </div>
                )}
              </div>
            </DetailRow>

            <DetailRow label="Branch">{branch?.branchName || "-"}</DetailRow>
          </section>

          <Separator />

          {/* Request Information */}
          <section className="space-y-4">
            <SectionTitle>Request Information</SectionTitle>

            <DetailRow label="IP Address">
              {activity.ipAddress || "-"}
            </DetailRow>

            <DetailRow label="User Agent">
              <span className="break-all text-xs">
                {activity.userAgent || "-"}
              </span>
            </DetailRow>

            <DetailRow label="Date & Time">
              {activity.createdAt
                ? formatDateTime(activity.createdAt, "DD MMMM, YYYY h:mm A")
                : "-"}
            </DetailRow>
          </section>

          {/* Metadata */}
          {hasMetadata && (
            <>
              <Separator />

              <section className="space-y-4">
                <SectionTitle>Metadata</SectionTitle>

                <div className="rounded-md border bg-muted/20">
                  <div className="divide-y">
                    {Object.entries(activity.metadata)
                      .filter(([key]) => !isMetadataId(key))
                      .map(([key, value]) => (
                        <MetadataRow
                          key={key}
                          label={formatMetadataLabel(key)}
                          value={value}
                        />
                      ))}
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SectionTitle({ children }) {
  return <h3 className="text-sm font-semibold">{children}</h3>;
}

function DetailRow({ label, children }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 text-sm">
      <div className="text-muted-foreground">{label}</div>

      <div className="min-w-0">{children}</div>
    </div>
  );
}

function MetadataRow({ label, value }) {
  return (
    <div className="grid grid-cols-[150px_1fr] gap-4 px-3 py-2.5 text-sm">
      <div className="text-muted-foreground">{label}</div>

      <div className="min-w-0 break-all font-medium">
        <MetadataValue value={value} />
      </div>
    </div>
  );
}

function MetadataValue({ value }) {
  if (value === null || value === undefined) {
    return "-";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "object") {
    return (
      <pre className="whitespace-pre-wrap break-all font-mono text-xs font-normal">
        {JSON.stringify(value, null, 2)}
      </pre>
    );
  }

  return String(value);
}

function formatMetadataLabel(key) {
  const specialLabels = {
    sourceInventoryId: "Source Inventory ID",
    sourceInventory: "Source Inventory",
    sourcePreviousStock: "Source Previous Stock",
    sourceNewStock: "Source New Stock",

    sourceMovementId: "Source Movement ID",

    destinationInventoryId: "Destination Inventory ID",
    destinationInventory: "Destination Inventory",
    destinationPreviousStock: "Destination Previous Stock",
    destinationNewStock: "Destination New Stock",

    destinationMovementId: "Destination Movement ID",

    fromBranch: "From Branch",
    toBranch: "To Branch",

    destinationInventoryCreated: "Destination Inventory Created",

    stockMovementId: "Stock Movement ID",

    previousStock: "Previous Stock",
    newStock: "New Stock",

    quantity: "Quantity",
    reason: "Reason",
  };

  if (specialLabels[key]) {
    return specialLabels[key];
  }

  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}
