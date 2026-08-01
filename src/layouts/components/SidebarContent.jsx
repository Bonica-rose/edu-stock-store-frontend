import SidebarItem from "./SidebarItem";
import { sidebarMenu } from "@/shared/constants/sidebarMenu";

export default function SidebarContent({ collapsed, onItemClick }) {
    return (
        <>
            <div className="border-b p-4.5">
                {collapsed ? (
                <h1 className="text-lg font-extrabold">ES</h1>
                ) : (
                <h1 className="text-lg font-bold">Edu Stock&Store</h1>
                )}
            </div>

            <nav className="space-y-1 p-2">
                {sidebarMenu.map((item) => (
                <SidebarItem
                    key={item.path}
                    item={item}
                    collapsed={collapsed}
                    onItemClick={onItemClick}
                />
                ))}
            </nav>
        </>
    );
}
