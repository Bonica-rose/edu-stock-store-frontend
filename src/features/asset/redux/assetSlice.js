import { createSlice } from "@reduxjs/toolkit";

import {
    fetchAssets,
    fetchAssetById,
    createAsset,
    updateAsset,
    changeAssetStatus,
    deleteAsset,
    assignAsset,
    returnAsset,
} from "./assetThunks";

const initialState = {
    assets: [],
    asset: null,
    pagination: null,

    loading: {
        assets: false,
        asset: false,
        create: false,
        update: false,
        changeStatus: false,
        delete: false,
        assign: false,
        return: false,
    },

    error: null,
};

const assetSlice = createSlice({
    name: "asset",

    initialState,

    reducers: {
        clearCurrentAsset(state) {
            state.asset = null;
        },

        clearAssetError(state) {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

        // FETCH ASSETS
        .addCase(fetchAssets.pending, (state) => {
            state.loading.assets = true;
            state.error = null;
        })
        .addCase(fetchAssets.fulfilled, (state, action) => {
            state.loading.assets = false;

            state.assets = action.payload.data;
            state.pagination = action.payload.meta;
        })
        .addCase(fetchAssets.rejected, (state, action) => {
            state.loading.assets = false;

            state.error = action.payload?.message ?? "Failed to fetch assets.";
        })

        // FETCH ASSET BY ID
        .addCase(fetchAssetById.pending, (state) => {
            state.loading.asset = true;
            state.error = null;
        })
        .addCase(fetchAssetById.fulfilled, (state, action) => {
            state.loading.asset = false;

            state.asset = action.payload.data;
        })
        .addCase(fetchAssetById.rejected, (state, action) => {
            state.loading.asset = false;

            state.error = action.payload?.message ?? "Failed to fetch asset.";
        })

        // CREATE ASSET
        .addCase(createAsset.pending, (state) => {
            state.loading.create = true;
            state.error = null;
        })
        .addCase(createAsset.fulfilled, (state) => {
            state.loading.create = false;
        })
        .addCase(createAsset.rejected, (state, action) => {
            state.loading.create = false;

            state.error = action.payload?.message ?? "Failed to create asset.";
        })

        // UPDATE ASSET
        .addCase(updateAsset.pending, (state) => {
            state.loading.update = true;
            state.error = null;
        })
        .addCase(updateAsset.fulfilled, (state) => {
            state.loading.update = false;
        })
        .addCase(updateAsset.rejected, (state, action) => {
            state.loading.update = false;

            state.error = action.payload?.message ?? "Failed to update asset.";
        })

        // CHANGE STATUS
        .addCase(changeAssetStatus.pending, (state) => {
            state.loading.changeStatus = true;
            state.error = null;
        })
        .addCase(changeAssetStatus.fulfilled, (state) => {
            state.loading.changeStatus = false;
        })
        .addCase(changeAssetStatus.rejected, (state, action) => {
            state.loading.changeStatus = false;

            state.error =
            action.payload?.message ?? "Failed to change asset status.";
        })

        // DELETE ASSET
        .addCase(deleteAsset.pending, (state) => {
            state.loading.delete = true;
            state.error = null;
        })
        .addCase(deleteAsset.fulfilled, (state) => {
            state.loading.delete = false;
        })
        .addCase(deleteAsset.rejected, (state, action) => {
            state.loading.delete = false;

            state.error = action.payload?.message ?? "Failed to delete asset.";
        })

        // ASSIGN ASSET
        .addCase(assignAsset.pending, (state) => {
            state.loading.assign = true;
            state.error = null;
        })
        .addCase(assignAsset.fulfilled, (state) => {
            state.loading.assign = false;
        })
        .addCase(assignAsset.rejected, (state, action) => {
            state.loading.assign = false;

            state.error = action.payload?.message ?? "Failed to assign asset.";
        })

        // RETURN ASSET
        .addCase(returnAsset.pending, (state) => {
            state.loading.return = true;
            state.error = null;
        })
        .addCase(returnAsset.fulfilled, (state) => {
            state.loading.return = false;
        })
        .addCase(returnAsset.rejected, (state, action) => {
            state.loading.return = false;

            state.error = action.payload?.message ?? "Failed to return asset.";
        });
    },
});

export const { clearCurrentAsset, clearAssetError } = assetSlice.actions;

export default assetSlice.reducer;
