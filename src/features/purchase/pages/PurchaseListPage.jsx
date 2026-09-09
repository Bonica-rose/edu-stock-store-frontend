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
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROLES } from "@/shared/constants/roles";
import PurchaseFilter from "../components/PurchaseFilter";

export default function PurchaseListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hasPermission } = usePermission();

  const canCreate = hasPermission(PERMISSIONS.PURCHASE_CREATE);

  const { purchases, pagination, loading } = useSelector((state) => state.purchase);
  const branches = useSelector((state) => state.branch.branches);
  const vendors = useSelector((state) => state.vendor.vendors);
  const currentUser = useSelector((state) => state.auth.user);
  const isBranchAdmin = currentUser?.role === ROLES.BRANCH_ADMIN;

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
        <div className="space-y-1">
          <TableToolbar>
            {canCreate && (
              <Button
                onClick={handleCreatePurchase}
                className="flex items-center gap-2 rounded-lg bg-blue-900 px-2 py-1 text-white hover:bg-blue-900/80"
              >
                <Plus className="h-4 w-4" />
                Create Purchase
              </Button>
            )}
          </TableToolbar>

          {/* Filters */}
          <PurchaseFilter
            startDate={query.startDate}
            endDate={query.endDate}
            vendor={query.vendor}
            branch={query.branch}
            vendors={vendors}
            branches={branches}
            isBranchAdmin={isBranchAdmin}
            onStartDateChange={(startDate) =>
              setQuery((prev) => ({
                ...prev,
                startDate,
                page: 1,
              }))
            }
            onEndDateChange={(endDate) =>
              setQuery((prev) => ({
                ...prev,
                endDate,
                page: 1,
              }))
            }
            onVendorChange={(vendor) =>
              setQuery((prev) => ({
                ...prev,
                vendor,
                page: 1,
              }))
            }
            onBranchChange={(branch) =>
              setQuery((prev) => ({
                ...prev,
                branch,
                page: 1,
              }))
            }
          />

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
