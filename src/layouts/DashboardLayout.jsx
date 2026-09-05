import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Breadcrumb from "./components/Breadcrumb";

export default function DashboardLayout() {
    return (
      <div className="flex min-h-screen dark:bg-gray-950 dark:text-white">
        <Sidebar />

        <div className="flex flex-1 flex-col">
          <Header />

          <main className="flex-1 p-6 bg-muted/80">
            <Breadcrumb />

            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    );
}
