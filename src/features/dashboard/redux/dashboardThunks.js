import { createAsyncThunk } from "@reduxjs/toolkit";

import dashboardService from "../api/dashboardService";

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetchDashboard",
  async (_, thunkAPI) => {
    try {
      return await dashboardService.getDashboard();
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

export const fetchStockMovementTrend = createAsyncThunk(
  "dashboard/fetchStockMovementTrend",
  async (_, thunkAPI) => {
    try {
      return await dashboardService.getStockMovementTrend();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? {
          success: false,
          message: "Failed to load stock movement trend.",
        },
      );
    }
  },
);

export const fetchInventoryByCategory = createAsyncThunk(
  "dashboard/fetchInventoryByCategory",
  async (_, thunkAPI) => {
    try {
      return await dashboardService.getInventoryByCategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? {
          success: false,
          message: "Failed to load inventory by category.",
        },
      );
    }
  },
);

export const fetchStockHealth = createAsyncThunk(
  "dashboard/fetchStockHealth",
  async (_, thunkAPI) => {
    try {
      return await dashboardService.getStockHealth();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? {
          success: false,
          message: "Failed to load stock health.",
        },
      );
    }
  },
);