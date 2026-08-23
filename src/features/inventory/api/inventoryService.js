import api from "@/shared/api/axios";
import API_ENDPOINTS from "@/shared/api/apiEndpoints";

const getInventories = async (query = {}) => {
    const params = {
        page: query.page,
        limit: query.limit,
    };

    if (query.search?.trim()) {
        params.search = query.search.trim();
    }

    if (query.itemType && query.itemType !== "all") {
        params.itemType = query.itemType;
    }

    if (query.category && query.category !== "all") {
        params.category = query.category;
    }

    if (query.vendor && query.vendor !== "all") {
        params.vendor = query.vendor;
    }

    if (query.branch && query.branch !== "all") {
        params.branch = query.branch;
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

    const response = await api.get(API_ENDPOINTS.INVENTORY.LIST, {
        params,
    });

    return response.data;
};

const getInventoryById = async (id) => {
    const response = await api.get(API_ENDPOINTS.INVENTORY.GET(id));
    return response.data;
};

const createInventory = async (inventoryData) => {
    const response = await api.post(
        API_ENDPOINTS.INVENTORY.CREATE,
        inventoryData,
    );
    return response.data;
};

const updateInventory = async (id, inventoryData) => {
    const response = await api.patch(
        API_ENDPOINTS.INVENTORY.UPDATE(id),
        inventoryData,
    );
    return response.data;
};

const changeInventoryStatus = async (id) => {
    const response = await api.patch(API_ENDPOINTS.INVENTORY.CHANGE_STATUS(id));
    return response.data;
};

const deleteInventory = async (id) => {
    const response = await api.delete(API_ENDPOINTS.INVENTORY.DELETE(id));
    return response.data;
};

export default {
    getInventories,
    getInventoryById,
    createInventory,
    updateInventory,
    changeInventoryStatus,
    deleteInventory,
};
