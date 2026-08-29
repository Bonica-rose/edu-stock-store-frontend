import { configureStore } from "@reduxjs/toolkit";

import authReducer from '@/features/auth/redux/authSlice';
import uiReducer from "@/features/ui/redux/uiSlice";
import settingsReducer from "@/features/settings/redux/settingsSlice";
import profileReducer from "@/features/profile/redux/profileSlice";
import setupReducer from "@/features/setup/redux/setupSlice";
import dashboardReducer from "@/features/dashboard/redux/dashboardSlice";
import userReducer from "@/features/user/redux/userSlice";
import branchReducer from "@/features/branch/redux/branchSlice";
import categoryReducer from "@/features/category/redux/categorySlice";
import vendorReducer from "@/features/vendor/redux/vendorSlice";
import purchaseReducer from "@/features/purchase/redux/purchaseSlice";
import inventoryReducer from "@/features/inventory/redux/inventorySlice";
import stockMovementReducer from "@/features/stockMovement/redux/stockMovementSlice";
import assetReducer from "@/features/asset/redux/assetSlice";
import maintenanceReducer from "@/features/maintenance/redux/maintenanceSlice";
import activityReducer from "@/features/activity/redux/activitySlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        settings: settingsReducer,
        profile: profileReducer,
        setup: setupReducer,
        dashboard: dashboardReducer,
        user: userReducer,
        branch: branchReducer,
        category: categoryReducer,
        vendor: vendorReducer,
        purchase: purchaseReducer,
        inventory: inventoryReducer,
        stockMovement: stockMovementReducer,
        asset: assetReducer,
        maintenance: maintenanceReducer,
        activity: activityReducer,
    },
});