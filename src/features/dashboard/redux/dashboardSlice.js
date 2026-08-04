import { createSlice } from "@reduxjs/toolkit";

import { fetchDashboard } from "./dashboardThunks";

const initialState = {
    summary: {},
    recentActivities: [],

    loading: false,
    error: null,
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
            });
    },
});

export default dashboardSlice.reducer;