import { createAsyncThunk } from "@reduxjs/toolkit";

import userService from "../api/userService";

export const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    async (params = {}, thunkAPI) => {
        try {
            return await userService.getUsers(params);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                }
            );
        }
    }
);

export const fetchUserById = createAsyncThunk(
    "user/fetchUserById",
    async (id, thunkAPI) => {
        try {
            return await userService.getUserById(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                }
            );
        }
    }
);

export const createUser = createAsyncThunk(
    "user/createUser",
    async (userData, thunkAPI) => {
        try {
            return await userService.createUser(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                }
            );
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async ({ id, userData }, thunkAPI) => {
        try {
            return await userService.updateUser(id, userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                }
            );
        }
    }
);

export const changeUserStatus = createAsyncThunk(
    "user/changeUserStatus",
    async ({ id, isActive }, thunkAPI) => {
        try {
            return await userService.changeUserStatus(id, isActive);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                }
            );
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (id, thunkAPI) => {
        try {
            await userService.deleteUser(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data ?? {
                    success: false,
                    message: "Something went wrong. Please try again.",
                }
            );
        }
    }
);