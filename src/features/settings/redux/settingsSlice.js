import { createSlice } from "@reduxjs/toolkit";
import {
    fetchSettings,
    updateSettings,
} from "./settingsThunks";

const initialState = {
    settings: {
        companyName: "",
        companyEmail: "",
        companyPhone: "",
        companyAddress: "",
        companyLogo: "",

        defaultCurrency: "INR",
        timezone: "Asia/Kolkata",
        dateFormat: "DD/MM/YYYY",

        lowStockQuantityThreshold: 10,
        predictionAlertDays: 10,
        predictionHistoryDays: 30,

        isMaintenanceMode: false,
    },

    loading: {
        fetch: false,
        update: false,
    },

    error: null,
    message: null,
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            // Fetch Settings
            .addCase(fetchSettings.pending, (state) => {
                state.loading.fetch = true;
                state.error = null;
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.loading.fetch = false;
                state.settings = action.payload.data;
            })
            .addCase(fetchSettings.rejected, (state, action) => {
                state.loading.fetch = false;
                state.error = action.payload?.message ?? "Failed to load settings.";
            })

            // Update Settings
            .addCase(updateSettings.pending, (state) => {
                state.loading.update = true;
                state.error = null;
            })
            .addCase(updateSettings.fulfilled, (state, action) => {
                state.loading.update = false;
                state.settings = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(updateSettings.rejected, (state, action) => {
                state.loading.update = false;
                state.error = action.payload?.message ?? "Failed to update settings.";
            });
    },
});

export default settingsSlice.reducer;