import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCategories } from "@/features/category/redux/categoryThunks";
import { fetchVendors } from "@/features/vendor/redux/vendorThunks";
import { fetchBranches } from "@/features/branch/redux/branchThunks";

export default function useInventoryFormOptions() {
    const dispatch = useDispatch();

    const { categories, loading: categoryLoading } = useSelector(
        (state) => state.category,
    );

    const { vendors, loading: vendorLoading } = useSelector(
        (state) => state.vendor,
    );

    const { branches, loading: branchLoading } = useSelector(
        (state) => state.branch,
    );

    useEffect(() => {
        if (!categories.length) {
        dispatch(
            fetchCategories({
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

        if (!branches.length) {
        dispatch(
            fetchBranches({
                page: 1,
                limit: 100,
                isActive: "true",
            }),
        );
        }
    }, [dispatch, categories.length, vendors.length, branches.length]);

    return {
        categories,
        vendors,
        branches,

        loading:
            categoryLoading.categories ||
            vendorLoading.vendors ||
            branchLoading.branches,
    };
}
