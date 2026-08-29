import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import ErrorPage from "@/shared/pages/ErrorPage";
import NotFoundPage from "@/shared/pages/NotFoundPage";
import UnauthorizedPage from "@/shared/pages/UnauthorizedPage";

import PublicRoute from "@/routes/PublicRoute";
import ProtectedRoute from "@/routes/ProtectedRoute";
import ForcePasswordChangeRoute from "@/routes/ForcePasswordChangeRoute";

import LandingPage from "@/features/landing/pages/LandingPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import SetupPage from "@/features/setup/pages/SetupPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";

import ProfilePage from "@/features/profile/pages/ProfilePage";
import ChangePasswordPage from "@/features/profile/pages/ChangePasswordPage";

import { dashboardRoutes } from "@/routes/modules/dashboard.routes";
import { userRoutes } from "@/routes/modules/user.routes";
import { branchRoutes } from "@/routes/modules/branch.routes";
import { categoryRoutes } from "@/routes/modules/category.routes";
import { vendorRoutes } from "@/routes/modules/vendor.routes";
import { purchaseRoutes } from "@/routes/modules/purchase.routes";
import { inventoryRoutes } from "@/routes/modules/inventory.routes";
import { stockMovementRoutes } from "@/routes/modules/stockMovement.routes";
import { assetRoutes } from "@/routes/modules/asset.routes";
import { maintenanceRoutes } from "@/routes/modules/maintenance.routes";
import { activityRoutes } from "@/routes/modules/activity.routes";
import { reportRoutes } from "@/routes/modules/report.routes";
import { settingsRoutes } from "@/routes/modules/settings.routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />, // Runtime errors
    children: [
      { index: true, element: <LandingPage /> },

      {
        element: <PublicRoute />,
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "setup", element: <SetupPage /> },
          { path: "forgot-password", element: <ForgotPasswordPage /> },
          { path: "reset-password", element: <ResetPasswordPage /> },
        ],
      },

      {
        path: "edu",
        element: <ProtectedRoute />,
        children: [
          {
            element: <ForcePasswordChangeRoute />,
            children: [
              {
                element: <DashboardLayout />,
                children: [
                  { path: "unauthorized", element: <UnauthorizedPage /> },
                  { path: "profile", element: <ProfilePage /> },
                  { path: "change-password", element: <ChangePasswordPage /> },

                  ...dashboardRoutes,
                  ...userRoutes,
                  ...branchRoutes,
                  ...categoryRoutes,
                  ...vendorRoutes,
                  ...purchaseRoutes,
                  ...inventoryRoutes,
                  ...stockMovementRoutes,
                  ...assetRoutes,
                  ...maintenanceRoutes,
                  ...activityRoutes,
                  ...reportRoutes,
                  ...settingsRoutes,

                ],
              },
            ],
          },
        ],
      },
      // Keep this LAST
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
