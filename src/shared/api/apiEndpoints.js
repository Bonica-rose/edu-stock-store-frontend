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
        GET_DASHBOARD: "/dashboard"
    },

    USERS: {
        LIST: "/users",
        CREATE: "/users",
        DETAILS: (id) => `/users/${id}`,
        UPDATE: (id) => `/users/${id}`,
        DELETE: (id) => `/users/${id}`,
    },

    // axios.get("/users") ==> axios.get(API_ENDPOINTS.USERS.LIST)

    BRANCHES: {
        LIST: "/branches",
        CREATE: "/branches",
        DETAILS: (id) => `/branches/${id}`,
        UPDATE: (id) => `/branches/${id}`,
        DELETE: (id) => `/branches/${id}`,
    },

    SETTINGS: "/settings",
};

export default API_ENDPOINTS;