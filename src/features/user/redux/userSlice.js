import { createSlice } from "@reduxjs/toolkit";

import {
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    changeUserStatus,
    deleteUser,
} from "./userThunks";

const initialState = {
    users: [],
    user: null,

    pagination: null,

    loading: {
        users: false,
        user: false,
        create: false,
        update: false,
        status: false,
        delete: false,
    },

    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearCurrentUser(state) {
            state.user = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // FETCH USERS
            .addCase(fetchUsers.pending, (state) => {
                state.loading.users = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading.users = false;

                state.users = action.payload.data.users;
                state.pagination = action.payload.meta;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading.users = false;
                state.error =
                    action.payload?.message ??
                    "Failed to fetch users.";
            })

            // FETCH USER
            .addCase(fetchUserById.pending, (state) => {
                state.loading.user = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading.user = false;
                state.user = action.payload.data;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading.user = false;
                state.error =
                    action.payload?.message ??
                    "Failed to fetch user.";
            })

            // CREATE USER
            .addCase(createUser.pending, (state) => {
                state.loading.create = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state) => {
                state.loading.create = false;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading.create = false;
                state.error =
                    action.payload?.message ??
                    "Failed to create user.";
            })

            // UPDATE USER
            .addCase(updateUser.pending, (state) => {
                state.loading.update = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading.update = false;
                state.user = action.payload.data;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading.update = false;
                state.error =
                    action.payload?.message ??
                    "Failed to update user.";
            })

            // CHANGE STATUS
            .addCase(changeUserStatus.pending, (state) => {
                state.loading.status = true;
                state.error = null;
            })
            .addCase(changeUserStatus.fulfilled, (state) => {
                state.loading.status = false;
            })
            .addCase(changeUserStatus.rejected, (state, action) => {
                state.loading.status = false;
                state.error =
                    action.payload?.message ??
                    "Failed to change user status.";
            })

            // DELETE USER
            .addCase(deleteUser.pending, (state) => {
                state.loading.delete = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.loading.delete = false;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading.delete = false;
                state.error =
                    action.payload?.message ??
                    "Failed to delete user.";
            });
    },
});

export const { clearCurrentUser } = userSlice.actions;

export default userSlice.reducer;