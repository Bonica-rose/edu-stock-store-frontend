import { Badge } from "@/components/ui/badge";
import pluralize from "pluralize";
import { formatDate, formatDateTime } from "@/shared/utils/dateFormatter";

const MOVEMENT_TYPE_CONFIG = {
  "Stock In": {
    label: "Stock In",
    className: "bg-green-100 text-green-700 border-green-200",
  },

  "Stock Out": {
    label: "Stock Out",
    className: "bg-red-100 text-red-700 border-red-200",
  },

  Transfer: {
    label: "Transfer",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },

  Adjustment: {
    label: "Adjustment",
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },
};

const getMovementType = (type) => {
  return (
    MOVEMENT_TYPE_CONFIG[type] ?? {
      label: type ?? "-",
      className: "bg-muted text-muted-foreground",
    }
  );
};

function DetailItem({ label, children }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>

      <div className="text-sm font-medium">{children ?? "-"}</div>
    </div>
  );
}

export default function StockMovementDetails({ movement }) {
  const movementType = getMovementType(movement.movementType);

  const performedBy = movement.performedBy
    ? `${movement.performedBy.firstName ?? ""} ${
        movement.performedBy.lastName ?? ""
      }`.trim()
    : "-";

  return (
    <div className="bg-white rounded-lg border border-muted p-3">
      <div className="space-y-4">
        {/* MOVEMENT INFORMATION */}
        <section className="rounded-lg border">
          <div className="border-b px-4 py-3">
            <h2 className="text-sm font-semibold text-blue-900">
              Movement Information
            </h2>
          </div>

          <div className="grid gap-5 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <DetailItem label="Movement Type">
              <Badge className={movementType.className}>
                {movementType.label}
              </Badge>
            </DetailItem>

            <DetailItem label="Date">
              {formatDate(movement.createdAt, "DD MMMM, YYYY")}
            </DetailItem>

            <DetailItem label="Quantity">
              {movement.quantity}{" "}
              {pluralize(movement.inventory?.unit, movement.quantity)}
            </DetailItem>

            <DetailItem label="Performed By">{performedBy}</DetailItem>
          </div>
        </section>

        {/* INVENTORY INFORMATION */}
        <section className="rounded-lg border">
          <div className="border-b px-4 py-3">
            <h2 className="text-sm font-semibold text-blue-900">
              Inventory Information
            </h2>
          </div>

          <div className="grid gap-5 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <DetailItem label="SKU">{movement.inventory?.sku}</DetailItem>

            <DetailItem label="Item Name">
              {movement.inventory?.itemName}
            </DetailItem>

            <DetailItem label="Branch">
              {movement.branch?.branchName}
            </DetailItem>

            <DetailItem label="Inventory Date">
              {formatDateTime(
                movement.inventory?.createdAt,
                "DD MMM, YYYY h:mm A",
              )}
            </DetailItem>
          </div>
        </section>

        {/* STOCK INFORMATION */}
        <section className="rounded-lg border">
          <div className="border-b px-4 py-3">
            <h2 className="text-sm font-semibold text-blue-900">
              Stock Information
            </h2>
          </div>

          <div className="grid gap-5 p-4 sm:grid-cols-3">
            <DetailItem label="Previous Stock">
              {movement.previousStock}
            </DetailItem>

            <DetailItem label="Quantity">{movement.quantity}</DetailItem>

            <DetailItem label="New Stock">{movement.newStock}</DetailItem>
          </div>
        </section>

        {/* TRANSFER INFORMATION */}
        {movement.movementType === "Transfer" && (
          <section className="rounded-lg border">
            <div className="border-b px-4 py-3">
              <h2 className="text-sm font-semibold text-blue-900">
                Transfer Information
              </h2>
            </div>

            <div className="grid gap-5 p-4 sm:grid-cols-2">
              <DetailItem label="From Branch">
                {movement.fromBranch?.branchName}
              </DetailItem>

              <DetailItem label="To Branch">
                {movement.toBranch?.branchName}
              </DetailItem>
            </div>
          </section>
        )}

        {/* REASON & REMARKS */}
        <section className="rounded-lg border">
          <div className="border-b px-4 py-3">
            <h2 className="text-sm font-semibold text-blue-900">
              Reason & Remarks
            </h2>
          </div>

          <div className="grid gap-5 p-4 sm:grid-cols-2">
            <DetailItem label="Reason">{movement.reason}</DetailItem>

            <DetailItem label="Remarks">{movement.remarks || "-"}</DetailItem>
          </div>
        </section>
      </div>
    </div>
  );
}
