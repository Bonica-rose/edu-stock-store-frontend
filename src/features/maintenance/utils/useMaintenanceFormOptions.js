import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranches } from "@/features/branch/redux/branchThunks";
import { fetchVendors } from "@/features/vendor/redux/vendorThunks";
import { fetchUsers } from "@/features/user/redux/userThunks";
import { fetchAssets } from "@/features/asset/redux/assetThunks";

export default function useAssetFormOptions() {
    const dispatch = useDispatch();

    const { branches, loading: branchLoading } = useSelector((state) => state.branch);
    const { vendors, loading: vendorLoading } = useSelector((state) => state.vendor);
    const { users, loading: userLoading } = useSelector((state) => state.user);
    const { assets, loading: assetLoading } = useSelector((state) => state.asset);

    useEffect(() => {
      if (!users.length) {
        dispatch(
          fetchUsers({
            page: 1,
            limit: 100,
            isActive: "true",
          }),
        );
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

      if (!vendors.length) {
        dispatch(
          fetchVendors({
            page: 1,
            limit: 100,
            isActive: "true",
          }),
        );
      }

      if (!assets.length) {
        dispatch(
          fetchAssets({
            page: 1,
            limit: 100,
            isActive: "true",
          }),
        );
      }
    }, [
      dispatch,
      users.length,
      branches.length,
      vendors.length,
      assets.length,
    ]);

    return {
      users,
      branches,
      vendors,
      assets,

      loading:
        userLoading.users ||
        branchLoading.branches ||
        vendorLoading.vendors ||
        assetLoading.assets,
    };
}
