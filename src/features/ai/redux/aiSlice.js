import { createSlice } from "@reduxjs/toolkit";
import {
    fetchDashboardAIPredictions,
    fetchInventoryAIPrediction,
} from "./aiThunks";

const initialState = {
    dashboard: {
        data: null,
        loading: false,
        error: null,
    },
    inventory: {
        data: null,
        loading: false,
        error: null,
    },
};

const aiSlice = createSlice({
    name: "ai",
    initialState,
    reducers: {
        clearAIDashboard(state) {
            state.dashboard.data = null;
            state.dashboard.error = null;
        },
        clearAIInventory(state) {
            state.inventory.data = null;
            state.inventory.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardAIPredictions.pending, (state) => {
                state.dashboard.loading = true;
                state.dashboard.error = null;
            })
            .addCase(fetchDashboardAIPredictions.fulfilled, (state, action) => {
                state.dashboard.loading = false;
                state.dashboard.data = action.payload.data;
            })
            .addCase(fetchDashboardAIPredictions.rejected, (state, action) => {
                state.dashboard.loading = false;
                state.dashboard.error =
                    action.payload?.message ||
                    "Failed to generate AI inventory predictions.";
            })

            .addCase(fetchInventoryAIPrediction.pending, (state) => {
                state.inventory.loading = true;
                state.inventory.error = null;
            })
            .addCase(fetchInventoryAIPrediction.fulfilled, (state, action) => {
                state.inventory.loading = false;
                state.inventory.data = action.payload.data;
            })
            .addCase(fetchInventoryAIPrediction.rejected, (state, action) => {
                state.inventory.loading = false;
                state.inventory.error =
                    action.payload?.message ||
                    "Failed to generate AI inventory prediction.";
            });
    },
});

export const { clearAIDashboard, clearAIInventory } = aiSlice.actions;

export default aiSlice.reducer;
