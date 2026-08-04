import { createSlice } from "@reduxjs/toolkit";
import {
    loginUser,
    logoutUser,
    fetchCurrentUser,
} from "./authThunks";

const initialState = {
    user: null,
    isAuthenticated: false,
    isInitialized: false, // auth check finished?

    loading: {
        login: false,
        logout: false,
        currentUser: false,
    },

    error: null,
    message: null,
    mustChangePassword: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthError(state) {
            state.error = null;
        },

        clearAuthMessage(state) {
            state.message = null;
        },

        resetAuthState() {
            return initialState;
        },

        setCurrentUser(state, action) {
            state.user = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            
        // LOGIN USER
        .addCase(loginUser.pending, (state) => {
            state.loading.login = true;
            state.error = null;
            state.message = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading.login = false;

            state.user = action.payload.data;
            state.isAuthenticated = true;
            state.isInitialized = true;

            state.mustChangePassword = action.payload.data.mustChangePassword;
            state.message = action.payload.message;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading.login = false;

            state.user = null;
            state.isAuthenticated = false;
            state.isInitialized = true;
            state.mustChangePassword = false;

            state.error = action.payload?.message || "Login failed.";
        })

        // LOGOUT USER
        .addCase(logoutUser.pending, (state) => {
            state.loading.logout = true;
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.loading.logout = false;

            state.user = null;
            state.isAuthenticated = false;
            state.mustChangePassword = false;

            state.message = action.payload.message;
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.loading.logout = false;

            state.error =
            action.payload?.message || "Logout failed.";
        })

        // FETCH CURRENT USER
        .addCase(fetchCurrentUser.pending, (state) => {
            state.loading.currentUser = true;
        })
        .addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.loading.currentUser = false;

            state.user = action.payload.data;
            state.isAuthenticated = true;
            state.isInitialized = true;

            state.mustChangePassword =
            action.payload.data.mustChangePassword;
        })
        .addCase(fetchCurrentUser.rejected, (state, action) => {
            state.loading.currentUser = false;

            state.user = null;
            state.isAuthenticated = false;
            state.isInitialized = true;
            state.mustChangePassword = false;

            state.error = action.payload?.message || null;
        });
    },
});

export const {
    clearAuthError,
    clearAuthMessage,
    resetAuthState,
    setCurrentUser
} = authSlice.actions;

export default authSlice.reducer;