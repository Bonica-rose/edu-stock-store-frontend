import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function DetailItem({ label, value }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value || "-"}</p>
    </div>
  );
}

export default function BranchDetails({ branch }) {
  if (!branch) return null;

  const managerName = branch.manager
    ? `${branch.manager.firstName ?? ""} ${
        branch.manager.lastName ?? ""
      }`.trim()
    : null;

  const createdByName = branch.createdBy
    ? `${branch.createdBy.firstName ?? ""} ${
        branch.createdBy.lastName ?? ""
      }`.trim()
    : null;

  const updatedByName = branch.updatedBy
    ? `${branch.updatedBy.firstName ?? ""} ${
        branch.updatedBy.lastName ?? ""
      }`.trim()
    : null;

  return (
    <div className="space-y-4">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Branch Information</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <DetailItem label="Branch Code" value={branch.branchCode} />

            <DetailItem label="Branch Name" value={branch.branchName} />

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Status</p>

              <Badge variant={branch.isActive ? "default" : "secondary"}>
                {branch.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>

            <DetailItem label="Phone" value={branch.phone} />

            <DetailItem label="Email" value={branch.email} />
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Address</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <DetailItem label="Address" value={branch.address} />

            <DetailItem label="City" value={branch.city} />

            <DetailItem label="State" value={branch.state} />

            <DetailItem label="Country" value={branch.country} />
          </div>
        </CardContent>
      </Card>

      {/* Branch Manager */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Branch Manager</CardTitle>
        </CardHeader>

        <CardContent>
          {branch.manager ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <DetailItem label="Name" value={managerName} />

              <DetailItem
                label="Employee ID"
                value={branch.manager.employeeId}
              />

              <DetailItem label="Email" value={branch.manager.email} />

              <DetailItem label="Phone" value={branch.manager.phone} />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No branch manager assigned.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Audit Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Audit Information</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <DetailItem label="Created By" value={createdByName} />

            <DetailItem
              label="Created Employee ID"
              value={branch.createdBy?.employeeId}
            />

            <DetailItem
              label="Created At"
              value={
                branch.createdAt
                  ? new Date(branch.createdAt).toLocaleString()
                  : "-"
              }
            />

            <DetailItem label="Updated By" value={updatedByName} />

            <DetailItem
              label="Updated Employee ID"
              value={branch.updatedBy?.employeeId}
            />

            <DetailItem
              label="Updated At"
              value={
                branch.updatedAt
                  ? new Date(branch.updatedAt).toLocaleString()
                  : "-"
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
