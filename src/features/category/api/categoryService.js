import api from "@/shared/api/axios";
import API_ENDPOINTS from "@/shared/api/apiEndpoints";

const getCategories = async (query = {}) => {
    const params = {
        page: query.page,
        limit: query.limit,
    };

    if (query.search?.trim()) {
        params.search = query.search.trim();
    }

    if (query.type && query.type !== "all") {
        params.type = query.type;
    }

    if (query.isActive && query.isActive !== "all") {
        params.isActive = query.isActive;
    }

    if (query.sortBy) {
        params.sortBy = query.sortBy;
    }

    if (query.sortOrder) {
        params.sortOrder = query.sortOrder;
    }

    const response = await api.get(API_ENDPOINTS.CATEGORY.LIST, {
        params,
    });

    return response.data;
};

const getCategoryById = async (id) => {
    const response = await api.get(API_ENDPOINTS.CATEGORY.GET(id));

    return response.data;
};

const createCategory = async (categoryData) => {
    const response = await api.post(API_ENDPOINTS.CATEGORY.CREATE, categoryData);

    return response.data;
};

const updateCategory = async (id, categoryData) => {
    const response = await api.put(
        API_ENDPOINTS.CATEGORY.UPDATE(id),
        categoryData,
    );

    return response.data;
};

const changeCategoryStatus = async (id) => {
    const response = await api.patch(API_ENDPOINTS.CATEGORY.CHANGE_STATUS(id));

    return response.data;
};

const deleteCategory = async (id) => {
    const response = await api.delete(API_ENDPOINTS.CATEGORY.DELETE(id));

    return response.data;
};

export default {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    changeCategoryStatus,
    deleteCategory,
};
