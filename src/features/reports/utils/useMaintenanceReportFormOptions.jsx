import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ROLES } from "@/shared/constants/roles";
import { fetchVendors } from "@/features/vendor/redux/vendorThunks";
import { fetchBranches } from "@/features/branch/redux/branchThunks";

export const useMaintenanceReportFormOptions = () => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.user);

  const { vendors } = useSelector((state) => state.vendor);
  const { branches } = useSelector((state) => state.branch);

  const canViewBranchFilter = authUser?.role === ROLES.SUPER_ADMIN;

  useEffect(() => {
      // Vendors are required for Maintenance Report
      if (!vendors?.length) {
      dispatch(
          fetchVendors({
            page: 1,
            limit: 100,
          }),
      );
      }
  }, [dispatch, vendors?.length]);

  useEffect(() => {
    // Branches are required only for Super Admin
    if (canViewBranchFilter && !branches?.length) {
      dispatch(
        fetchBranches({
          page: 1,
          limit: 100,
        }),
      );
    }
  }, [dispatch, canViewBranchFilter, branches?.length]);

  return {
    vendors: vendors ?? [],
    branches: canViewBranchFilter ? (branches ?? []) : [],
    canViewBranchFilter,
  };
};
