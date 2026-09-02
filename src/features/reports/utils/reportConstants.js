import { PERMISSIONS } from "@/shared/constants/permissions";

export const REPORT_TYPES = {
    DASHBOARD: "dashboard",
    INVENTORY: "inventory",
    LOW_STOCK: "low-stock",
    ASSET: "asset",
    STOCK_MOVEMENT: "stock-movement",
    PURCHASE: "purchase",
    MAINTENANCE: "maintenance",
    VENDOR: "vendor",
};

export const REPORT_CONFIG = {
    [REPORT_TYPES.DASHBOARD]: {
        title: "Reports Dashboard",
        description:
        "Overview of inventory, assets, vendors, stock movements, and maintenance.",
        permission: PERMISSIONS.DASHBOARD,
    },

    [REPORT_TYPES.INVENTORY]: {
        title: "Inventory Report",
        description:
        "View inventory stock, valuation, category, vendor, and branch details.",
        permission: PERMISSIONS.INVENTORY,
        exportPermission: PERMISSIONS.INVENTORY_EXPORT,
    },

    [REPORT_TYPES.LOW_STOCK]: {
        title: "Low Stock Report",
        description:
        "View inventory items that have reached the low stock threshold.",
        permission: PERMISSIONS.LOW_STOCK,
        exportPermission: PERMISSIONS.LOW_STOCK_EXPORT,
    },

    [REPORT_TYPES.ASSET]: {
        title: "Asset Report",
        description:
        "View asset details, assignment, status, condition, and valuation.",
        permission: PERMISSIONS.ASSET,
        exportPermission: PERMISSIONS.ASSET_EXPORT,
    },

    [REPORT_TYPES.STOCK_MOVEMENT]: {
        title: "Stock Movement Report",
        description:
        "View stock-in, stock-out, transfer, and adjustment movements.",
        permission: PERMISSIONS.STOCK_MOVEMENT,
        exportPermission: PERMISSIONS.STOCK_MOVEMENT_EXPORT,
    },

    [REPORT_TYPES.PURCHASE]: {
        title: "Purchase Report",
        description:
        "View purchase summaries, quantities, vendors, branches, and amounts.",
        permission: PERMISSIONS.PURCHASE,
        exportPermission: PERMISSIONS.PURCHASE_EXPORT,
    },

    [REPORT_TYPES.MAINTENANCE]: {
        title: "Maintenance Report",
        description:
        "View maintenance activities, priorities, statuses, assignments, and repair costs.",
        permission: PERMISSIONS.MAINTENANCE,
        exportPermission: PERMISSIONS.MAINTENANCE_EXPORT,
    },

    [REPORT_TYPES.VENDOR]: {
        title: "Vendor Report",
        description:
        "View vendor information, inventory usage, purchase counts, and purchase amounts.",
        permission: PERMISSIONS.VENDOR,
        exportPermission: PERMISSIONS.VENDOR_EXPORT,
    },
};

export const REPORT_NAVIGATION = [
    {
        type: REPORT_TYPES.DASHBOARD,
        label: "Dashboard",
        path: "/reports",
        permission: PERMISSIONS.DASHBOARD,
    },
    {
        type: REPORT_TYPES.INVENTORY,
        label: "Inventory",
        path: "/reports/inventory",
        permission: PERMISSIONS.INVENTORY,
    },
    {
        type: REPORT_TYPES.LOW_STOCK,
        label: "Low Stock",
        path: "/reports/low-stock",
        permission: PERMISSIONS.LOW_STOCK,
    },
    {
        type: REPORT_TYPES.ASSET,
        label: "Assets",
        path: "/reports/assets",
        permission: PERMISSIONS.ASSET,
    },
    {
        type: REPORT_TYPES.STOCK_MOVEMENT,
        label: "Stock Movements",
        path: "/reports/stock-movements",
        permission: PERMISSIONS.STOCK_MOVEMENT,
    },
    {
        type: REPORT_TYPES.PURCHASE,
        label: "Purchases",
        path: "/reports/purchases",
        permission: PERMISSIONS.PURCHASE,
    },
    {
        type: REPORT_TYPES.MAINTENANCE,
        label: "Maintenance",
        path: "/reports/maintenance",
        permission: PERMISSIONS.MAINTENANCE,
    },
    {
        type: REPORT_TYPES.VENDOR,
        label: "Vendors",
        path: "/reports/vendors",
        permission: PERMISSIONS.VENDOR,
    },
];
