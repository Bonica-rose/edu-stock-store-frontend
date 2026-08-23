import dayjs from "dayjs";

export const formatDate = (date, format = "DD/MM/YYYY") => {
    if (!date) return "-";

    return dayjs(date).format(format);
};

export const formatDateTime = (date, format = "DD/MM/YYYY h:mm A") => {
    if (!date) return "-";

    return dayjs(date).format(format);
};

/*
* formatDate(date, "DD MMM, YYYY") : 23 Jul, 2026
* formatDateTime(date, "DD MMMM, YYYY h:mm A") : 15 August, 2026 8:56 AM
*/