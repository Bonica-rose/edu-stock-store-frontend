import { createAsyncThunk } from "@reduxjs/toolkit";
import aiService from "../api/aiService";

export const fetchDashboardAIPredictions = createAsyncThunk(
    "ai/fetchDashboardPredictions",
    async (_, { rejectWithValue }) => {
        try {
            return await aiService.getDashboardPredictions();
        } catch (error) {
            return rejectWithValue(
                error.response?.data ?? {
                    message: "Failed to generate AI inventory predictions.",
                },
            );
        }
    },
);

export const fetchInventoryAIPrediction = createAsyncThunk(
    "ai/fetchInventoryPrediction",
    async (inventoryId, { rejectWithValue }) => {
        try {
            return await aiService.getInventoryPrediction(inventoryId);
        } catch (error) {
            return rejectWithValue(
                error.response?.data ?? {
                    message: "Failed to generate AI inventory prediction.",
                },
            );
        }
    },
);
