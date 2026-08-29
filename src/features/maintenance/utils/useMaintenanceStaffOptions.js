import { useEffect, useState } from "react";
import userService from "@/features/user/api/userService";
import { ROLES } from "@/shared/constants/roles";

export default function useMaintenanceStaffOptions() {
    const [maintenanceStaff, setMaintenanceStaff] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStaff = async () => {
            try {
                setLoading(true);

                const response = await userService.getUsers({
                    page: 1,
                    limit: 100,
                    role: ROLES.MAINTENANCE_STAFF,
                    isActive: "true",
                });

                setMaintenanceStaff(response.data ?? []);
            } finally {
                setLoading(false);
            }
        };

        loadStaff();
    }, []);

    return {
        maintenanceStaff,
        loading,
    };
}
