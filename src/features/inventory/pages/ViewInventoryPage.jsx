import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/shared/components/PageHeader";

import { fetchInventoryById } from "../redux/inventoryThunks";
import Loader from "@/shared/components/Loader";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function ViewInventoryPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { hasPermission } = usePermission();

    const canUpdate = hasPermission(PERMISSIONS.INVENTORY_UPDATE);

    const { inventory, loading } = useSelector((state) => state.inventory);

    useEffect(() => {
        if (id) {
            dispatch(fetchInventoryById(id));
        }
    }, [dispatch, id]);

    const handleBack = () => {
        navigate("/edu/inventory");
    };

    const handleEdit = () => {
        navigate(`/edu/inventory/${id}/edit`);
    };

    if (loading.inventory || !inventory) {
        return <div><Loader /></div>;
    }

    const categoryName = inventory.category?.categoryName || "-";
    const vendorName = inventory.vendor?.vendorName || "-";
    const branchName = inventory.branch?.branchName || "-";

    return (
      <div className="space-y-4">
        {/* PAGE HEADER */}
        <PageHeader
          title="Inventory Details"
          description="View inventory item information and stock details."
          action={
            <div className="flex gap-2">
              <Button type="button" variant="secondary" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Inventory
              </Button>

              {canUpdate && <Button type="button" onClick={handleEdit}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>}
            </div>
          }
        />

        {/* ITEM SUMMARY */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-6 sm:flex-row">
              {/* ITEM IMAGE */}
              <div className="flex shrink-0 items-start justify-center">
                {inventory.itemImage ? (
                  <img
                    src={inventory.itemImage}
                    alt={inventory.itemName}
                    className="h-40 w-40 rounded-lg border object-cover"
                  />
                ) : (
                  <div className="flex h-40 w-40 items-center justify-center rounded-lg border bg-muted">
                    <Package className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* ITEM SUMMARY */}
              <div className="flex flex-1 flex-col justify-center gap-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-semibold">
                    {inventory.itemName}
                  </h2>

                  <Badge
                    variant={inventory.isActive ? "active" : "destructive"}
                  >
                    {inventory.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground">{inventory.sku}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* BASIC INFORMATION */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Basic Information</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <DetailItem label="Item Name" value={inventory.itemName} />

              <DetailItem label="SKU" value={inventory.sku} />

              <DetailItem label="Barcode" value={inventory.barcode || "-"} />

              <DetailItem label="Category" value={categoryName} />

              <DetailItem label="Vendor" value={vendorName} />

              <DetailItem label="Branch" value={branchName} />
            </div>
          </CardContent>
        </Card>

        {/* STOCK INFORMATION */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Stock Information</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <DetailItem
                label="Current Stock"
                value={inventory.currentStock ?? 0}
              />

              <DetailItem
                label="Minimum Stock"
                value={inventory.minimumStock ?? 0}
              />

              <DetailItem label="Unit" value={inventory.unit || "-"} />
            </div>
          </CardContent>
        </Card>

        {/* PURCHASE INFORMATION */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Purchase Information</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <DetailItem
                label="Current Purchase Price (Per Unit)"
                value={
                  inventory.purchasePrice !== undefined &&
                  inventory.purchasePrice !== null
                    ? `₹${Number(inventory.purchasePrice).toFixed(2)}`
                    : "-"
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* DESCRIPTION */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Description</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="whitespace-pre-wrap text-sm text-muted-foreground">
              {inventory.description || "No description available."}
            </p>
          </CardContent>
        </Card>
      </div>
    );
}

function DetailItem({ label, value }) {
    return (
        <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>

            <p className="text-sm font-medium">{value}</p>
        </div>
    );
}
