import { createSlice } from "@reduxjs/toolkit";

import {
    fetchMaintenances,
    fetchMaintenanceById,
    createMaintenance,
    assignMaintenance,
    updateMaintenanceStatus,
    completeMaintenance,
    deleteMaintenance,
} from "./maintenanceThunks";

const initialState = {
    maintenances: [],
    maintenance: null,
    pagination: null,

    loading: {
        maintenances: false,
        maintenance: false,
        create: false,
        assign: false,
        updateStatus: false,
        complete: false,
        delete: false,
    },

    error: null,
};

const maintenanceSlice = createSlice({
    name: "maintenance",
    initialState,

    reducers: {
        clearCurrentMaintenance(state) {
            state.maintenance = null;
        },

        clearMaintenanceError(state) {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

        // FETCH MAINTENANCES
        .addCase(fetchMaintenances.pending, (state) => {
            state.loading.maintenances = true;
            state.error = null;
        })
        .addCase(fetchMaintenances.fulfilled, (state, action) => {
            state.loading.maintenances = false;

            state.maintenances = action.payload.data;
            state.pagination = action.payload.meta;
        })
        .addCase(fetchMaintenances.rejected, (state, action) => {
            state.loading.maintenances = false;

            state.error =
            action.payload?.message ?? "Failed to fetch maintenances.";
        })

        // FETCH MAINTENANCE BY ID
        .addCase(fetchMaintenanceById.pending, (state) => {
            state.loading.maintenance = true;
            state.error = null;
        })
        .addCase(fetchMaintenanceById.fulfilled, (state, action) => {
            state.loading.maintenance = false;

            state.maintenance = action.payload.data;
        })
        .addCase(fetchMaintenanceById.rejected, (state, action) => {
            state.loading.maintenance = false;

            state.error = action.payload?.message ?? "Failed to fetch maintenance.";
        })

        // CREATE MAINTENANCE
        .addCase(createMaintenance.pending, (state) => {
            state.loading.create = true;
            state.error = null;
        })
        .addCase(createMaintenance.fulfilled, (state) => {
            state.loading.create = false;
        })
        .addCase(createMaintenance.rejected, (state, action) => {
            state.loading.create = false;

            state.error =
            action.payload?.message ?? "Failed to create maintenance.";
        })

        // ASSIGN MAINTENANCE
        .addCase(assignMaintenance.pending, (state) => {
            state.loading.assign = true;
            state.error = null;
        })
        .addCase(assignMaintenance.fulfilled, (state) => {
            state.loading.assign = false;
        })
        .addCase(assignMaintenance.rejected, (state, action) => {
            state.loading.assign = false;

            state.error =
            action.payload?.message ?? "Failed to assign maintenance.";
        })

        // UPDATE MAINTENANCE STATUS
        .addCase(updateMaintenanceStatus.pending, (state) => {
            state.loading.updateStatus = true;
            state.error = null;
        })
        .addCase(updateMaintenanceStatus.fulfilled, (state) => {
            state.loading.updateStatus = false;
        })
        .addCase(updateMaintenanceStatus.rejected, (state, action) => {
            state.loading.updateStatus = false;

            state.error =
            action.payload?.message ?? "Failed to update maintenance status.";
        })

        // COMPLETE MAINTENANCE
        .addCase(completeMaintenance.pending, (state) => {
            state.loading.complete = true;
            state.error = null;
        })
        .addCase(completeMaintenance.fulfilled, (state) => {
            state.loading.complete = false;
        })
        .addCase(completeMaintenance.rejected, (state, action) => {
            state.loading.complete = false;

            state.error =
            action.payload?.message ?? "Failed to complete maintenance.";
        })

        // DELETE MAINTENANCE
        .addCase(deleteMaintenance.pending, (state) => {
            state.loading.delete = true;
            state.error = null;
        })
        .addCase(deleteMaintenance.fulfilled, (state) => {
            state.loading.delete = false;
        })
        .addCase(deleteMaintenance.rejected, (state, action) => {
            state.loading.delete = false;

            state.error =
            action.payload?.message ?? "Failed to delete maintenance.";
        });
    },
});

export const {
    clearCurrentMaintenance,
    clearMaintenanceError
} = maintenanceSlice.actions;

export default maintenanceSlice.reducer;
