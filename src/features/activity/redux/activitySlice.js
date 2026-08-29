import { createSlice } from "@reduxjs/toolkit";

import { fetchActivities, fetchActivity } from "./activityThunks";

const initialState = {
    activities: [],

    pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
    },

    selectedActivity: null,

    loading: {
        list: false,
        details: false,
    },

    error: {
        list: null,
        details: null,
    },
};

const activitySlice = createSlice({
    name: "activity",

    initialState,

    reducers: {
        clearSelectedActivity: (state) => {
            state.selectedActivity = null;
            state.error.details = null;
        },

        clearActivityErrors: (state) => {
            state.error.list = null;
            state.error.details = null;
        },
    },

    extraReducers: (builder) => {
        builder

        // Fetch Activities
        .addCase(fetchActivities.pending, (state) => {
            state.loading.list = true;
            state.error.list = null;
        })
        .addCase(fetchActivities.fulfilled, (state, action) => {
            state.loading.list = false;
            state.activities = action.payload.data;
            state.pagination = action.payload.meta;
        })
        .addCase(fetchActivities.rejected, (state, action) => {
            state.loading.list = false;

            state.error.list =
            action.payload?.message || "Failed to fetch activity logs.";
        })

        // Fetch Activity
        .addCase(fetchActivity.pending, (state) => {
            state.loading.details = true;
            state.error.details = null;
            state.selectedActivity = null;
        })
        .addCase(fetchActivity.fulfilled, (state, action) => {
            state.loading.details = false;
            state.selectedActivity = action.payload.data;
        })
        .addCase(fetchActivity.rejected, (state, action) => {
            state.loading.details = false;

            state.error.details =
            action.payload?.message || "Failed to fetch activity log.";
        });
    },
});

export const {
    clearSelectedActivity,
    clearActivityErrors
} = activitySlice.actions;

export default activitySlice.reducer;
