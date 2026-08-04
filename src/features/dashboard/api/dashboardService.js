import api from "@/shared/api/axios";
import API_ENDPOINTS from "@/shared/api/apiEndpoints";

const getDashboard = async () => {
    const response = await api.get(API_ENDPOINTS.DASHBOARD.GET_DASHBOARD);
    return response.data;
};

export default {
    getDashboard,
};