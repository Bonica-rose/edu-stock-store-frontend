import api from "@/shared/api/axios";

import API_ENDPOINTS from "@/shared/api/apiEndpoints";

const getMaintenances = async (query = {}) => {
    const params = {
        page: query.page,
        limit: query.limit,
    };

    if (query.search?.trim()) {
        params.search = query.search.trim();
    }

    if (query.status && query.status !== "all") {
        params.status = query.status;
    }

    if (query.priority && query.priority !== "all") {
        params.priority = query.priority;
    }

    if (query.assignedTo && query.assignedTo !== "all") {
        params.assignedTo = query.assignedTo;
    }

    if (query.reportedBy && query.reportedBy !== "all") {
        params.reportedBy = query.reportedBy;
    }

    if (query.branch && query.branch !== "all") {
        params.branch = query.branch;
    }

    if (query.sortBy) {
        params.sortBy = query.sortBy;
    }

    if (query.sortOrder) {
        params.sortOrder = query.sortOrder;
    }

    const response = await api.get(API_ENDPOINTS.MAINTENANCE.LIST, {
        params,
    });

    return response.data;
};

const getMaintenanceById = async (id) => {
    const response = await api.get(API_ENDPOINTS.MAINTENANCE.GET(id));
    return response.data;
};

const createMaintenance = async (maintenanceData) => {
    const response = await api.post(
        API_ENDPOINTS.MAINTENANCE.CREATE,
        maintenanceData,
    );

    return response.data;
};

const assignMaintenance = async (id, assignmentData) => {
    const response = await api.patch(
        API_ENDPOINTS.MAINTENANCE.ASSIGN(id),
        assignmentData,
    );

    return response.data;
};

const updateMaintenanceStatus = async (id, statusData) => {
    const response = await api.patch(
        API_ENDPOINTS.MAINTENANCE.UPDATE_STATUS(id),
        statusData,
    );

    return response.data;
};

const completeMaintenance = async (id, completionData) => {
    const response = await api.patch(
        API_ENDPOINTS.MAINTENANCE.COMPLETE(id),
        completionData,
    );

    return response.data;
};

const deleteMaintenance = async (id) => {
    const response = await api.delete(API_ENDPOINTS.MAINTENANCE.DELETE(id));
    return response.data;
};

export default {
    getMaintenances,
    getMaintenanceById,
    createMaintenance,
    assignMaintenance,
    updateMaintenanceStatus,
    completeMaintenance,
    deleteMaintenance,
};
