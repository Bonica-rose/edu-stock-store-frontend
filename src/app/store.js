import { configureStore } from "@reduxjs/toolkit";

import authReducer from '@/features/auth/redux/authSlice';
import uiReducer from "@/features/ui/redux/uiSlice";
import settingsReducer from "@/features/settings/redux/settingsSlice";
import profileReducer from "@/features/profile/redux/profileSlice";
import setupReducer from "@/features/setup/redux/setupSlice";
import dashboardReducer from "@/features/dashboard/redux/dashboardSlice";
import userReducer from "@/features/user/redux/userSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        settings: settingsReducer,
        profile: profileReducer,
        setup: setupReducer,
        dashboard: dashboardReducer,
        user: userReducer,
    },
});