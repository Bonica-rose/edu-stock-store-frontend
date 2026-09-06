import { createSlice } from "@reduxjs/toolkit";

import {
    fetchDashboard,
    fetchStockMovementTrend,
    fetchInventoryByCategory,
    fetchStockHealth,
} from "./dashboardThunks";

const initialState = {
    summary: {},
    recentActivities: [],

    stockMovementTrend: [],
    inventoryByCategory: [],
    stockHealth: {},

    loading: false,
    analyticsLoading: false,

    error: null,
    analyticsError: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboard.fulfilled, (state, action) => {
                state.loading = false;

                state.summary = action.payload.data.summary ?? {};
                state.recentActivities =
                    action.payload.data.recentActivities ?? [];
            })
            .addCase(fetchDashboard.rejected, (state, action) => {
                state.loading = false;

                state.summary = {};
                state.recentActivities = [];

                state.error =
                    action.payload?.message ||
                    "Failed to load dashboard.";
            })
        
            // Stock movement
            .addCase(fetchStockMovementTrend.pending, (state) => {
                state.analyticsLoading = true;
                state.analyticsError = null;
            })
            .addCase(fetchStockMovementTrend.fulfilled, (state, action) => {
                state.stockMovementTrend =
                    action.payload.data ?? [];

                state.analyticsLoading = false;
            })
            .addCase(fetchStockMovementTrend.rejected, (state, action) => {
                state.analyticsLoading = false;

                state.stockMovementTrend = [];

                state.analyticsError =
                    action.payload?.message ||
                    "Failed to load stock movement trend.";
            })

            // Inventory by category
            .addCase(fetchInventoryByCategory.fulfilled, (state, action) => {
                state.inventoryByCategory =
                    action.payload.data ?? [];
            })
            .addCase(fetchInventoryByCategory.rejected, (state) => {
                state.inventoryByCategory = [];
            })

            // Stock health
            .addCase(fetchStockHealth.fulfilled, (state, action) => {
                state.stockHealth =
                    action.payload.data ?? {};
            })
            .addCase(fetchStockHealth.rejected, (state) => {
                state.stockHealth = {};
            });
    },
});

export default dashboardSlice.reducer;