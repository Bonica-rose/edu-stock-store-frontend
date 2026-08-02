const API_ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/login",
        LOGOUT: "/auth/logout",
        CURRENT_USER: "/auth/me",
        CHANGE_PASSWORD: "/auth/change-password",
        FORGOT_PASSWORD: "/auth/forgot-password",
        RESET_PASSWORD: "/auth/reset-password",
    },

    PROFILE: {
        FETCH: "/auth/me",
        UPDATE: "users/profile",
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