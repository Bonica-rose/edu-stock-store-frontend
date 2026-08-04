import api from "@/shared/api/axios";
import API_ENDPOINTS from "@/shared/api/apiEndpoints";

const getProfileActivity = async () => {
    const response = await api.get(
        API_ENDPOINTS.PROFILE.ACTIVITY
    );

    return response.data;
};

const updateProfile = async (profileData) => {
    const response = await api.patch(
        API_ENDPOINTS.PROFILE.UPDATE,
        profileData
    );

    return response.data;
};

const changePassword = async (passwordData) => {
    const response = await api.patch(
        API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
        passwordData
    );

    return response.data;
};

export default {
    updateProfile,
    changePassword,
    getProfileActivity,
};