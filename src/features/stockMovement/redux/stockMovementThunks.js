import { createAsyncThunk } from "@reduxjs/toolkit";

import stockMovementService from "../api/stockMovementService";

// Get Stock Movements
export const fetchStockMovements = createAsyncThunk(
    "stockMovement/fetchStockMovements",
    async (params = {}, thunkAPI) => {
        try {
            return await stockMovementService.getStockMovements(params);
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

// Get Stock Movement by ID
export const fetchStockMovementById = createAsyncThunk(
    "stockMovement/fetchStockMovementById",
    async (id, thunkAPI) => {
        try {
            return await stockMovementService.getStockMovementById(id);
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

// Stock In
export const stockIn = createAsyncThunk(
    "stockMovement/stockIn",
    async (movementData, thunkAPI) => {
        try {
            return await stockMovementService.stockIn(movementData);
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

// Stock Out
export const stockOut = createAsyncThunk(
    "stockMovement/stockOut",
    async (movementData, thunkAPI) => {
        try {
            return await stockMovementService.stockOut(movementData);
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

// Transfer Stock
export const transferStock = createAsyncThunk(
    "stockMovement/transferStock",
    async (movementData, thunkAPI) => {
        try {
            return await stockMovementService.transferStock(movementData);
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

// Stock Adjustment
export const adjustStock = createAsyncThunk(
    "stockMovement/adjustStock",
    async (movementData, thunkAPI) => {
        try {
            return await stockMovementService.adjustStock(movementData);
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
