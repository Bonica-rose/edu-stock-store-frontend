export const buildReportQuery = ({
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    ...filters
}) => {
    const query = {};

    if (page !== undefined) {
        query.page = page;
    }

    if (limit !== undefined) {
        query.limit = limit;
    }

    if (search?.trim()) {
        query.search = search.trim();
    }

    if (sortBy) {
        query.sortBy = sortBy;
    }

    if (sortOrder) {
        query.sortOrder = sortOrder;
    }

    Object.entries(filters).forEach(([key, value]) => {
        if (
            value !== undefined &&
            value !== null &&
            value !== "" &&
            value !== "all"
        ) {
            query[key] = value;
        }
    });

    return query;
};
