import api from "@/shared/api/axios";
import API_ENDPOINTS from "@/shared/api/apiEndpoints";

// Get Purchases
export const getPurchases = async (params) => {
    const response = await api.get(API_ENDPOINTS.PURCHASE.LIST, {
        params,
    });
    return response.data;
};

// Get Single Purchase
export const getPurchase = async (id) => {
    const response = await api.get(API_ENDPOINTS.PURCHASE.GET(id));
    return response.data;
};

// Create Purchase
export const createPurchase = async (purchaseData) => {
    const response = await api.post(API_ENDPOINTS.PURCHASE.CREATE, purchaseData);
    return response.data;
};

const purchaseService = {
    getPurchases,
    getPurchase,
    createPurchase,
};

export default purchaseService;
