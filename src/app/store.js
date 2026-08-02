import { configureStore } from "@reduxjs/toolkit";

import authReducer from '@/features/auth/redux/authSlice';
import uiReducer from "@/features/ui/redux/uiSlice";
import settingsReducer from "@/features/settings/redux/settingsSlice";
import profileReducer from "@/features/profile/redux/profileSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        settings: settingsReducer,
        profile: profileReducer,
    },
});