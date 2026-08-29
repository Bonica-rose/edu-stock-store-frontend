import api from "@/shared/api/axios";
import API_ENDPOINTS from "@/shared/api/apiEndpoints";

const getActivities = async (query = {}) => {
    const params = {
        page: query.page,
        limit: query.limit,
    };

    if (query.search?.trim()) {
        params.search = query.search.trim();
    }

    if (query.module && query.module !== "all") {
        params.module = query.module;
    }

    if (query.action && query.action !== "all") {
        params.action = query.action;
    }

    if (query.user && query.user !== "all") {
        params.user = query.user;
    }

    if (query.startDate) {
        params.startDate = query.startDate;
    }

    if (query.endDate) {
        params.endDate = query.endDate;
    }

    if (query.sortBy) {
        params.sortBy = query.sortBy;
    }

    if (query.sortOrder) {
        params.sortOrder = query.sortOrder;
    }
    
    const response = await api.get(API_ENDPOINTS.ACTIVITY.LIST, {
        params,
    });

    return response.data;
};

const getActivity = async (id) => {
    const response = await api.get(API_ENDPOINTS.ACTIVITY.GET(id));
    return response.data;
};

export default {
    getActivities,
    getActivity,
};
