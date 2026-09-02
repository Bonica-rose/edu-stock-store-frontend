import api from "@/shared/api/axios";
import API_ENDPOINTS from "@/shared/api/apiEndpoints";

const getDashboardSummary = async (query = {}) => {
    const response = await api.get(API_ENDPOINTS.REPORT.DASHBOARD, {
        params: query,
    });

    return response.data;
};

const getInventoryReport = async (query = {}) => {
    const response = await api.get(API_ENDPOINTS.REPORT.INVENTORY, {
        params: query,
    });

    return response.data;
};

const exportInventoryReport = async (query = {}) => {
    const response = await api.get(API_ENDPOINTS.REPORT.INVENTORY_EXPORT, {
        params: query,
        responseType: "blob",
    });

    return response;
};

const getLowStockReport = async (query = {}) => {
    const response = await api.get(API_ENDPOINTS.REPORT.LOW_STOCK, {
        params: query,
    });

    return response.data;
};

const exportLowStockReport = async (query = {}) => {
    const response = await api.get(API_ENDPOINTS.REPORT.LOW_STOCK_EXPORT, {
        params: query,
        responseType: "blob",
    });

    return response;
};

const getAssetReport = async (query = {}) => {
    const response = await api.get(API_ENDPOINTS.REPORT.ASSET, {
        params: query,
    });

    return response.data;
};

const exportAssetReport = async (query = {}) => {
    const response = await api.get(API_ENDPOINTS.REPORT.ASSET_EXPORT, {
        params: query,
        responseType: "blob",
    });

    return response;
};

const getStockMovementReport = async (query = {}) => {
    const response = await api.get(API_ENDPOINTS.REPORT.STOCK_MOVEMENT, {
        params: query,
    });

    return response.data;
};

const exportStockMovementReport = async (query = {}) => {
    const response = await api.get(API_ENDPOINTS.REPORT.STOCK_MOVEMENT_EXPORT, {
        params: query,
        responseType: "blob",
    });

    return response;
};

const getPurchaseReport = async (query = {}) => {
    const response = await api.get(API_ENDPOINTS.REPORT.PURCHASE, {
        params: query,
    });

    return response.data;
};

const exportPurchaseReport = async (query = {}) => {
    const response = await api.get(API_ENDPOINTS.REPORT.PURCHASE_EXPORT, {
        params: query,
        responseType: "blob",
    });

    return response;
};

const getMaintenanceReport = async (query = {}) => {
    const response = await api.get(API_ENDPOINTS.REPORT.MAINTENANCE, {
        params: query,
    });

    return response.data;
};

const exportMaintenanceReport = async (query = {}) => {
    const response = await api.get(API_ENDPOINTS.REPORT.MAINTENANCE_EXPORT, {
        params: query,
        responseType: "blob",
    });

    return response;
};

const getVendorReport = async (query = {}) => {
    const response = await api.get(API_ENDPOINTS.REPORT.VENDOR, {
        params: query,
    });

    return response.data;
};

const exportVendorReport = async (query = {}) => {
    const response = await api.get(API_ENDPOINTS.REPORT.VENDOR_EXPORT, {
        params: query,
        responseType: "blob",
    });

    return response;
};

export default {
    getDashboardSummary,

    getInventoryReport,
    exportInventoryReport,

    getLowStockReport,
    exportLowStockReport,

    getAssetReport,
    exportAssetReport,

    getStockMovementReport,
    exportStockMovementReport,

    getPurchaseReport,
    exportPurchaseReport,

    getMaintenanceReport,
    exportMaintenanceReport,

    getVendorReport,
    exportVendorReport,
};
