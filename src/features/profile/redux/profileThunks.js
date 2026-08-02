import { createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "../api/profile.service";

export const fetchProfile = createAsyncThunk(
    "profile/fetchProfile",
    async (_, thunkAPI) => {
        try {
            return await profileService.getProfile();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data
            );
        }
    }
);

export const updateProfile = createAsyncThunk(
    "profile/updateProfile",
    async (profileData, thunkAPI) => {
        try {
            return await profileService.updateProfile(profileData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data
            );
        }
    }
);

export const changePassword = createAsyncThunk(
    "profile/changePassword",
    async (passwordData, thunkAPI) => {
        try {
            return await profileService.changePassword(passwordData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data
            );
        }
    }
);