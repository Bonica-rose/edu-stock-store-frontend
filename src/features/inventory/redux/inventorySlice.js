import { createSlice } from "@reduxjs/toolkit";

import {
  fetchInventories,
  fetchInventoryById,
  createInventory,
  updateInventory,
  changeInventoryStatus,
  deleteInventory,
} from "./inventoryThunks";

const initialState = {
  inventories: [],
  inventory: null,

  pagination: null,

  loading: {
    inventories: false,
    inventory: false,
    create: false,
    update: false,
    status: false,
    delete: false,
  },

  error: null,
};

const inventorySlice = createSlice({
  name: "inventory",

  initialState,

  reducers: {
    clearCurrentInventory(state) {
      state.inventory = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH INVENTORIES
      .addCase(fetchInventories.pending, (state) => {
        state.loading.inventories = true;
        state.error = null;
      })
      .addCase(fetchInventories.fulfilled, (state, action) => {
        state.loading.inventories = false;

        state.inventories = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchInventories.rejected, (state, action) => {
        state.loading.inventories = false;
        state.error = action.payload?.message ?? "Failed to fetch inventories.";
      })

      // FETCH INVENTORY
      .addCase(fetchInventoryById.pending, (state) => {
        state.loading.inventory = true;
        state.error = null;
      })
      .addCase(fetchInventoryById.fulfilled, (state, action) => {
        state.loading.inventory = false;

        state.inventory = action.payload.data;
      })
      .addCase(fetchInventoryById.rejected, (state, action) => {
        state.loading.inventory = false;
        state.error = action.payload?.message ?? "Failed to fetch inventory.";
      })

      // CREATE INVENTORY
      .addCase(createInventory.pending, (state) => {
        state.loading.create = true;
        state.error = null;
      })
      .addCase(createInventory.fulfilled, (state) => {
        state.loading.create = false;
      })
      .addCase(createInventory.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload?.message ?? "Failed to create inventory.";
      })

      // UPDATE INVENTORY
      .addCase(updateInventory.pending, (state) => {
        state.loading.update = true;
        state.error = null;
      })
      .addCase(updateInventory.fulfilled, (state, action) => {
        state.loading.update = false;

        state.inventory = action.payload.data;
      })
      .addCase(updateInventory.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload?.message ?? "Failed to update inventory.";
      })

      // CHANGE STATUS
      .addCase(changeInventoryStatus.pending, (state) => {
        state.loading.status = true;
        state.error = null;
      })
      .addCase(changeInventoryStatus.fulfilled, (state) => {
        state.loading.status = false;
      })
      .addCase(changeInventoryStatus.rejected, (state, action) => {
        state.loading.status = false;
        state.error =
          action.payload?.message ?? "Failed to change inventory status.";
      })

      // DELETE INVENTORY
      .addCase(deleteInventory.pending, (state) => {
        state.loading.delete = true;
        state.error = null;
      })
      .addCase(deleteInventory.fulfilled, (state) => {
        state.loading.delete = false;
      })
      .addCase(deleteInventory.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload?.message ?? "Failed to delete inventory.";
      });
  },
});

export const { clearCurrentInventory } = inventorySlice.actions;

export default inventorySlice.reducer;
