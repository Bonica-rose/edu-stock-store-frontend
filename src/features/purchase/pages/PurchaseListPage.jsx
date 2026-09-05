import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import { fetchPurchases } from "../redux/puchaseThunks";
import { fetchBranches } from "../../branch/redux/branchThunks";
import { fetchVendors } from "../../vendor/redux/vendorThunks";
import PurchaseTable from "../components/PurchaseTable";
import { TablePagination, TableToolbar } from "@/shared/components/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BranchFilter from "@/shared/components/filters/BranchFilter";
import VendorFilter from "@/shared/components/filters/VendorFilter";
import DatePicker from "@/shared/components/DatePicker";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

export default function PurchaseListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hasPermission } = usePermission();

  const canCreate = hasPermission(PERMISSIONS.PURCHASE_CREATE);

  const { purchases, pagination, loading } = useSelector(
    (state) => state.purchase,
  );
  const branches = useSelector((state) => state.branch.branches);
  const vendors = useSelector((state) => state.vendor.vendors);

  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    vendor: "",
    branch: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    dispatch(fetchPurchases(query));
  }, [dispatch, query]);

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchVendors());
  }, [dispatch]);

  const handleCreatePurchase = () => {
    navigate("/edu/purchases/new");
  };

  const handleView = (purchase) => {
    navigate(`/edu/purchases/${purchase._id}`);
  };

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <TableToolbar>
            <DatePicker
              value={query.startDate}
              onChange={(startDate) =>
                setQuery((prev) => ({
                  ...prev,
                  startDate,
                  page: 1,
                }))
              }
              className="w-40"
              placeholder="Start Date"
            />
            <DatePicker
              value={query.endDate}
              onChange={(endDate) =>
                setQuery((prev) => ({
                  ...prev,
                  endDate,
                  page: 1,
                }))
              }
              className="w-40"
              placeholder="End Date"
            />
            <VendorFilter
              value={query.vendor}
              vendors={vendors}
              onChange={(vendor) =>
                setQuery((prev) => ({
                  ...prev,
                  vendor,
                  page: 1,
                }))
              }
            />
            <BranchFilter
              value={query.branch}
              branches={branches}
              onChange={(branch) =>
                setQuery((prev) => ({
                  ...prev,
                  branch,
                  page: 1,
                }))
              }
            />
            {canCreate && (
              <Button
                onClick={handleCreatePurchase}
                className="flex items-center gap-2 rounded-lg bg-blue-950 px-2 py-1 text-white hover:bg-blue-900"
              >
                <Plus className="h-4 w-4" />
                Create Purchase
              </Button>
            )}
          </TableToolbar>

          <PurchaseTable
            purchases={purchases}
            loading={loading.purchases}
            onView={handleView}
          />

          <TablePagination
            pagination={pagination}
            onPageChange={(page) =>
              setQuery((prev) => ({
                ...prev,
                page,
              }))
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
