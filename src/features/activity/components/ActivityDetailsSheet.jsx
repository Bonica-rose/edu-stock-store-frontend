import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Separator } from "@/components/ui/separator";

import { formatDateTime } from "@/shared/utils/dateFormatter";

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
    Object.keys(activity.metadata).length > 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
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
                  <div className="text-muted-foreground text-xs">
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

                <div className="rounded-md border bg-muted/30 p-3">
                  <pre className="whitespace-pre-wrap break-all text-xs">
                    {JSON.stringify(activity.metadata, null, 2)}
                  </pre>
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
