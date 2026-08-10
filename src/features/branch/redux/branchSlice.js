import { createSlice } from "@reduxjs/toolkit";

import {
    fetchBranches,
    fetchBranchById,
    createBranch,
    updateBranch,
    changeBranchStatus,
} from "./branchThunks";

const initialState = {
    branches: [],
    branch: null,

    pagination: null,

    loading: {
        branches: false,
        branch: false,
        create: false,
        update: false,
        status: false,
    },

    error: null,
};

const branchSlice = createSlice({
    name: "branch",
    initialState,

    reducers: {
        clearCurrentBranch(state) {
            state.branch = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // FETCH BRANCHES
            .addCase(fetchBranches.pending, (state) => {
                state.loading.branches = true;
                state.error = null;
            })
            .addCase(fetchBranches.fulfilled, (state, action) => {
                state.loading.branches = false;

                state.branches = action.payload.data;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchBranches.rejected, (state, action) => {
                state.loading.branches = false;
                state.error =
                    action.payload?.message ??
                    "Failed to fetch branches.";
            })

            // FETCH BRANCH
            .addCase(fetchBranchById.pending, (state) => {
                state.loading.branch = true;
                state.error = null;
            })
            .addCase(fetchBranchById.fulfilled, (state, action) => {
                state.loading.branch = false;
                state.branch = action.payload.data;
            })
            .addCase(fetchBranchById.rejected, (state, action) => {
                state.loading.branch = false;
                state.error =
                    action.payload?.message ??
                    "Failed to fetch branch.";
            })

            // CREATE BRANCH
            .addCase(createBranch.pending, (state) => {
                state.loading.create = true;
                state.error = null;
            })
            .addCase(createBranch.fulfilled, (state) => {
                state.loading.create = false;
            })
            .addCase(createBranch.rejected, (state, action) => {
                state.loading.create = false;
                state.error =
                    action.payload?.message ??
                    "Failed to create branch.";
            })

            // UPDATE BRANCH
            .addCase(updateBranch.pending, (state) => {
                state.loading.update = true;
                state.error = null;
            })
            .addCase(updateBranch.fulfilled, (state, action) => {
                state.loading.update = false;
                state.branch = action.payload.data;
            })
            .addCase(updateBranch.rejected, (state, action) => {
                state.loading.update = false;
                state.error =
                    action.payload?.message ??
                    "Failed to update branch.";
            })

            // CHANGE STATUS
            .addCase(changeBranchStatus.pending, (state) => {
                state.loading.status = true;
                state.error = null;
            })
            .addCase(changeBranchStatus.fulfilled, (state) => {
                state.loading.status = false;
            })
            .addCase(changeBranchStatus.rejected, (state, action) => {
                state.loading.status = false;
                state.error =
                    action.payload?.message ??
                    "Failed to change branch status.";
            });
    },
});

export const { clearCurrentBranch } = branchSlice.actions;

export default branchSlice.reducer;