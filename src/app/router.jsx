import { createBrowserRouter } from "react-router-dom";

const Placeholder = ({ title }) => <div className="p-6 text-xl">{title}</div>;

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Placeholder title="Landing Page" />,
    },
]);
