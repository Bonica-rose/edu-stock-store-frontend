import api from "@/shared/api/axios";
import API_ENDPOINTS from "@/shared/api/apiEndpoints";

const getDashboard = async () => {
    const response = await api.get(API_ENDPOINTS.DASHBOARD.GET_DASHBOARD);
    return response.data;
};

const getStockMovementTrend = async () => {
    const response = await api.get(
        API_ENDPOINTS.DASHBOARD.GET_STOCK_MOVEMENT_TREND,
    );

    return response.data;
};

const getInventoryByCategory = async () => {
    const response = await api.get(
        API_ENDPOINTS.DASHBOARD.GET_INVENTORY_BY_CATEGORY,
    );

    return response.data;
};

const getStockHealth = async () => {
    const response = await api.get(API_ENDPOINTS.DASHBOARD.GET_STOCK_HEALTH);

    return response.data;
};

export default {
    getDashboard,
    getStockMovementTrend,
    getInventoryByCategory,
    getStockHealth,
};