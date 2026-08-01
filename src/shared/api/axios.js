import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});


api.interceptors.request.use(
    (config) => {
        // Future:
        // Add request logging
        // Add custom headers if needed

        return config;
    },
    (error) => Promise.reject(error)
);


api.interceptors.response.use(
    (response) => response,

    (error) => {
        // Network Error
        if (!error.response) {
            return Promise.reject({
                success: false,
                message: "Network error. Please check your internet connection.",
            });
        }

        // Unauthorized
        if (error.response.status === 401) {
            // Don't logout here.
            // Let ProtectedRoute or the calling thunk decide what to do.
        }

        return Promise.reject(error);
    }
);

export default api;