import {
    LayoutDashboard,
    Users,
    Building2,
    FolderTree,
    Truck,
    Boxes,
    ShoppingCart,
    ArrowLeftRight,
    Monitor,
    Wrench,
    FileBarChart,
    ChartColumn,
    Settings,
    User,
} from "lucide-react";

export const sidebarMenu = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/edu/dashboard",
    },
    {
        label: "Users",
        icon: Users,
        path: "/edu/users",
    },
    {
        label: "Branches",
        icon: Building2,
        path: "/edu/branches",
    },
    {
        label: "Categories",
        icon: FolderTree,
        path: "/edu/categories",
    },
    {
        label: "Vendors",
        icon: Truck,
        path: "/edu/vendors",
    },
    {
        label: "Inventory",
        icon: Boxes,
        path: "/edu/inventory",
    },
    {
        label: "Purchases",
        icon: ShoppingCart,
        path: "/edu/purchases",
    },
    {
        label: "Stock Movement",
        icon: ArrowLeftRight,
        path: "/edu/stock-movements",
    },
    {
        label: "Assets",
        icon: Monitor,
        path: "/edu/assets",
    },
    {
        label: "Maintenance",
        icon: Wrench,
        path: "/edu/maintenance",
    },
    {
        label: "Reports",
        icon: FileBarChart,
        path: "/edu/reports",
    },
    {
        label: "Analytics",
        icon: ChartColumn,
        path: "/edu/analytics",
    },
    // {
    //     label: "Settings",
    //     icon: Settings,
    //     path: "/edu/settings",
    // },
    // {
    //     label: "Profile",
    //     icon: User,
    //     path: "/edu/profile",
    // },
];