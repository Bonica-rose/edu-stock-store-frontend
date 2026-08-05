import SidebarItem from "./SidebarItem";
import { sidebarMenu } from "@/shared/constants/sidebarMenu";
import logoIcon from "@/assets/logo/logo-icon.png";

export default function SidebarContent({ collapsed, onItemClick }) {
    return (
        <>
        <div className="border-b p-3">
            {collapsed ? (
            <div className="flex justify-center p-1">
                <img
                src={logoIcon}
                alt="Edu Stock & Store"
                className="h-8 w-auto object-contain"
                />
            </div>
            ) : (
            <div className="flex items-center gap-3">
                <img
                src={logoIcon}
                alt="Edu Stock & Store"
                className="h-10 w-auto object-contain"
                />

                <div className="leading-tight">
                <h1 className="text-lg font-bold">
                    <span className="text-blue-950">Edu</span>{" "}
                    <span className="text-blue-900">Stock</span>
                    <span className="text-slate-900">&</span>
                    <span className="text-green-700">Store</span>
                </h1>

                <p className="text-[10px] text-muted-foreground">
                    Manage Smarter. Store Better.
                </p>
                </div>
            </div>
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
