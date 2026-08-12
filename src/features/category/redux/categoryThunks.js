import { createAsyncThunk } from "@reduxjs/toolkit";

import categoryService from "../api/categoryService";

export const fetchCategories = createAsyncThunk(
    "category/fetchCategories",
    async (params = {}, thunkAPI) => {
        try {
            return await categoryService.getCategories(params);
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

export const fetchCategoryById = createAsyncThunk(
    "category/fetchCategoryById",
    async (id, thunkAPI) => {
        try {
            return await categoryService.getCategoryById(id);
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

export const createCategory = createAsyncThunk(
    "category/createCategory",
    async (categoryData, thunkAPI) => {
        try {
            return await categoryService.createCategory(categoryData);
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

export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async ({ id, categoryData }, thunkAPI) => {
        try {
            return await categoryService.updateCategory(id, categoryData);
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

export const changeCategoryStatus = createAsyncThunk(
    "category/changeCategoryStatus",
    async (id, thunkAPI) => {
        try {
            return await categoryService.changeCategoryStatus(id);
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

export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (id, thunkAPI) => {
        try {
            await categoryService.deleteCategory(id);
            return id;
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
