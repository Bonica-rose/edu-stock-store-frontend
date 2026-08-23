import {
    CircleUserRound,
    ClipboardCheck,
    FileText,
    History,
    Package,
    Settings,
    UserRound,
    Wrench,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, formatDateTime } from "../../../shared/utils/dateFormatter";

const getConditionBadgeClass = (condition) => {
    switch (condition) {
        case "Good":
        return "bg-blue-700 text-blue-50 border-blue-700";

        case "Damaged":
        return "bg-red-700 text-red-50 border-red-700";

        case "Under Maintenance":
        return "bg-orange-700 text-orange-50 border-orange-700";

        case "Retired":
        return "bg-slate-700 text-slate-50 border-slate-700";

        default:
        return "bg-muted text-muted-foreground";
    }
};

const getStatusBadgeClass = (status) => {
    switch (status) {
        case "Available":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

        case "Assigned":
        return "bg-sky-50 text-sky-700 border-sky-200";

        case "Maintenance":
        return "bg-amber-50 text-amber-700 border-amber-200";

        case "Retired":
        return "bg-gray-50 text-gray-700 border-gray-200";

        default:
        return "bg-muted text-muted-foreground";
    }
};

const getUserName = (user) => {
    if (!user) return "-";

    return (
        [user.firstName, user.lastName].filter(Boolean).join(" ") ||
        user.employeeId ||
        user.email ||
        "-"
    );
};

const DetailItem = ({ label, value, children }) => {
    return (
        <div>
            <p className="text-xs text-muted-foreground">{label}</p>

            {children ?? <p className="mt-1 text-sm font-medium">{value ?? "-"}</p>}
        </div>
    );
};

export default function AssetDetails({ asset }) {
    console.log(asset);
    
    if (!asset) return null;

    const inventory = asset.inventory;

    /* AssignmentHistory and maintenanceHistory may not always be present.*/
    const assignmentHistory = Array.isArray(asset.assignmentHistory)
        ? asset.assignmentHistory
        : [];

    const maintenanceHistory = Array.isArray(asset.maintenanceHistory)
        ? asset.maintenanceHistory
        : [];

    return (
      <div className="space-y-4">
        {/* ASSET HEADER */}
        <Card>
          <CardContent className="px-4 py-1">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Asset</p>

                <h1 className="mt-1 text-[22px] font-semibold tracking-tight">
                  {asset.assetCode}
                </h1>

                <p className="mt-1 text-base text-muted-foreground">
                  {inventory?.itemName || asset.assetName || "-"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className={getStatusBadgeClass(asset.status)}
                >
                  {asset.status || "-"}
                </Badge>

                <Badge
                  variant="outline"
                  className={getConditionBadgeClass(asset.condition)}
                >
                  {asset.condition || "-"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ASSET INFORMATION */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Settings className="h-5 w-5" />
              Asset Information
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-1">
              <DetailItem label="Asset Code" value={asset.assetCode} />

              <DetailItem
                label="Serial Number"
                value={asset.serialNumber || "Not provided"}
              />

              <DetailItem label="Condition">
                <Badge
                  variant="outline"
                  className={getConditionBadgeClass(asset.condition)}
                >
                  {asset.condition || "-"}
                </Badge>
              </DetailItem>

              <DetailItem label="Status">
                <Badge
                  variant="outline"
                  className={getStatusBadgeClass(asset.status)}
                >
                  {asset.status || "-"}
                </Badge>
              </DetailItem>

              <DetailItem
                label="Branch"
                value={
                  asset.branch?.branchName ||
                  inventory?.branch?.branchName ||
                  "-"
                }
              />

              <DetailItem label="Active">
                <Badge variant={asset.isActive ? "active" : "inactive"}>
                  {asset.isActive ? "Yes" : "No"}
                </Badge>
              </DetailItem>
            </div>

            {asset.remarks && (
              <div className="mt-6 border-t pt-5">
                <p className="text-xs text-muted-foreground">Remarks</p>

                <p className="mt-1 whitespace-pre-wrap text-sm">
                  {asset.remarks}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* INVENTORY INFORMATION */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Package className="h-5 w-5" />
              Inventory Information
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-1">
              <DetailItem label="SKU" value={inventory?.sku} />

              <DetailItem label="Item" value={inventory?.itemName} />

              <DetailItem label="Unit" value={inventory?.unit} />

              <DetailItem
                label="Category"
                value={
                  inventory?.category?.categoryName || inventory?.category?.name
                }
              />

              <DetailItem
                label="Purchase Price"
                value={
                  inventory?.purchasePrice !== undefined &&
                  inventory?.purchasePrice !== null
                    ? `₹${Number(inventory.purchasePrice).toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        },
                      )}`
                    : "-"
                }
              />

              <DetailItem
                label="Vendor"
                value={inventory?.vendor?.vendorName}
              />
            </div>
          </CardContent>
        </Card>

        {/* CURRENT ASSIGNMENT  */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CircleUserRound className="h-5 w-5" />
              Current Assignment
            </CardTitle>
          </CardHeader>

          <CardContent>
            {asset.assignedTo ? (
              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <DetailItem
                    label="Assigned To"
                    value={getUserName(asset.assignedTo)}
                  />

                  <DetailItem
                    label="Employee ID"
                    value={asset.assignedTo.employeeId}
                  />

                  <DetailItem label="Email" value={asset.assignedTo.email} />

                  <DetailItem
                    label="Assigned Date"
                    value={formatDate(asset.assignedDate, "DD MMMM, YYYY")}
                  />

                  <DetailItem
                    label="Assigned By"
                    value={getUserName(asset.updatedBy)}
                  />
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-6 text-center">
                <UserRound className="mx-auto h-8 w-8 text-muted-foreground" />

                <p className="mt-2 text-sm font-medium">
                  Not currently assigned
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  This asset is currently available for assignment.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ASSIGNMENT HISTORY */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <History className="h-5 w-5" />
              Assignment History
            </CardTitle>
          </CardHeader>

          <CardContent>
            {assignmentHistory.length === 0 ? (
              <div className="rounded-lg border border-dashed p-4 text-center">
                <History className="mx-auto h-8 w-8 text-muted-foreground" />

                <p className="mt-2 text-sm font-medium">
                  No assignment history
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  This asset has not been assigned yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {assignmentHistory.map((history, index) => (
                  <div
                    key={history._id || index}
                    className="rounded-lg border p-2"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold">
                          {getUserName(history.assignedTo || history.user)}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {history.assignedTo?.employeeId ||
                            history.employeeId ||
                            ""}
                        </p>
                      </div>

                      {history.returnedDate ? (
                        <Badge
                          variant="outline"
                          className="w-fit border-slate-200 bg-slate-100 text-slate-700"
                        >
                          Returned
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="w-fit border-sky-200 bg-sky-100 text-sky-700"
                        >
                          Currently Assigned
                        </Badge>
                      )}
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <DetailItem
                        label="Assigned By"
                        value={getUserName(history.assignedBy)}
                      />

                      <DetailItem
                        label="Assigned Date"
                        value={formatDate(
                          history.assignedDate,
                          "DD MMMM, YYYY",
                        )}
                      />

                      <DetailItem
                        label="Returned Date"
                        value={formatDate(
                          history.returnedDate,
                          "DD MMMM, YYYY",
                        )}
                      />

                      <DetailItem
                        label="Returned By"
                        value={getUserName(history.returnedBy)}
                      />
                    </div>

                    {history.assignmentRemarks && (
                      <div className="mt-4 border-t pt-4">
                        <p className="text-xs text-muted-foreground">
                          Assignment Remarks
                        </p>

                        <p className="mt-1 whitespace-pre-wrap text-sm">
                          {history.assignmentRemarks}
                        </p>
                      </div>
                    )}

                    {history.returnRemarks && (
                      <div className="mt-4 border-t pt-4">
                        <p className="text-xs text-muted-foreground">
                          Return Remarks
                        </p>

                        <p className="mt-1 whitespace-pre-wrap text-sm">
                          {history.returnRemarks}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* MAINTENANCE HISTORY */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Wrench className="h-5 w-5" />
              Maintenance History
            </CardTitle>
          </CardHeader>

          <CardContent>
            {maintenanceHistory.length === 0 ? (
              <div className="rounded-lg border border-dashed p-4 text-center">
                <ClipboardCheck className="mx-auto h-8 w-8 text-muted-foreground" />

                <p className="mt-2 text-sm font-medium">
                  No maintenance records
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  No maintenance activity has been recorded for this asset.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {maintenanceHistory.map((maintenance, index) => (
                  <div
                    key={maintenance._id || index}
                    className="rounded-lg border p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold">
                          {maintenance.maintenanceId ||
                            maintenance.issueTitle ||
                            "Maintenance"}
                        </p>

                        {maintenance.issueTitle &&
                          maintenance.maintenanceId && (
                            <p className="text-xs text-muted-foreground">
                              {maintenance.issueTitle}
                            </p>
                          )}
                      </div>

                      {maintenance.status && (
                        <Badge
                          variant="outline"
                          className={
                            maintenance.status === "Completed"
                              ? "border-emerald-200 bg-emerald-100 text-emerald-700"
                              : maintenance.status === "In Progress"
                                ? "border-amber-200 bg-amber-100 text-amber-700"
                                : "bg-muted text-muted-foreground"
                          }
                        >
                          {maintenance.status}
                        </Badge>
                      )}
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <DetailItem
                        label="Reported By"
                        value={getUserName(maintenance.reportedBy)}
                      />

                      <DetailItem
                        label="Assigned To"
                        value={getUserName(maintenance.assignedTo)}
                      />

                      <DetailItem
                        label="Priority"
                        value={maintenance.priority}
                      />

                      <DetailItem
                        label="Created"
                        value={formatDate(
                          maintenance.createdAt,
                          "DD MMMM, YYYY",
                        )}
                      />

                      <DetailItem
                        label="Completed"
                        value={formatDate(
                          maintenance.completedDate,
                          "DD MMMM, YYYY",
                        )}
                      />

                      <DetailItem
                        label="Repair Cost"
                        value={
                          maintenance.repairCost !== undefined
                            ? `₹${Number(maintenance.repairCost).toLocaleString(
                                "en-IN",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                },
                              )}`
                            : "-"
                        }
                      />
                    </div>

                    {maintenance.description && (
                      <div className="mt-4 border-t pt-4">
                        <p className="text-xs text-muted-foreground">
                          Description
                        </p>

                        <p className="mt-1 whitespace-pre-wrap text-sm">
                          {maintenance.description}
                        </p>
                      </div>
                    )}

                    {maintenance.repairNotes && (
                      <div className="mt-4 border-t pt-4">
                        <p className="text-xs text-muted-foreground">
                          Repair Notes
                        </p>

                        <p className="mt-1 whitespace-pre-wrap text-sm">
                          {maintenance.repairNotes}
                        </p>
                      </div>
                    )}

                    {maintenance.partsReplaced && (
                      <div className="mt-4 border-t pt-4">
                        <p className="text-xs text-muted-foreground">
                          Parts Replaced
                        </p>

                        <p className="mt-1 text-sm">
                          {maintenance.partsReplaced}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* AUDIT INFORMATION */}
        {(asset.createdAt || asset.updatedAt) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-5 w-5" />
                Record Information
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 mb-1">
                <DetailItem
                  label="Created"
                  value={formatDateTime(
                    asset.createdAt,
                    "DD MMMM, YYYY h:mm A",
                  )}
                />

                <DetailItem
                  label="Last Updated"
                  value={formatDateTime(
                    asset.updatedAt,
                    "DD MMMM, YYYY h:mm A",
                  )}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
}
