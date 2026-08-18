import api from "@/shared/api/axios";
import API_ENDPOINTS from "@/shared/api/apiEndpoints";

// Get Stock Movements
const getStockMovements = async (query = {}) => {
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

    if (query.movementType && query.movementType !== "all") {
        params.movementType = query.movementType;
    }

    if (query.startDate) {
        params.startDate = query.startDate;
    }

    if (query.endDate) {
        params.endDate = query.endDate;
    }

    const response = await api.get(API_ENDPOINTS.STOCK_MOVEMENT.LIST, {
        params,
    });

    return response.data;
};

// Get Stock Movement by ID
const getStockMovementById = async (id) => {
    const response = await api.get(API_ENDPOINTS.STOCK_MOVEMENT.GET(id));
    return response.data;
};

// Stock In
const stockIn = async (movementData) => {
    const response = await api.post(
        API_ENDPOINTS.STOCK_MOVEMENT.STOCK_IN,
        movementData,
    );

    return response.data;
};

// Stock Out
const stockOut = async (movementData) => {
    const response = await api.post(
        API_ENDPOINTS.STOCK_MOVEMENT.STOCK_OUT,
        movementData,
    );

    return response.data;
};

// Transfer Stock
const transferStock = async (movementData) => {
    const response = await api.post(
        API_ENDPOINTS.STOCK_MOVEMENT.TRANSFER,
        movementData,
    );

    return response.data;
};

// Stock Adjustment
const adjustStock = async (movementData) => {
    const response = await api.post(
        API_ENDPOINTS.STOCK_MOVEMENT.ADJUSTMENT,
        movementData,
    );

    return response.data;
};

export default {
    getStockMovements,
    getStockMovementById,
    stockIn,
    stockOut,
    transferStock,
    adjustStock,
};
