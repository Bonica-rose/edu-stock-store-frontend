import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import usePermission from "@/shared/hooks/usePermission";

export default function SidebarItem({ item, collapsed, onItemClick }) {
    const { hasPermission } = usePermission();
    const location = useLocation();

    const Icon = item.icon;
    const hasChildren = item.children?.length > 0;

    // Filter children by permission
    const visibleChildren = hasChildren
        ? item.children.filter(
            (child) => !child.permission || hasPermission(child.permission),
        )
        : [];

    // Parent permission
    const canViewParent = !item.permission || hasPermission(item.permission);

    // If parent has children, it is visible when at least
    // one child is accessible.
    const canView = hasChildren ? visibleChildren.length > 0 : canViewParent;

    // Active child
    const hasActiveChild = visibleChildren.some((child) =>
        location.pathname.startsWith(child.path),
    );

    const [open, setOpen] = useState(hasActiveChild);

    // Open Reports automatically when navigating directly
    // to one of its child pages.
    useEffect(() => {
        if (hasActiveChild) {
        setOpen(true);
        }
    }, [hasActiveChild]);

    if (!canView) {
        return null;
    }

  // Normal menu item
    if (!hasChildren) {
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

    // Parent menu with children
    if (collapsed) {
        return (
            <div className="relative">
                <NavLink
                    to={item.path}
                    onClick={onItemClick}
                    title={item.label}
                    className={({ isActive }) =>
                        `flex w-full items-center justify-center rounded-sm px-3 py-2 text-sm transition-colors ${
                        isActive || hasActiveChild
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`
                    }
                >
                    <Icon size={18} />
                </NavLink>
            </div>
        );
    }

    return (
        <div>
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={`flex w-full items-center rounded-sm px-3 py-2 text-sm transition-colors ${
                hasActiveChild ? "bg-muted" : "hover:bg-muted"
                }`}
            >
                <Icon size={18} />

                <span className="ml-3 flex-1 text-left">{item.label}</span>

                <ChevronDown
                size={16}
                className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="ml-5 mt-1 space-y-1 border-l pl-3">
                    {visibleChildren.map((child) => {
                        const ChildIcon = child.icon;
                        return (
                            <NavLink
                                key={child.path}
                                to={child.path}
                                end={child.exact}
                                onClick={onItemClick}
                                className={({ isActive }) =>
                                    `flex items-center rounded-sm px-3 py-2 text-sm transition-colors ${
                                        isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted"
                                    }`
                                }
                            >
                                {ChildIcon && <ChildIcon size={16} className={`${child.color}`} />}
                                <span className="ml-1">{child.label}</span>
                            </NavLink>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
