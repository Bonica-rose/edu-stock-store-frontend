import { createSlice } from "@reduxjs/toolkit";

import {
    getSetupStatus,
    initializeSystem,
} from "./setupThunks";

const initialState = {
    initialized: null, // system setup completed or not from client

    loading: {
        status: false,
        initialize: false,
    },

    error: null,
    message: null,
};

const setupSlice = createSlice({
    name: "setup",
    initialState,

    reducers: {
        clearSetupError(state) {
            state.error = null;
        },

        clearSetupMessage(state) {
            state.message = null;
        },

        resetSetupState() {
            return initialState;
        },
    },

    extraReducers: (builder) => {
        builder

            // GET STATUS
            .addCase(getSetupStatus.pending, (state) => {
                state.loading.status = true;
                state.error = null;
            })
            .addCase(getSetupStatus.fulfilled, (state, action) => {
                state.loading.status = false;
                state.initialized = action.payload.data.isSetupCompleted;
            })
            .addCase(getSetupStatus.rejected, (state, action) => {
                state.loading.status = false;
                state.error =
                    action.payload?.message ??
                    "Unable to check setup status.";
            })

            // INITIALIZE
            .addCase(initializeSystem.pending, (state) => {
                state.loading.initialize = true;
                state.error = null;
            })
            .addCase(initializeSystem.fulfilled, (state, action) => {
                state.loading.initialize = false;
                state.initialized = true;
                state.message = action.payload.message;
            })
            .addCase(initializeSystem.rejected, (state, action) => {
                state.loading.initialize = false;
                state.error =
                    action.payload?.message ??
                    "System initialization failed.";
            });
    },
});

export const {
    clearSetupError,
    clearSetupMessage,
    resetSetupState,
} = setupSlice.actions;

export default setupSlice.reducer;