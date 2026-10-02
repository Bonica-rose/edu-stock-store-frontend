import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssets } from "@/features/asset/redux/assetThunks";
import { fetchBranches } from "@/features/branch/redux/branchThunks";
import { fetchUsers } from "@/features/user/redux/userThunks";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";


export default function useMaintenanceFormOptions() {
  const dispatch = useDispatch();
  const { hasPermission } = usePermission();

  const { assets, loading: assetLoading } = useSelector((state) => state.asset);
  const { branches, loading: branchLoading } = useSelector((state) => state.branch);
  const { users, loading: userLoading } = useSelector((state) => state.user);

  const canViewMaintenanceFilters = hasPermission(PERMISSIONS.MAINTENANCE_FILTER_VIEW);

  useEffect(() => {
    if (!assets.length) {
      dispatch(
        fetchAssets({
          page: 1,
          limit: 100,
          isActive: "true",
        }),
      );
    }
  }, [dispatch, assets.length]);

  useEffect(() => {
    if (!canViewMaintenanceFilters) {
      return;
    }

    if (!branches.length) {
      dispatch(
        fetchBranches({
          page: 1,
          limit: 100,
          isActive: "true",
        }),
      );
    }
  }, [dispatch, branches.length, canViewMaintenanceFilters]);

  useEffect(() => {
    if (!canViewMaintenanceFilters) {
      return;
    }

    if (!users.length) {
      dispatch(
        fetchUsers({
          page: 1,
          limit: 100,
          isActive: "true",
        }),
      );
    }
  }, [dispatch, users.length, canViewMaintenanceFilters]);

  return {
    assets,
    branches: canViewMaintenanceFilters ? branches : [],
    users: canViewMaintenanceFilters ? users : [],
    optionsLoading: {
      assets: assetLoading.assets,
      branches: branchLoading.branches,
      users: userLoading.users,
    },
    canViewMaintenanceFilters,
  };
}
