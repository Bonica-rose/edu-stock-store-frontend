import { createSlice } from "@reduxjs/toolkit";

import {
  fetchVendors,
  fetchVendorById,
  createVendor,
  updateVendor,
  changeVendorStatus,
  deleteVendor,
} from "./vendorThunks";

const initialState = {
  vendors: [],
  vendor: null,

  pagination: null,

  loading: {
    vendors: false,
    vendor: false,
    create: false,
    update: false,
    status: false,
    delete: false,
  },

  error: null,
};

const vendorSlice = createSlice({
  name: "vendor",

  initialState,

  reducers: {
    clearCurrentVendor(state) {
      state.vendor = null;
    },

    clearVendorError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH VENDORS
      .addCase(fetchVendors.pending, (state) => {
        state.loading.vendors = true;
        state.error = null;
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.loading.vendors = false;

        state.vendors = action.payload.data.vendors;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.loading.vendors = false;
        state.error = action.payload?.message ?? "Failed to fetch vendors.";
      })

      // FETCH VENDOR
      .addCase(fetchVendorById.pending, (state) => {
        state.loading.vendor = true;
        state.error = null;
      })
      .addCase(fetchVendorById.fulfilled, (state, action) => {
        state.loading.vendor = false;
        state.vendor = action.payload.data;
      })
      .addCase(fetchVendorById.rejected, (state, action) => {
        state.loading.vendor = false;
        state.error = action.payload?.message ?? "Failed to fetch vendor.";
      })

      // CREATE VENDOR
      .addCase(createVendor.pending, (state) => {
        state.loading.create = true;
        state.error = null;
      })
      .addCase(createVendor.fulfilled, (state) => {
        state.loading.create = false;
      })
      .addCase(createVendor.rejected, (state, action) => {        
        state.loading.create = false;
        state.error = action.payload?.message ?? "Failed to create vendor.";
      })

      // UPDATE VENDOR
      .addCase(updateVendor.pending, (state) => {
        state.loading.update = true;
        state.error = null;
      })
      .addCase(updateVendor.fulfilled, (state, action) => {
        state.loading.update = false;
        state.vendor = action.payload.data;
      })
      .addCase(updateVendor.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload?.message ?? "Failed to update vendor.";
      })

      // CHANGE STATUS
      .addCase(changeVendorStatus.pending, (state) => {
        state.loading.status = true;
        state.error = null;
      })
      .addCase(changeVendorStatus.fulfilled, (state) => {
        state.loading.status = false;
      })
      .addCase(changeVendorStatus.rejected, (state, action) => {
        state.loading.status = false;
        state.error =
          action.payload?.message ?? "Failed to change vendor status.";
      })

      // DELETE VENDOR
      .addCase(deleteVendor.pending, (state) => {
        state.loading.delete = true;
        state.error = null;
      })
      .addCase(deleteVendor.fulfilled, (state) => {
        state.loading.delete = false;
      })
      .addCase(deleteVendor.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload?.message ?? "Failed to delete vendor.";
      });
  },
});

export const { clearCurrentVendor, clearVendorError } = vendorSlice.actions;

export default vendorSlice.reducer;
