import { createSlice } from "@reduxjs/toolkit";
import {
    fetchProfileActivity,
    updateProfile,
    changePassword,
} from "./profileThunks";

const initialState = {
    activity: [],

    loading: {
        update: false,
        changePassword: false,
        activity: false,
    },

    error: null,
    message: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        clearProfileMessage(state) {
            state.message = null;
        },

        clearProfileError(state) {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.loading.update = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading.update = false;
                state.message = action.payload.message;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading.update = false;
                state.error = action.payload?.message;
            })

            // Fetch Current User Recent Activity
            .addCase(fetchProfileActivity.pending, (state) => {
                state.loading.activity = true;
            })
            .addCase(fetchProfileActivity.fulfilled, (state, action) => {
                state.loading.activity = false;
                state.activity = action.payload.data;
            })
            .addCase(fetchProfileActivity.rejected, (state, action) => {
                state.loading.activity = false;
                state.error = action.payload?.message;
            })

            // Change Password
            .addCase(changePassword.pending, (state) => {
                state.loading.changePassword = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.loading.changePassword = false;
                state.message = action.payload.message;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading.changePassword = false;
                state.error = action.payload?.message;
            });
    },
});

export const {
    clearProfileError,
    clearProfileMessage,
} = profileSlice.actions;

export default profileSlice.reducer;