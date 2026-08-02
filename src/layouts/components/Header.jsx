import { Bell, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
    toggleSidebar,
    toggleMobileSidebar,
} from "@/features/ui/redux/uiSlice";
import UserDropdown from "./UserDropdown";

export default function Header() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <header className="flex h-16 items-center justify-between border-b bg-background px-6">
            {/* Left */}
            <div className="flex items-center gap-4">
            {/* Mobile */}
            <button
                className="rounded-sm border p-2 hover:bg-muted lg:hidden"
                onClick={() => dispatch(toggleMobileSidebar())}
            >
                <Menu size={16} />
            </button>

            {/* Desktop */}
            <button
                className="hidden rounded-sm border p-2 hover:bg-muted lg:block"
                onClick={() => dispatch(toggleSidebar())}
            >
                <Menu size={16} />
            </button>

            <div className="hidden items-center gap-2 lg:flex">
                <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
            <button className="rounded-sm border p-2 hover:bg-muted">
                <Bell size={16} />
            </button>

            <div className="flex items-center gap-2">
                <UserDropdown />
            </div>
            </div>
        </header>
    );
}
