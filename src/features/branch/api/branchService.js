import api from "@/shared/api/axios";
import API_ENDPOINTS from "@/shared/api/apiEndpoints";

// Get Branches
export const getBranches = async (params) => {
    const response = await api.get(API_ENDPOINTS.BRANCH.LIST, { params });
    return response.data;
};

// Get Single Branch
export const getBranch = async (id) => {
    const response = await api.get(API_ENDPOINTS.BRANCH.GET(id));
    return response.data;
};

// Create Branch
export const createBranch = async (branchData) => {
    const response = await api.post(API_ENDPOINTS.BRANCH.CREATE, branchData);
    return response.data;
};

// Update Branch
export const updateBranch = async ({ id, branchData }) => {
    const response = await api.patch(API_ENDPOINTS.BRANCH.UPDATE(id), branchData);
    return response.data;
};

// Change Branch Status
export const changeBranchStatus = async ({ id, isActive }) => {
    const response = await api.patch(
        API_ENDPOINTS.BRANCH.CHANGE_STATUS(id), 
        { isActive }
    );

    return response.data;
};

const branchService = {
    getBranches,
    getBranch,
    createBranch,
    updateBranch,
    changeBranchStatus,
};

export default branchService;