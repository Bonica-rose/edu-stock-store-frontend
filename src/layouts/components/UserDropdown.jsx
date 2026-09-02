import {
  UserCircle,
  LogOut,
  KeyRound,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { logoutUser } from "@/features/auth/redux/authThunks";
import usePermission from "@/shared/hooks/usePermission";
import { PERMISSIONS } from "@/shared/constants/permissions";

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
    const { hasPermission } = usePermission();
    
    const canViewSettings = hasPermission(PERMISSIONS.SETTINGS_VIEW);

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
        <DropdownMenuTrigger 
          type="button"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/60 transition-colors"
        >
          {/* Profile Image / Fallback Icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <UserCircle className="h-7 w-7 text-muted-foreground" />
            )}
          </div>

          {/* User Information */}
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium leading-5">
              {user?.firstName} {user?.lastName}
            </p>

            <p className="text-xs text-muted-foreground">{user?.role}</p>

            {user?.branch?.branchName && (
              <p className="text-xs text-muted-foreground">
                {user.branch.branchName}
              </p>
            )}
          </div>

          <ChevronDown className="h-4 w-4 text-muted-foreground" />
          
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
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

            {canViewSettings && (
              <DropdownMenuItem onClick={() => navigate("/edu/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
            )}

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
