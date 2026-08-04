import { createAsyncThunk } from "@reduxjs/toolkit";

import dashboardService from "../api/dashboardService";

export const fetchDashboard = createAsyncThunk(
    "dashboard/fetchDashboard",
    async (_, thunkAPI) => {
        try {
            return await dashboardService.getDashboard();
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