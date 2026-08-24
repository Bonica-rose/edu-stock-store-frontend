export const MAINTENANCE_STATUS = Object.freeze({
    PENDING: "Pending",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
});

export const MAINTENANCE_PRIORITY = Object.freeze({
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
});

export const ASSET_CONDITION = Object.freeze({
    GOOD: "Good",
    DAMAGED: "Damaged",
    UNDER_MAINTENANCE: "Under Maintenance",
    RETIRED: "Retired",
});

export const MAINTENANCE_STATUS_OPTIONS = Object.values(MAINTENANCE_STATUS).map(
    (value) => ({
        value,
        label: value,
    }),
);

export const MAINTENANCE_PRIORITY_OPTIONS = Object.values(MAINTENANCE_PRIORITY).map(
    (value) => ({
        value,
        label: value,
    })
);

export const ASSET_CONDITION_OPTIONS = Object.values(ASSET_CONDITION).map(
    (value) => ({
        value,
        label: value,
    })
);
