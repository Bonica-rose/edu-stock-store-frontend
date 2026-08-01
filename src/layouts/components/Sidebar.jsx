import { useDispatch, useSelector } from "react-redux";
import SidebarContent from "./SidebarContent";
import { closeMobileSidebar } from "@/features/ui/redux/uiSlice";

import {
  selectSidebarCollapsed,
  selectMobileSidebarOpen,
} from "@/features/ui/redux/uiSelectors";

export default function Sidebar() {
  const dispatch = useDispatch();

  const collapsed = useSelector(selectSidebarCollapsed);
  const mobileOpen = useSelector(selectMobileSidebarOpen);

  return (
    <>
      {/* Desktop */}
      <aside
        className={`hidden border-r bg-background transition-all duration-300 lg:block ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <SidebarContent collapsed={collapsed} />
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => dispatch(closeMobileSidebar())}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r bg-background transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent
          collapsed={false}
          onItemClick={() => dispatch(closeMobileSidebar())}
        />
      </aside>
    </>
  );
}
