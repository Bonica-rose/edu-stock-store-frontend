import { configureStore } from "@reduxjs/toolkit";

import authReducer from '@/features/auth/redux/authSlice';
import uiReducer from "@/features/ui/redux/uiSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
    },
});