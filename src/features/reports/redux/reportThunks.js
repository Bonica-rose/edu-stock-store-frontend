import { createAsyncThunk } from "@reduxjs/toolkit";
import reportService from "../api/reportService";

// DASHBOARD SUMMARY
export const fetchDashboardSummary = createAsyncThunk(
    "reports/fetchDashboardSummary",

    async (query = {}, { rejectWithValue }) => {
        try {
            return await reportService.getDashboardSummary(query);
        } catch (error) {
            return rejectWithValue(
                error.response?.data ?? {
                    message: "Failed to fetch dashboard summary.",
                },
            );
        }
    },
);

// INVENTORY REPORT
export const fetchInventoryReport = createAsyncThunk(
    "reports/fetchInventoryReport",

    async (query = {}, { rejectWithValue }) => {
        try {
            return await reportService.getInventoryReport(query);
        } catch (error) {
            return rejectWithValue(
                error.response?.data ?? {
                    message: "Failed to fetch inventory report.",
                },
            );
        }
    },
);

// LOW STOCK REPORT
export const fetchLowStockReport = createAsyncThunk(
    "reports/fetchLowStockReport",

    async (query = {}, { rejectWithValue }) => {
        try {
            return await reportService.getLowStockReport(query);
        } catch (error) {
            return rejectWithValue(
                error.response?.data ?? {
                    message: "Failed to fetch low stock report.",
                },
            );
        }
    },
);

// ASSET REPORT
export const fetchAssetReport = createAsyncThunk(
    "reports/fetchAssetReport",

    async (query = {}, { rejectWithValue }) => {
        try {
            return await reportService.getAssetReport(query);
        } catch (error) {
            return rejectWithValue(
                error.response?.data ?? {
                    message: "Failed to fetch asset report.",
                },
            );
        }
    },
);

// STOCK MOVEMENT REPORT
export const fetchStockMovementReport = createAsyncThunk(
    "reports/fetchStockMovementReport",

    async (query = {}, { rejectWithValue }) => {
        try {
            return await reportService.getStockMovementReport(query);
        } catch (error) {
            return rejectWithValue(
                error.response?.data ?? {
                    message: "Failed to fetch stock movement report.",
                },
            );
        }
    },
);

// PURCHASE REPORT
export const fetchPurchaseReport = createAsyncThunk(
    "reports/fetchPurchaseReport",

    async (query = {}, { rejectWithValue }) => {
        try {
            return await reportService.getPurchaseReport(query);
        } catch (error) {
            return rejectWithValue(
                error.response?.data ?? {
                    message: "Failed to fetch purchase report.",
                },
            );
        }
    },
);

// MAINTENANCE REPORT
export const fetchMaintenanceReport = createAsyncThunk(
    "reports/fetchMaintenanceReport",

    async (query = {}, { rejectWithValue }) => {
        try {
            return await reportService.getMaintenanceReport(query);
        } catch (error) {
            return rejectWithValue(
                error.response?.data ?? {
                    message: "Failed to fetch maintenance report.",
                },
            );
        }
    },
);

// VENDOR REPORT
export const fetchVendorReport = createAsyncThunk(
    "reports/fetchVendorReport",

    async (query = {}, { rejectWithValue }) => {
        try {
        return await reportService.getVendorReport(query);
        } catch (error) {
            return rejectWithValue(
                error.response?.data ?? {
                    message: "Failed to fetch vendor report.",
                },
            );
        }
    },
);
