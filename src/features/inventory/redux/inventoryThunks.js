import { createAsyncThunk } from "@reduxjs/toolkit";

import inventoryService from "../api/inventoryService";

export const fetchInventories = createAsyncThunk(
    "inventory/fetchInventories",
    async (params = {}, thunkAPI) => {
        try {
            return await inventoryService.getInventories(params);
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

export const fetchInventoryById = createAsyncThunk(
    "inventory/fetchInventoryById",
    async (id, thunkAPI) => {
        try {
            return await inventoryService.getInventoryById(id);
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

export const createInventory = createAsyncThunk(
    "inventory/createInventory",
    async (inventoryData, thunkAPI) => {
        try {
            return await inventoryService.createInventory(inventoryData);
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

export const updateInventory = createAsyncThunk(
    "inventory/updateInventory",
    async ({ id, inventoryData }, thunkAPI) => {
        try {
            return await inventoryService.updateInventory(id, inventoryData);
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

export const changeInventoryStatus = createAsyncThunk(
    "inventory/changeInventoryStatus",
    async (id, thunkAPI) => {
        try {
            return await inventoryService.changeInventoryStatus(id);
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

export const deleteInventory = createAsyncThunk(
    "inventory/deleteInventory",
    async (id, thunkAPI) => {
        try {
            await inventoryService.deleteInventory(id);
            return id;
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
