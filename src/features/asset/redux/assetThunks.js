import { createAsyncThunk } from "@reduxjs/toolkit";

import assetService from "../api/assetService";

// Get Assets
export const fetchAssets = createAsyncThunk(
    "asset/fetchAssets",
    async (params = {}, thunkAPI) => {
        try {
            return await assetService.getAssets(params);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                },
            );
        }
    },
);

// Get Asset by ID
export const fetchAssetById = createAsyncThunk(
    "asset/fetchAssetById",
    async (id, thunkAPI) => {
        try {
            return await assetService.getAssetById(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                },
            );
        }
    },
);

// Create Asset
export const createAsset = createAsyncThunk(
    "asset/createAsset",
    async (assetData, thunkAPI) => {
        try {
            return await assetService.createAsset(assetData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                },
            );
        }
    },
);

// Update Asset
export const updateAsset = createAsyncThunk(
    "asset/updateAsset",
    async ({ id, assetData }, thunkAPI) => {
        try {
            return await assetService.updateAsset(id, assetData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                },
            );
        }
    },
);

// Change Asset Status
export const changeAssetStatus = createAsyncThunk(
    "asset/changeAssetStatus",
    async (id, thunkAPI) => {
        try {
            return await assetService.changeAssetStatus(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                },
            );
        }
    },
);

// Delete Asset
export const deleteAsset = createAsyncThunk(
    "asset/deleteAsset",
    async (id, thunkAPI) => {
        try {
            return await assetService.deleteAsset(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                },
            );
        }
    },
);

// Assign Asset
export const assignAsset = createAsyncThunk(
    "asset/assignAsset",
    async ({ id, assignmentData }, thunkAPI) => {
        try {
            return await assetService.assignAsset(id, assignmentData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                },
            );
        }
    },
);

// Return Asset
export const returnAsset = createAsyncThunk(
    "asset/returnAsset",
    async ({ id, returnData }, thunkAPI) => {
        try {
        return await assetService.returnAsset(id, returnData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                },
            );
        }
    },
);
