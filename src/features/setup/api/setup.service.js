import api from "@/shared/api/axios";
import API_ENDPOINTS from "@/shared/api/apiEndpoints";

const getSetupStatus = async () => {
    const response = await api.get(API_ENDPOINTS.SETUP.STATUS);
    return response.data;
};

const initializeSystem = async (setupData) => {
    const response = await api.post(
        API_ENDPOINTS.SETUP.INITIALIZE,
        setupData
    );

    return response.data;
};

export default {
    getSetupStatus,
    initializeSystem,
};