import { UserCircle, LogOut, KeyRound, Settings } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { logoutUser } from "@/features/auth/redux/authThunks";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup, 
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function UserDropdown() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, loading } = useSelector((state) => state.auth);

    const handleLogout = async () => {
        const result = await dispatch(logoutUser());

        if (logoutUser.fulfilled.match(result)) {
          toast.success(result.payload.message);
          navigate("/login", { replace: true });
        } else {
          toast.error(result.payload?.message || "Logout failed.");
        }
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger> {/* removed asChild from here & changed button to span */}
          <span className="flex items-center gap-2 rounded-sm border px-3 py-2 hover:bg-muted">
            <UserCircle size={32} />

            <div className="text-left">
              <p className="text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </p>

              <p className="text-xs text-muted-foreground">{user?.role}</p>
            </div>
          </span>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 rounded-sm">
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => navigate("/edu/profile")}>
              <UserCircle className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigate("/edu/change-password")}>
              <KeyRound className="mr-2 h-4 w-4" />
              Change Password
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigate("/edu/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem disabled={loading.logout} onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              {loading.logout ? "Logging out..." : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
}
