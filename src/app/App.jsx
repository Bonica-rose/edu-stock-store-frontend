import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export default function App() {
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === "logout") {
        window.location.reload();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);
  
  return <RouterProvider router={router} />;
}
