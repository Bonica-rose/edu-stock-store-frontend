import { CATEGORY_TYPES } from "@/shared/constants/category";

export const getCategoryTypeBadgeClass = (type) => {
    switch (type) {
        case CATEGORY_TYPES.INVENTORY:
            return "bg-blue-100 text-blue-700 border-blue-200";

        case CATEGORY_TYPES.ASSET:
            return "bg-purple-100 text-purple-700 border-purple-200";

        case CATEGORY_TYPES.BOTH:
            return "bg-green-100 text-green-700 border-green-200";

        default:
            return "bg-gray-100 text-gray-700 border-gray-200";
    }
};
