import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import ErrorPage from "@/shared/pages/ErrorPage";
import NotFoundPage from "@/shared/pages/NotFoundPage";
import UnauthorizedPage from "@/shared/pages/UnauthorizedPage";

import PublicRoute from "@/routes/PublicRoute";
import ProtectedRoute from "@/routes/ProtectedRoute";
import ForcePasswordChangeRoute from "@/routes/ForcePasswordChangeRoute";

import LoginPage from "@/features/auth/pages/LoginPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";

import DashboardPage from "@/features/dashboard/pages/DashboardPage";

import LandingPage from "@/features/landing/pages/LandingPage";

import ProfilePage from "@/features/profile/pages/ProfilePage";
import ChangePasswordPage from "@/features/profile/pages/ChangePasswordPage";
import SettingsPage from "@/features/settings/pages/SettingsPage";
import SetupPage from "@/features/setup/pages/SetupPage";
import UsersPage from "@/features/user/pages/UsersPage";
import CreateUserPage from "@/features/user/pages/CreateUserPage";
import EditUserPage from "@/features/user/pages/EditUserPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />, // Runtime 500 errors
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
                  { path: "dashboard", element: <DashboardPage /> },
                  { path: "profile", element: <ProfilePage /> },
                  { path: "settings", element: <SettingsPage /> },
                  { path: "change-password", element: <ChangePasswordPage /> },
                  { path: "users", element: <UsersPage /> },
                  { path: "users/new", element: <CreateUserPage /> },
                  { path: "users/:id/edit", element: <EditUserPage /> },
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
