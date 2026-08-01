import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
    const location = useLocation();

    const pathnames = location.pathname.split("/").filter(Boolean);

    return (
        <nav className="mb-6 flex items-center text-sm">
            <Link to="/edu/dashboard" className="hover:text-primary">
                Dashboard
            </Link>

            {pathnames.slice(1).map((segment, index) => {
                const url = "/" + pathnames.slice(0, index + 2).join("/");

                const isLast = index === pathnames.slice(1).length - 1;

                const label = segment
                .replace(/-/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase());

                return (
                    <div key={url} className="flex items-center">
                        <ChevronRight className="mx-2 h-4 w-4" />

                        {isLast ? (
                        <span className="font-medium">{label}</span>
                        ) : (
                        <Link to={url} className="hover:text-primary">
                            {label}
                        </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
