import api from "@/shared/api/axios";
import API_ENDPOINTS from "@/shared/api/apiEndpoints";

const getUsers = async (query = {}) => {

    const params = {
        page: query.page,
        limit: query.limit,
    };

    if (query.search?.trim()) {
        params.search = query.search.trim();
    }

    if (query.role && query.role !== "all") {
        params.role = query.role;
    }

    if (query.branch && query.branch !== "all") {
        params.branch = query.branch;
    }

    const response = await api.get(API_ENDPOINTS.USER.LIST, {
        params,
    });

    return response.data;
};

const getUserById = async (id) => {
    const response = await api.get(API_ENDPOINTS.USER.GET(id));
    return response.data;
};

const createUser = async (userData) => {
    const response = await api.post(
        API_ENDPOINTS.USER.CREATE,
        userData
    );

    return response.data;
};

const updateUser = async (id, userData) => {
    const response = await api.patch(
        API_ENDPOINTS.USER.UPDATE(id),
        userData
    );

    return response.data;
};

const changeUserStatus = async (id, isActive) => {
    const response = await api.patch(
        API_ENDPOINTS.USER.CHANGE_STATUS(id),
        { isActive }
    );

    return response.data;
};

const deleteUser = async (id) => {
    const response = await api.delete(
        API_ENDPOINTS.USER.DELETE(id)
    );

    return response.data;
};

export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    changeUserStatus,
    deleteUser,
};