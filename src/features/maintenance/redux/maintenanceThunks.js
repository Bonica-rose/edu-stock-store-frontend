import { createAsyncThunk } from "@reduxjs/toolkit";

import maintenanceService from "../api/maintenanceService";

// Get Maintenances
export const fetchMaintenances = createAsyncThunk(
    "maintenance/fetchMaintenances",

    async (params = {}, thunkAPI) => {
        try {
            return await maintenanceService.getMaintenances(params);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                },
            );
        }
    },
);

// Get Maintenance by ID
export const fetchMaintenanceById = createAsyncThunk(
    "maintenance/fetchMaintenanceById",

    async (id, thunkAPI) => {
        try {
            return await maintenanceService.getMaintenanceById(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                },
            );
        }
    },
);

// Create Maintenance
export const createMaintenance = createAsyncThunk(
    "maintenance/createMaintenance",

    async (maintenanceData, thunkAPI) => {
        try {
            return await maintenanceService.createMaintenance(maintenanceData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                },
            );
        }
    },
);

// Assign Maintenance
export const assignMaintenance = createAsyncThunk(
    "maintenance/assignMaintenance",

    async ({ id, assignmentData }, thunkAPI) => {
        try {
            return await maintenanceService.assignMaintenance(id, assignmentData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                },
            );
        }
    },
);

// Update Maintenance Status
export const updateMaintenanceStatus = createAsyncThunk(
    "maintenance/updateMaintenanceStatus",

    async ({ id, statusData }, thunkAPI) => {
        try {
            return await maintenanceService.updateMaintenanceStatus(id, statusData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                },
            );
        }
    },
);

// Complete Maintenance
export const completeMaintenance = createAsyncThunk(
    "maintenance/completeMaintenance",

    async ({ id, completionData }, thunkAPI) => {
        try {
            return await maintenanceService.completeMaintenance(id, completionData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                },
            );
        }
    },
);

// Delete Maintenance
export const deleteMaintenance = createAsyncThunk(
    "maintenance/deleteMaintenance",

    async (id, thunkAPI) => {
        try {
            return await maintenanceService.deleteMaintenance(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                },
            );
        }
    },
);
