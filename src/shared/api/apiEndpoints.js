const API_ENDPOINTS = {
    SETUP: {
        INITIALIZE: "/setup",
        STATUS: "/setup/status",
    },

    AUTH: {
        LOGIN: "/auth/login",
        LOGOUT: "/auth/logout",
        CURRENT_USER: "/auth/me",
        CHANGE_PASSWORD: "/auth/change-password",
        FORGOT_PASSWORD: "/auth/forgot-password",
        RESET_PASSWORD: "/auth/reset-password",
    },

    PROFILE: {
        UPDATE: "users/profile",
        ACTIVITY: "users/profile/activity",
    },

    DASHBOARD: {
        GET_DASHBOARD: "/dashboard",
    },

    USER: {
        LIST: "/users",
        CREATE: "/users",
        GET: (id) => `/users/${id}`,
        UPDATE: (id) => `/users/${id}`,
        DELETE: (id) => `/users/${id}`,
        CHANGE_STATUS: (id) => `/users/${id}/status`,
    },

    BRANCH: {
        LIST: "/branches",
        CREATE: "/branches",
        GET: (id) => `/branches/${id}`,
        UPDATE: (id) => `/branches/${id}`,
        CHANGE_STATUS: (id) => `/branches/${id}/status`,
    },

    CATEGORY: {
        LIST: "/categories",
        CREATE: "/categories",
        GET: (id) => `/categories/${id}`,
        UPDATE: (id) => `/categories/${id}`,
        DELETE: (id) => `/categories/${id}`,
        CHANGE_STATUS: (id) => `/categories/${id}/status`,
    },

    VENDOR: {
        LIST: "/vendors",
        CREATE: "/vendors",
        GET: (id) => `/vendors/${id}`,
        UPDATE: (id) => `/vendors/${id}`,
        CHANGE_STATUS: (id) => `/vendors/${id}/status`,
        DELETE: (id) => `/vendors/${id}`,
    },

    PURCHASE: {
        LIST: "/purchases",
        CREATE: "/purchases",
        GET: (id) => `/purchases/${id}`,
    },

    INVENTORY: {
        LIST: "/inventory",
        CREATE: "/inventory",
        GET: (id) => `/inventory/${id}`,
        UPDATE: (id) => `/inventory/${id}`,
        CHANGE_STATUS: (id) => `/inventory/${id}/status`,
        DELETE: (id) => `/inventory/${id}`,
    },

    STOCK_MOVEMENT: {
        LIST: "/stock-movements",
        GET: (id) => `/stock-movements/${id}`,
        STOCK_IN: "/stock-movements/stock-in",
        STOCK_OUT: "/stock-movements/stock-out",
        TRANSFER: "/stock-movements/transfer",
        ADJUSTMENT: "/stock-movements/adjustment",
    },

    SETTINGS: "/settings",
};

export default API_ENDPOINTS;