import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarCollapsed: false,
    mobileSidebarOpen: false,
    theme: "light",
    notificationsOpen: false,
    userMenuOpen: false,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.sidebarCollapsed = !state.sidebarCollapsed;
        },

        collapseSidebar(state) {
            state.sidebarCollapsed = true;
        },

        expandSidebar(state) {
            state.sidebarCollapsed = false;
        },

        openMobileSidebar(state) {
            state.mobileSidebarOpen = true;
        },

        closeMobileSidebar(state) {
            state.mobileSidebarOpen = false;
        },

        toggleMobileSidebar(state) {
            state.mobileSidebarOpen = !state.mobileSidebarOpen;
        },

        setTheme(state, action) {
            state.theme = action.payload;
        },

        toggleNotifications(state) {
            state.notificationsOpen = !state.notificationsOpen;
        },

        closeNotifications(state) {
            state.notificationsOpen = false;
        },

        toggleUserMenu(state) {
            state.userMenuOpen = !state.userMenuOpen;
        },

        closeUserMenu(state) {
            state.userMenuOpen = false;
        },
    },
});

export const {
    toggleSidebar,
    collapseSidebar,
    expandSidebar,
    openMobileSidebar,
    closeMobileSidebar,
    toggleMobileSidebar,
    setTheme,
} = uiSlice.actions;

export default uiSlice.reducer;