import { createAsyncThunk } from "@reduxjs/toolkit";

import branchService from "../api/branchService";

export const fetchBranches = createAsyncThunk(
    "branch/fetchBranches",
    async (params = {}, thunkAPI) => {
        try {
            return await branchService.getBranches(params);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                }
            );
        }
    }
);

export const fetchBranchById = createAsyncThunk(
    "branch/fetchBranchById",
    async (id, thunkAPI) => {
        try {
            return await branchService.getBranch(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                }
            );
        }
    }
);

export const createBranch = createAsyncThunk(
    "branch/createBranch",
    async (branchData, thunkAPI) => {
        try {
            return await branchService.createBranch(branchData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                }
            );
        }
    }
);

export const updateBranch = createAsyncThunk(
    "branch/updateBranch",
    async ({ id, branchData }, thunkAPI) => {
        try {
            return await branchService.updateBranch({ id, branchData });
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                }
            );
        }
    }
);

export const changeBranchStatus = createAsyncThunk(
    "branch/changeBranchStatus",
    async ({ id, isActive }, thunkAPI) => {
        try {
            return await branchService.changeBranchStatus({
                id,
                isActive,
            });
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                }
            );
        }
    }
);