import { createSlice } from "@reduxjs/toolkit";

import {
  fetchCategories,
  fetchCategoryById,
  createCategory,
  updateCategory,
  changeCategoryStatus,
  deleteCategory,
} from "./categoryThunks";

const initialState = {
  categories: [],
  category: null,

  pagination: null,

  loading: {
    categories: false,
    category: false,
    create: false,
    update: false,
    status: false,
    delete: false,
  },

  error: null,
};

const categorySlice = createSlice({
  name: "category",

  initialState,

  reducers: {
    clearCurrentCategory(state) {
      state.category = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH CATEGORIES
      .addCase(fetchCategories.pending, (state) => {
        state.loading.categories = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading.categories = false;

        state.categories = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading.categories = false;
        state.error = action.payload?.message ?? "Failed to fetch categories.";
      })

      // FETCH CATEGORY
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading.category = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading.category = false;

        state.category = action.payload.data;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading.category = false;
        state.error = action.payload?.message ?? "Failed to fetch category.";
      })

      // CREATE CATEGORY
      .addCase(createCategory.pending, (state) => {
        state.loading.create = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.loading.create = false;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload?.message ?? "Failed to create category.";
      })

      // UPDATE CATEGORY
      .addCase(updateCategory.pending, (state) => {
        state.loading.update = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading.update = false;

        state.category = action.payload.data;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload?.message ?? "Failed to update category.";
      })

      // CHANGE STATUS
      .addCase(changeCategoryStatus.pending, (state) => {
        state.loading.status = true;
        state.error = null;
      })
      .addCase(changeCategoryStatus.fulfilled, (state) => {
        state.loading.status = false;
      })
      .addCase(changeCategoryStatus.rejected, (state, action) => {
        state.loading.status = false;
        state.error =
          action.payload?.message ?? "Failed to change category status.";
      })

      // DELETE CATEGORY
      .addCase(deleteCategory.pending, (state) => {
        state.loading.delete = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading.delete = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload?.message ?? "Failed to delete category.";
      });
  },
});

export const { clearCurrentCategory } = categorySlice.actions;

export default categorySlice.reducer;
