import api from "@/shared/api/axios";
import API_ENDPOINTS from "@/shared/api/apiEndpoints";

const getAssets = async (query = {}) => {
    const params = {
        page: query.page,
        limit: query.limit,
    };

    if (query.inventory && query.inventory !== "all") {
        params.inventory = query.inventory;
    }

    if (query.branch && query.branch !== "all") {
        params.branch = query.branch;
    }

    if (query.status && query.status !== "all") {
        params.status = query.status;
    }

    if (query.assignedTo && query.assignedTo !== "all") {
        params.assignedTo = query.assignedTo;
    }

    if (query.isActive && query.isActive !== "all") {
        params.isActive = query.isActive;
    }

    const response = await api.get(API_ENDPOINTS.ASSET.LIST, {
        params,
    });

    return response.data;
};

const getAssetById = async (id) => {
    const response = await api.get(API_ENDPOINTS.ASSET.GET(id));
    return response.data;
};

const createAsset = async (assetData) => {
    const response = await api.post(API_ENDPOINTS.ASSET.CREATE, assetData);
    return response.data;
};

const updateAsset = async (id, assetData) => {
    const response = await api.put(API_ENDPOINTS.ASSET.UPDATE(id), assetData);
    return response.data;
};

const changeAssetStatus = async (id) => {
    const response = await api.patch(API_ENDPOINTS.ASSET.CHANGE_STATUS(id));
    return response.data;
};

const deleteAsset = async (id) => {
    const response = await api.delete(API_ENDPOINTS.ASSET.DELETE(id));
    return response.data;
};

const assignAsset = async (id, assignmentData) => {
    const response = await api.patch(
        API_ENDPOINTS.ASSET.ASSIGN(id),
        assignmentData,
    );

    return response.data;
};

const returnAsset = async (id, returnData) => {
    const response = await api.patch(API_ENDPOINTS.ASSET.RETURN(id), returnData);
    return response.data;
};

export default {
    getAssets,
    getAssetById,
    createAsset,
    updateAsset,
    changeAssetStatus,
    deleteAsset,
    assignAsset,
    returnAsset,
};
