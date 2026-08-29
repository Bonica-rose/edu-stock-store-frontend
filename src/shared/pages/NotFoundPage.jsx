import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

export default function NotFoundPage() {
    const { isAuthenticated } = useSelector((state) => state.auth);

    const destination = isAuthenticated ? "/edu/dashboard" : "/login";

    const buttonText = isAuthenticated
        ? "Back to Dashboard"
        : "Go to Login";

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <h1 className="text-8xl font-bold text-primary">404</h1>

            <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>

            <p className="mt-2 max-w-md text-muted-foreground">
            The page you are looking for doesn't exist or has been moved.
            </p>

            <Button className="mt-6">
                <Link to={destination}>{buttonText}</Link>
            </Button>
        </div>
    );
}
