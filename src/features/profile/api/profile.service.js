import api from "@/shared/api/axios";
import API_ENDPOINTS from "@/shared/api/apiEndpoints";

const getProfile = async () => {
    const response = await api.get(API_ENDPOINTS.PROFILE.FETCH);
    return response.data;
};

const updateProfile = async (profileData) => {
    const response = await api.patch(
        API_ENDPOINTS.PROFILE.UPDATE,
        profileData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

const changePassword = async (passwordData) => {
    const response = await api.post(
        API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
        passwordData
    );

    return response.data;
};

export default {
    getProfile,
    updateProfile,
    changePassword,
};