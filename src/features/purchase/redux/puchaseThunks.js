import { createAsyncThunk } from "@reduxjs/toolkit";
import purchaseService from "../api/purchaseService";

export const fetchPurchases = createAsyncThunk(
    "purchase/fetchPurchases",
    async (params = {}, thunkAPI) => {
        try {
            return await purchaseService.getPurchases(params);
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

export const fetchPurchaseById = createAsyncThunk(
    "purchase/fetchPurchaseById",
    async (id, thunkAPI) => {
        try {
            return await purchaseService.getPurchase(id);
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

export const createPurchase = createAsyncThunk(
    "purchase/createPurchase",
    async (purchaseData, thunkAPI) => {
        try {
            return await purchaseService.createPurchase(purchaseData);
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
