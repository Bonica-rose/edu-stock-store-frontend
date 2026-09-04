import api from "@/shared/api/axios";

const getDashboardPredictions = async () => {
    const response = await api.get("/ai/dashboard");
    return response.data;
};

const getInventoryPrediction = async (inventoryId) => {
    const response = await api.get(`/ai/inventory/${inventoryId}`);
    return response.data;
};

export default {
    getDashboardPredictions,
    getInventoryPrediction,
};
