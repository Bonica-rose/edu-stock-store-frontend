import api from "@/shared/api/axios";
import API_ENDPOINTS from "@/shared/api/apiEndpoints";

const getVendors = async (query = {}) => {
    const params = {
        page: query.page,
        limit: query.limit,
    };

    if (query.search?.trim()) {
        params.search = query.search.trim();
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

    const response = await api.get(API_ENDPOINTS.VENDOR.LIST, {
        params,
    });

    return response.data;
};

const getVendorById = async (id) => {
    const response = await api.get(API_ENDPOINTS.VENDOR.GET(id));
    return response.data;
};

const createVendor = async (vendorData) => {    
    const response = await api.post(API_ENDPOINTS.VENDOR.CREATE, vendorData);
    return response.data;
};

const updateVendor = async (id, vendorData) => {
    const response = await api.patch(API_ENDPOINTS.VENDOR.UPDATE(id), vendorData);
    return response.data;
};

const changeVendorStatus = async (id) => {
    const response = await api.patch(API_ENDPOINTS.VENDOR.CHANGE_STATUS(id));
    return response.data;
};

const deleteVendor = async (id) => {
    const response = await api.delete(API_ENDPOINTS.VENDOR.DELETE(id));
    return response.data;
};

export default {
    getVendors,
    getVendorById,
    createVendor,
    updateVendor,
    changeVendorStatus,
    deleteVendor,
};
