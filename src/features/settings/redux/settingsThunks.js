import { createAsyncThunk } from "@reduxjs/toolkit";
import settingsService from "../api/settings.service";

export const fetchSettings = createAsyncThunk(
    "settings/fetchSettings",
    async (_, thunkAPI) => {
        try {
            return await settingsService.getSettings();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data
            );
        }
    }
);

export const updateSettings = createAsyncThunk(
    "settings/updateSettings",
    async (settingsData, thunkAPI) => {
        try {
            return await settingsService.updateSettings(settingsData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data
            );
        }
    }
);