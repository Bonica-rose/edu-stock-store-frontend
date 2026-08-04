import { Link } from "react-router-dom";

import logo from "@/assets/logo/transparent.png";
import logoIcon from "@/assets/logo/logo-icon.png";

const Navbar = ({ onGetStarted }) => {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center">
          {/* Desktop */}
          <img
            src={logo}
            alt="Edu Stock & Store"
            className="hidden h-14 w-auto md:block"
          />

          {/* Mobile */}
          <img
            src={logoIcon}
            alt="Edu Stock & Store"
            className="h-12 w-auto md:hidden"
          />
        </Link>

        <nav className="hidden items-center gap-10 text-sm font-medium text-slate-700 md:flex">
          <a href="#about" className="transition hover:text-blue-900">
            About
          </a>

          <a href="#features" className="transition hover:text-blue-900">
            Features
          </a>

          <a href="#contact" className="transition hover:text-blue-900">
            Contact
          </a>
        </nav>

        <button
          onClick={onGetStarted}
          className="rounded-lg bg-blue-900 px-6 py-2.5 font-medium text-white transition hover:bg-blue-800"
        >
          Get Started
        </button>
      </div>
    </header>
  );
};

export default Navbar;
