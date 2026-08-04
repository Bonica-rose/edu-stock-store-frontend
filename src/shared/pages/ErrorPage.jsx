import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    let title = "Something went wrong";
    let message = "An unexpected error occurred.";

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            title = "404 - Page Not Found";
            message = "The page you're looking for doesn't exist.";
        } else {
            title = `${error.status} Error`;
            message = error.statusText;
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            <h1 className="text-4xl font-bold">{title}</h1>

            <p className="text-muted-foreground">{message}</p>

            <Link
                to="/"
                className="rounded bg-primary px-4 py-2 text-primary-foreground"
            >
                Go Home
            </Link>
        </div>
    );
}
