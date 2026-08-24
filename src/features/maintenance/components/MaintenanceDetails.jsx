import MaintenanceStatusBadge from "./MaintenanceStatusBadge";
import MaintenancePriorityBadge from "./MaintenancePriorityBadge";

function getUserName(user) {
  if (!user) return "—";

  return [user.firstName, user.lastName].filter(Boolean).join(" ");
}

function SectionTitle({ children }) {
  return (
    <div className="border-b pb-2">
      <h3 className="text-md font-semibold text-blue-900">{children}</h3>
    </div>
  );
}

function InfoGrid({ children }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function InfoItem({ label, value, fullWidth = false }) {
  return (
    <div className={fullWidth ? "sm:col-span-2" : ""}>
      <p className="text-xs text-muted-foreground">{label}</p>

      <div className="mt-1 text-sm font-medium">{value || "—"}</div>
    </div>
  );
}

export default function MaintenanceDetails({ maintenance }) {
  if (!maintenance) {
    return null;
  }

  const {
    maintenanceId,
    issueTitle,
    description,
    priority,
    status,
    asset,
    reportedBy,
    assignedTo,
    assignedBy,
    assignedDate,
    reportedDate,
    completedDate,
    repairNotes,
    partsReplaced,
    repairCost,
    vendor,
  } = maintenance;

  return (
    <div className="space-y-3">
      {/* Maintenance Information */}
      <section className="space-y-4 border rounded-lg p-3">
        <SectionTitle>Maintenance Information</SectionTitle>

        <InfoGrid>
          <InfoItem label="Maintenance ID" value={maintenanceId} />
          <InfoItem label="Issue" value={issueTitle} />

          <InfoItem
            label="Priority"
            value={<MaintenancePriorityBadge priority={priority} />}
          />

          <InfoItem
            label="Status"
            value={<MaintenanceStatusBadge status={status} />}
          />

          <InfoItem label="Description" value={description} fullWidth />
        </InfoGrid>
      </section>

      {/* Asset Information */}
      <section className="space-y-4  border rounded-lg p-3">
        <SectionTitle>Asset Information</SectionTitle>

        <InfoGrid>
          <InfoItem label="Asset ID" value={asset?.assetCode} />

          <InfoItem label="Asset" value={asset?.inventory?.itemName} />

          <InfoItem label="Serial Number" value={asset?.serialNumber} />

          <InfoItem label="Branch" value={asset?.branch?.branchName} />

          <InfoItem label="Condition" value={asset?.condition} />
        </InfoGrid>
      </section>

      {/* Reporting */}
      <section className="space-y-4 border rounded-lg p-3">
        <SectionTitle>Reporting</SectionTitle>

        <InfoGrid>
          <InfoItem label="Reported By" value={getUserName(reportedBy)} />

          <InfoItem label="Reported Date" value={reportedDate} />
        </InfoGrid>
      </section>

      {/* Assignment */}
      <section className="space-y-4 border rounded-lg p-3">
        <SectionTitle>Assignment</SectionTitle>

        <InfoGrid>
          <InfoItem label="Assigned To" value={getUserName(assignedTo)} />

          <InfoItem label="Assigned By" value={getUserName(assignedBy)} />

          <InfoItem label="Assigned Date" value={assignedDate} />
        </InfoGrid>
      </section>

      {/* Completion */}
      <section className="space-y-4 border rounded-lg p-3">
        <SectionTitle>Completion</SectionTitle>

        <InfoGrid>
          <InfoItem label="Repair Notes" value={repairNotes} fullWidth />

          <InfoItem label="Parts Replaced" value={partsReplaced} />

          <InfoItem
            label="Repair Cost"
            value={repairCost != null ? repairCost : "—"}
          />

          <InfoItem label="Vendor" value={vendor?.vendorName} />

          <InfoItem label="Completed Date" value={completedDate} />
        </InfoGrid>
      </section>
    </div>
  );
}
