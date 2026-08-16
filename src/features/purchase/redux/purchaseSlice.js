import { createSlice } from "@reduxjs/toolkit";

import {
  fetchPurchases,
  fetchPurchaseById,
  createPurchase,
} from "./puchaseThunks";

const initialState = {
  purchases: [],
  purchase: null,

  pagination: null,

  loading: {
    purchases: false,
    purchase: false,
    create: false,
  },

  error: null,
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,

  reducers: {
    clearCurrentPurchase(state) {
      state.purchase = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH PURCHASES
      .addCase(fetchPurchases.pending, (state) => {
        state.loading.purchases = true;
        state.error = null;
      })
      .addCase(fetchPurchases.fulfilled, (state, action) => {
        state.loading.purchases = false;

        state.purchases = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchPurchases.rejected, (state, action) => {
        state.loading.purchases = false;
        state.error = action.payload?.message ?? "Failed to fetch purchases.";
      })

      // FETCH PURCHASE
      .addCase(fetchPurchaseById.pending, (state) => {
        state.loading.purchase = true;
        state.error = null;
      })
      .addCase(fetchPurchaseById.fulfilled, (state, action) => {
        state.loading.purchase = false;
        state.purchase = action.payload.data;
      })
      .addCase(fetchPurchaseById.rejected, (state, action) => {
        state.loading.purchase = false;
        state.error = action.payload?.message ?? "Failed to fetch purchase.";
      })

      // CREATE PURCHASE
      .addCase(createPurchase.pending, (state) => {
        state.loading.create = true;
        state.error = null;
      })
      .addCase(createPurchase.fulfilled, (state) => {
        state.loading.create = false;
      })
      .addCase(createPurchase.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload?.message ?? "Failed to create purchase.";
      });
  },
});

export const { clearCurrentPurchase } = purchaseSlice.actions;

export default purchaseSlice.reducer;
