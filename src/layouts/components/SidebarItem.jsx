import { NavLink } from "react-router-dom";

export default function SidebarItem({ item, collapsed, onItemClick }) {
    const Icon = item.icon;

    return (
        <NavLink
        to={item.path}
        onClick={onItemClick}
        className={({ isActive }) =>
            `flex items-center rounded-sm px-3 py-2 text-sm transition-colors ${
            isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            } ${collapsed ? "justify-center" : "gap-3"}`
        }
        >
        <Icon size={18} />

        {!collapsed && <span>{item.label}</span>}
        </NavLink>
    );
}
