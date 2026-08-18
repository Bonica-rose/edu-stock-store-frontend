import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchBranches } from "@/features/branch/redux/branchThunks";
import { fetchInventories } from "@/features/inventory/redux/inventoryThunks";

export default function useInventoryFormOptions() {
    const dispatch = useDispatch();

    const { branches, loading: branchLoading } = useSelector(
        (state) => state.branch,
    );

    const { inventories, loading: inventoryLoading } = useSelector(
        (state) => state.inventory,
    );

    useEffect(() => {
        if (!inventories.length) {
            dispatch(
                fetchInventories({
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
    }, [dispatch, inventories.length, branches.length]);

    return {
        inventories,
        branches,

        loading: inventoryLoading.inventories || branchLoading.branches,
    };
}