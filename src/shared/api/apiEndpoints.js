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

    SETTINGS: "/settings",
};

export default API_ENDPOINTS;