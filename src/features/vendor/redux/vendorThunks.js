import { createAsyncThunk } from "@reduxjs/toolkit";

import vendorService from "../api/vendorService";

// FETCH VENDORS
export const fetchVendors = createAsyncThunk(
    "vendor/fetchVendors",
    async (query = {}, { rejectWithValue }) => {
        try {
            return await vendorService.getVendors(query);
        } catch (error) {
            return rejectWithValue(
                error.response?.data ?? {
                    message: "Failed to fetch vendors.",
                },
            );
        }
    },
);

// FETCH VENDOR BY ID
export const fetchVendorById = createAsyncThunk(
    "vendor/fetchVendorById",
    async (id, { rejectWithValue }) => {
        try {
            return await vendorService.getVendorById(id);
        } catch (error) {
            return rejectWithValue(
                error.response?.data ?? {
                message: "Failed to fetch vendor.",
                },
            );
        }
    },
);

// CREATE VENDOR
export const createVendor = createAsyncThunk(
    "vendor/createVendor",
    async (vendorData, { rejectWithValue }) => {
        try {
            return await vendorService.createVendor(vendorData);
        } catch (error) {
            return rejectWithValue(
                error.response?.data ?? {
                    message: "Failed to create vendor.",
                },
            );
        }
    },
);

// UPDATE VENDOR
export const updateVendor = createAsyncThunk(
    "vendor/updateVendor",
    async ({ id, vendorData }, { rejectWithValue }) => {
        try {
            return await vendorService.updateVendor(id, vendorData);
        } catch (error) {
            return rejectWithValue(
                error.response?.data ?? {
                    message: "Failed to update vendor.",
                },
            );
        }
    },
);

// CHANGE VENDOR STATUS
export const changeVendorStatus = createAsyncThunk(
    "vendor/changeVendorStatus",
    async (id, { rejectWithValue }) => {
        try {
            return await vendorService.changeVendorStatus(id);
        } catch (error) {
            return rejectWithValue(
                error.response?.data ?? {
                    message: "Failed to change vendor status.",
                },
            );
        }
    },
);

// DELETE VENDOR
export const deleteVendor = createAsyncThunk(
    "vendor/deleteVendor",
    async (id, { rejectWithValue }) => {
        try {
            return await vendorService.deleteVendor(id);
        } catch (error) {
            return rejectWithValue(
                error.response?.data ?? {
                    message: "Failed to delete vendor.",
                },
            );
        }
    },
);
