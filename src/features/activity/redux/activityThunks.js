import { createAsyncThunk } from "@reduxjs/toolkit";

import activityService from "../api/activityService";

export const fetchActivities = createAsyncThunk(
  "activity/fetchActivities",

  async (params = {}, thunkAPI) => {
    try {
      return await activityService.getActivities(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? {
          success: false,
          message: "Failed to fetch activity logs.",
        },
      );
    }
  },
);

export const fetchActivity = createAsyncThunk(
  "activity/fetchActivity",

  async (id, thunkAPI) => {
    try {
      return await activityService.getActivity(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? {
          success: false,
          message: "Failed to fetch activity log.",
        },
      );
    }
  },
);
