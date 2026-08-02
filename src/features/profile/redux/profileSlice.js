import { createSlice } from "@reduxjs/toolkit";
import {
    fetchProfile,
    updateProfile,
    changePassword,
} from "./profileThunks";

const initialState = {
    profile: null,

    loading: {
        fetch: false,
        update: false,
        changePassword: false,
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

            // Fetch Profile
            .addCase(fetchProfile.pending, (state) => {
                state.loading.fetch = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading.fetch = false;
                state.profile = action.payload.data;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading.fetch = false;
                state.error = action.payload?.message;
            })

            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.loading.update = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading.update = false;
                state.profile = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading.update = false;
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