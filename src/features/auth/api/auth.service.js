import api from "@/shared/api/axios";
import API_ENDPOINTS from "@/shared/api/apiEndpoints";

const login = async (credentials) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
};

const logout = async () => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
};

const getCurrentUser = async () => {
    const response = await api.get(API_ENDPOINTS.AUTH.CURRENT_USER);
    return response.data;
};

export default {
    login,
    logout,
    getCurrentUser,
};