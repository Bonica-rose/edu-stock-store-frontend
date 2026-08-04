import api from "@/shared/api/axios";
import API_ENDPOINTS  from "@/shared/api/apiEndpoints";

const getSettings = async () => {
    const response = await api.get(API_ENDPOINTS.SETTINGS);
    return response.data;
};

const updateSettings = async (settingsData) => {
    const response = await api.patch(
        API_ENDPOINTS.SETTINGS,
        settingsData
    );
    return response.data;
};

const settingsService = {
    getSettings,
    updateSettings,
};

export default settingsService;