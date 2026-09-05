import { Link } from "react-router-dom";
import logoPic from "@/assets/images/logo-pic.png";

import ThemeToggle from "@/shared/components/ThemeToggle";

const Navbar = ({ onGetStarted }) => {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur dark:bg-gray-950 dark:text-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center">
          {/* Desktop */}
          <div className="hidden items-center gap-1 md:flex">
            <img
              src={logoPic}
              alt="Edu Stock & Store"
              className="h-10 w-auto object-contain dark:brightness-125"
            />

            <div className="leading-tight">
              <h1 className="text-lg font-bold">
                <span className="text-blue-900">Edu</span>{" "}
                <span className="text-blue-800">Stock</span>
                <span className="text-slate-700 dark:text-slate-500">&</span>
                <span className="text-green-700">Store</span>
              </h1>

              <p className="text-[10px] text-muted-foreground">
                Manage Smarter. Store Better.
              </p>
            </div>
          </div>

          {/* Mobile */}
          <img
            src={logoPic}
            alt="Edu Stock & Store"
            className="h-12 w-auto md:hidden dark:brightness-125"
          />
        </Link>

        <nav className="hidden items-center gap-10 text-sm font-medium text-slate-700 dark:text-slate-300 md:flex">
          <a
            href="#about"
            className="transition hover:text-blue-900 dark:hover:text-blue-400"
          >
            About
          </a>

          <a
            href="#features"
            className="transition hover:text-blue-900 dark:hover:text-blue-400"
          >
            Features
          </a>

          <a
            href="#contact"
            className="transition hover:text-blue-900 dark:hover:text-blue-400"
          >
            Contact
          </a>
        </nav>

        {/* Theme + Get Started */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            onClick={onGetStarted}
            className="rounded-lg bg-blue-900 px-6 py-2.5 font-medium text-white transition hover:bg-blue-800"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
