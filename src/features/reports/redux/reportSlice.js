import { createSlice } from "@reduxjs/toolkit";

import {
    fetchDashboardSummary,
    fetchInventoryReport,
    fetchLowStockReport,
    fetchAssetReport,
    fetchStockMovementReport,
    fetchPurchaseReport,
    fetchMaintenanceReport,
    fetchVendorReport,
} from "./reportThunks";

const initialState = {
    dashboard: {
        data: null,
        loading: false,
        error: null,
    },

    inventory: {
        rows: [],
        pagination: null,
        loading: false,
        error: null,
    },

    lowStock: {
        rows: [],
        pagination: null,
        loading: false,
        error: null,
    },

    assets: {
        rows: [],
        pagination: null,
        loading: false,
        error: null,
    },

    stockMovements: {
        rows: [],
        pagination: null,
        loading: false,
        error: null,
    },

    purchases: {
        rows: [],
        pagination: null,
        loading: false,
        error: null,
    },

    maintenance: {
        rows: [],
        pagination: null,
        loading: false,
        error: null,
    },

    vendors: {
        rows: [],
        pagination: null,
        loading: false,
        error: null,
    },
};

const reportsSlice = createSlice({
    name: "reports",

    initialState,

    reducers: {
        clearReportsError(state) {
            state.dashboard.error = null;
            state.inventory.error = null;
            state.lowStock.error = null;
            state.assets.error = null;
            state.stockMovements.error = null;
            state.purchases.error = null;
            state.maintenance.error = null;
            state.vendors.error = null;
        },

        clearDashboard(state) {
            state.dashboard.data = null;
            state.dashboard.error = null;
        },

        clearInventoryReport(state) {
            state.inventory.rows = [];
            state.inventory.pagination = null;
            state.inventory.error = null;
        },

        clearLowStockReport(state) {
            state.lowStock.rows = [];
            state.lowStock.pagination = null;
            state.lowStock.error = null;
        },

        clearAssetReport(state) {
            state.assets.rows = [];
            state.assets.pagination = null;
            state.assets.error = null;
        },

        clearStockMovementReport(state) {
            state.stockMovements.rows = [];
            state.stockMovements.pagination = null;
            state.stockMovements.error = null;
        },

        clearPurchaseReport(state) {
            state.purchases.rows = [];
            state.purchases.pagination = null;
            state.purchases.error = null;
        },

        clearMaintenanceReport(state) {
            state.maintenance.rows = [];
            state.maintenance.pagination = null;
            state.maintenance.error = null;
        },

        clearVendorReport(state) {
            state.vendors.rows = [];
            state.vendors.pagination = null;
            state.vendors.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

        // DASHBOARD SUMMARY
        .addCase(fetchDashboardSummary.pending, (state) => {
            state.dashboard.loading = true;
            state.dashboard.error = null;
        })
        .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
            state.dashboard.loading = false;
            state.dashboard.data = action.payload.data;
        })
        .addCase(fetchDashboardSummary.rejected, (state, action) => {
            state.dashboard.loading = false;
            state.dashboard.error =
            action.payload?.message ?? "Failed to fetch dashboard summary.";
        })

        // INVENTORY REPORT
        .addCase(fetchInventoryReport.pending, (state) => {
            state.inventory.loading = true;
            state.inventory.error = null;
        })
        .addCase(fetchInventoryReport.fulfilled, (state, action) => {
            state.inventory.loading = false;
            state.inventory.rows = action.payload.data.rows;
            state.inventory.pagination = action.payload.data.pagination;
        })
        .addCase(fetchInventoryReport.rejected, (state, action) => {
            state.inventory.loading = false;
            state.inventory.error =
            action.payload?.message ?? "Failed to fetch inventory report.";
        })

        // LOW STOCK REPORT
        .addCase(fetchLowStockReport.pending, (state) => {
            state.lowStock.loading = true;
            state.lowStock.error = null;
        })
        .addCase(fetchLowStockReport.fulfilled, (state, action) => {
            state.lowStock.loading = false;
            state.lowStock.rows = action.payload.data.rows;
            state.lowStock.pagination = action.payload.data.pagination;
        })
        .addCase(fetchLowStockReport.rejected, (state, action) => {
            state.lowStock.loading = false;
            state.lowStock.error =
            action.payload?.message ?? "Failed to fetch low stock report.";
        })

        // ASSET REPORT
        .addCase(fetchAssetReport.pending, (state) => {
            state.assets.loading = true;
            state.assets.error = null;
        })
        .addCase(fetchAssetReport.fulfilled, (state, action) => {
            state.assets.loading = false;
            state.assets.rows = action.payload.data.rows;
            state.assets.pagination = action.payload.data.pagination;
        })
        .addCase(fetchAssetReport.rejected, (state, action) => {
            state.assets.loading = false;
            state.assets.error =
            action.payload?.message ?? "Failed to fetch asset report.";
        })

        // STOCK MOVEMENT REPORT
        .addCase(fetchStockMovementReport.pending, (state) => {
            state.stockMovements.loading = true;
            state.stockMovements.error = null;
        })
        .addCase(fetchStockMovementReport.fulfilled, (state, action) => {
            state.stockMovements.loading = false;
            state.stockMovements.rows = action.payload.data.rows;
            state.stockMovements.pagination = action.payload.data.pagination;
        })
        .addCase(fetchStockMovementReport.rejected, (state, action) => {
            state.stockMovements.loading = false;
            state.stockMovements.error =
            action.payload?.message ?? "Failed to fetch stock movement report.";
        })

        // PURCHASE REPORT
        .addCase(fetchPurchaseReport.pending, (state) => {
            state.purchases.loading = true;
            state.purchases.error = null;
        })
        .addCase(fetchPurchaseReport.fulfilled, (state, action) => {
            state.purchases.loading = false;
            state.purchases.rows = action.payload.data.rows;
            state.purchases.pagination = action.payload.data.pagination;
        })
        .addCase(fetchPurchaseReport.rejected, (state, action) => {
            state.purchases.loading = false;
            state.purchases.error =
            action.payload?.message ?? "Failed to fetch purchase report.";
        })

        // MAINTENANCE REPORT
        .addCase(fetchMaintenanceReport.pending, (state) => {
            state.maintenance.loading = true;
            state.maintenance.error = null;
        })
        .addCase(fetchMaintenanceReport.fulfilled, (state, action) => {
            state.maintenance.loading = false;
            state.maintenance.rows = action.payload.data.rows;
            state.maintenance.pagination = action.payload.data.pagination;
        })
        .addCase(fetchMaintenanceReport.rejected, (state, action) => {
            state.maintenance.loading = false;
            state.maintenance.error =
            action.payload?.message ?? "Failed to fetch maintenance report.";
        })

        // VENDOR REPORT
        .addCase(fetchVendorReport.pending, (state) => {
            state.vendors.loading = true;
            state.vendors.error = null;
        })
        .addCase(fetchVendorReport.fulfilled, (state, action) => {
            state.vendors.loading = false;
            state.vendors.rows = action.payload.data.rows;
            state.vendors.pagination = action.payload.data.pagination;
        })
        .addCase(fetchVendorReport.rejected, (state, action) => {
            state.vendors.loading = false;
            state.vendors.error =
            action.payload?.message ?? "Failed to fetch vendor report.";
        });
    },
});

export const {
    clearReportsError,
    clearDashboard,
    clearInventoryReport,
    clearLowStockReport,
    clearAssetReport,
    clearStockMovementReport,
    clearPurchaseReport,
    clearMaintenanceReport,
    clearVendorReport,
} = reportsSlice.actions;

export default reportsSlice.reducer;
