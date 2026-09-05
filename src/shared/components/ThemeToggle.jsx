import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { setTheme } from "@/features/ui/redux/uiSlice";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  const toggleTheme = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-yellow-500/10"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-yellow-500" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-500" />
      )}
    </button>
  );
}
