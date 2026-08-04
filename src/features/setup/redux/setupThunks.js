import { createAsyncThunk } from "@reduxjs/toolkit";

import setupService from "../api/setup.service";

export const getSetupStatus = createAsyncThunk(
    "setup/getStatus",
    async (_, thunkAPI) => {
        try {
            return await setupService.getSetupStatus();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Unable to check setup status.",
                }
            );
        }
    }
);

export const initializeSystem = createAsyncThunk(
    "setup/initialize",
    async (setupData, thunkAPI) => {
        try {
            return await setupService.initializeSystem(setupData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "System initialization failed.",
                }
            );
        }
    }
);