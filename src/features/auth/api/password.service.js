import api from "@/shared/api/axios";
import API_ENDPOINTS from "@/shared/api/apiEndpoints";

const forgotPassword = async (email) => {
    const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, email);
    return response.data;
};

const resetPassword = async (data) => {
    const response = await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
    return response.data;
};

const changePassword = async (data) => {
    const response = await api.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
    return response.data;
};

export default {
    forgotPassword,
    resetPassword,
    changePassword
};