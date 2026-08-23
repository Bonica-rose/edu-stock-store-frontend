import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBranches } from "@/features/branch/redux/branchThunks";
import { fetchInventories } from "@/features/inventory/redux/inventoryThunks";
import { fetchUsers } from "@/features/user/redux/userThunks";

export default function useAssetFormOptions() {
    const dispatch = useDispatch();

    const { branches, loading: branchLoading } = useSelector(
        (state) => state.branch,
    );

    const { inventories, loading: inventoryLoading } = useSelector(
        (state) => state.inventory,
    );

    const { users, loading: userLoading } = useSelector((state) => state.user);

    useEffect(() => {
        if (!inventories.length) {
        dispatch(
          fetchInventories({
            page: 1,
            limit: 100,
            isActive: "true",
            itemType: "ASSET",
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

        if (!users.length) {
        dispatch(
            fetchUsers({
            page: 1,
            limit: 100,
            isActive: "true",
            }),
        );
        }
    }, [dispatch, inventories.length, branches.length, users.length]);

    return {
        inventories,
        branches,
        users,

        loading:
            inventoryLoading.inventories ||
            branchLoading.branches ||
            userLoading.users,
    };
}
