import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const formatDate = (value) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(Number(value) || 0);
};

const getFullName = (user) => {
  if (!user) {
    return "-";
  }

  return `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || "-";
};

const PurchaseDetails = ({ purchase, loading = false }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <Skeleton className="h-5 w-48" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!purchase) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          Purchase not found.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Purchase Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[17px] text-blue-900">
            Purchase Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Purchase No</p>
              <p className="mt-1 font-medium">{purchase.purchaseNo ?? "-"}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Vendor</p>
              <p className="mt-1 font-medium">
                {purchase.vendor?.vendorName ?? "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Branch</p>
              <p className="mt-1 font-medium">
                {purchase.branch?.branchName ?? "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Purchase Date</p>
              <p className="mt-1 font-medium">
                {formatDate(purchase.purchaseDate)}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Created By</p>
              <p className="mt-1 font-medium">
                {getFullName(purchase.createdBy)}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Created At</p>
              <p className="mt-1 font-medium">
                {formatDate(purchase.createdAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Purchase Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[17px] text-blue-900">
            Purchase Items
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Purchase Price Per Unit</TableHead>
                  <TableHead className="text-right">Line Total</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {purchase.items?.length > 0 ? (
                  purchase.items.map((item, index) => {
                    const quantity = Number(item.quantity) || 0;
                    const purchasePrice = Number(item.purchasePrice) || 0;

                    const lineTotal = quantity * purchasePrice;

                    return (
                      <TableRow key={index}>
                        <TableCell>{item.inventory?.sku ?? "-"}</TableCell>

                        <TableCell>{item.inventory?.itemName ?? "-"}</TableCell>

                        <TableCell className="text-right">{quantity}</TableCell>

                        <TableCell className="text-right">
                          {formatCurrency(purchasePrice)}
                        </TableCell>

                        <TableCell className="text-right font-medium">
                          {formatCurrency(lineTotal)}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No purchase items found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex justify-end">
            <div className="min-w-64 rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center justify-between gap-8">
                <span className="text-sm font-medium">Total Amount</span>

                <span className="text-lg font-semibold text-blue-900">
                  {formatCurrency(purchase.totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[17px] text-blue-900">Notes</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="whitespace-pre-wrap text-sm text-muted-foreground">
            {purchase.notes || "No notes added."}
          </p>
        </CardContent>
      </Card>

      {/* Audit Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[17px] text-blue-900">
            Audit Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Created By</p>
              <p className="mt-1 font-medium">
                {getFullName(purchase.createdBy)}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Created At</p>
              <p className="mt-1 font-medium">
                {formatDate(purchase.createdAt)}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Updated By</p>
              <p className="mt-1 font-medium">
                {getFullName(purchase.updatedBy)}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Updated At</p>
              <p className="mt-1 font-medium">
                {formatDate(purchase.updatedAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseDetails;
