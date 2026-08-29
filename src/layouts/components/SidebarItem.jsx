import { NavLink } from "react-router-dom";
import usePermission from "@/shared/hooks/usePermission";

export default function SidebarItem({ item, collapsed, onItemClick }) {
    const { hasPermission } = usePermission();

    // No permission defined = accessible to authenticated users
    const canView = !item.permission || hasPermission(item.permission);

    if (!canView) {
    return null;
    }
    const Icon = item.icon;

    return (
        <NavLink
            to={item.path}
            onClick={onItemClick}
            title={collapsed ? item.label : ""}
            className={({ isActive }) =>
            `flex w-full items-center rounded-sm px-3 py-2 text-sm transition-colors ${
                isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            } ${collapsed ? "justify-center" : "gap-3"}`
            }
        >
            <Icon size={18} />

            {!collapsed && <span>{item.label}</span>}
        </NavLink>
    );
}
