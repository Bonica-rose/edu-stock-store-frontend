import { createSlice } from "@reduxjs/toolkit";

import {
    fetchStockMovements,
    fetchStockMovementById,
    stockIn,
    stockOut,
    transferStock,
    adjustStock,
} from "./stockMovementThunks";

const initialState = {
    movements: [],
    movement: null,

    pagination: null,

    loading: {
        movements: false,
        movement: false,
        stockIn: false,
        stockOut: false,
        transfer: false,
        adjustment: false,
    },

    error: null,
};

const stockMovementSlice = createSlice({
    name: "stockMovement",

    initialState,

    reducers: {
        clearCurrentMovement(state) {
            state.movement = null;
        },

        clearStockMovementError(state) {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

        // FETCH STOCK MOVEMENTS
        .addCase(fetchStockMovements.pending, (state) => {
            state.loading.movements = true;
            state.error = null;
        })
        .addCase(fetchStockMovements.fulfilled, (state, action) => {
            state.loading.movements = false;

            state.movements = action.payload.data;
            state.pagination = action.payload.meta;
        })
        .addCase(fetchStockMovements.rejected, (state, action) => {
            state.loading.movements = false;

            state.error =
            action.payload?.message ?? "Failed to fetch stock movements.";
        })

        // FETCH STOCK MOVEMENT BY ID
        .addCase(fetchStockMovementById.pending, (state) => {
            state.loading.movement = true;
            state.error = null;
        })
        .addCase(fetchStockMovementById.fulfilled, (state, action) => {
            state.loading.movement = false;

            state.movement = action.payload.data;
        })
        .addCase(fetchStockMovementById.rejected, (state, action) => {
            state.loading.movement = false;

            state.error =
            action.payload?.message ?? "Failed to fetch stock movement.";
        })

        // STOCK IN
        .addCase(stockIn.pending, (state) => {
            state.loading.stockIn = true;
            state.error = null;
        })
        .addCase(stockIn.fulfilled, (state) => {
            state.loading.stockIn = false;
        })
        .addCase(stockIn.rejected, (state, action) => {
            state.loading.stockIn = false;

            state.error = action.payload?.message ?? "Failed to add stock.";
        })

        // STOCK OUT
        .addCase(stockOut.pending, (state) => {
            state.loading.stockOut = true;
            state.error = null;
        })
        .addCase(stockOut.fulfilled, (state) => {
            state.loading.stockOut = false;
        })
        .addCase(stockOut.rejected, (state, action) => {
            state.loading.stockOut = false;

            state.error = action.payload?.message ?? "Failed to issue stock.";
        })

        // TRANSFER STOCK
        .addCase(transferStock.pending, (state) => {
            state.loading.transfer = true;
            state.error = null;
        })
        .addCase(transferStock.fulfilled, (state) => {
            state.loading.transfer = false;
        })
        .addCase(transferStock.rejected, (state, action) => {
            state.loading.transfer = false;

            state.error = action.payload?.message ?? "Failed to transfer stock.";
        })

        // STOCK ADJUSTMENT
        .addCase(adjustStock.pending, (state) => {
            state.loading.adjustment = true;
            state.error = null;
        })
        .addCase(adjustStock.fulfilled, (state) => {
            state.loading.adjustment = false;
        })
        .addCase(adjustStock.rejected, (state, action) => {
            state.loading.adjustment = false;

            state.error = action.payload?.message ?? "Failed to adjust stock.";
        });
    },
});

export const {
    clearCurrentMovement,
    clearStockMovementError
} = stockMovementSlice.actions;

export default stockMovementSlice.reducer;
