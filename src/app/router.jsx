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

import BranchListPage from "@/features/branch/pages/BranchListPage";
import CreateBranchPage from "@/features/branch/pages/CreateBranchPage";
import EditBranchPage from "@/features/branch/pages/EditBranchPage";
import ViewBranchPage from "@/features/branch/pages/ViewBranchPage";

import CategoryListPage from "@/features/category/pages/CategoryListPage";
import CreateCategoryPage from "@/features/category/pages/CreateCategoryPage";
import EditCategoryPage from "@/features/category/pages/EditCategoryPage";

import VendorListPage from "@/features/vendor/pages/VendorListPage";
import CreateVendorPage from "@/features/vendor/pages/CreateVendorPage";
import EditVendorPage from "@/features/vendor/pages/EditVendorPage";
import ViewVendorPage from "@/features/vendor/pages/ViewVendorPage";

import PurchaseListPage from "@/features/purchase/pages/PurchaseListPage";
import CreatePurchasePage from "@/features/purchase/pages/CreatePurchasePage";
import ViewPurchasePage from "@/features/purchase/pages/ViewPurchasePage";

import InventoryListPage from "@/features/inventory/pages/InventoryListPage";
import CreateInventoryPage from "@/features/inventory/pages/CreateInventoryPage";
import EditInventoryPage from "@/features/inventory/pages/EditInventoryPage";
import ViewInventoryPage from "@/features/inventory/pages/ViewInventoryPage";

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

                  { path: "branches", element: <BranchListPage /> },
                  { path: "branches/new", element: <CreateBranchPage /> },
                  { path: "branches/:id/edit", element: <EditBranchPage /> },
                  { path: "branches/:id", element: <ViewBranchPage /> },

                  { path: "categories", element: <CategoryListPage /> },
                  { path: "categories/new", element: <CreateCategoryPage /> },
                  {
                    path: "categories/:id/edit",
                    element: <EditCategoryPage />,
                  },

                  { path: "vendors", element: <VendorListPage /> },
                  { path: "vendors/new", element: <CreateVendorPage /> },
                  { path: "vendors/:id/edit", element: <EditVendorPage /> },
                  { path: "vendors/:id", element: <ViewVendorPage /> },

                  { path: "purchases", element: <PurchaseListPage />, },
                  { path: "purchases/new", element: <CreatePurchasePage />, },
                  { path: "purchases/:id", element: <ViewPurchasePage />, },

                  { path: "inventory", element: <InventoryListPage /> },
                  { path: "inventory/new", element: <CreateInventoryPage /> },
                  { path: "inventory/:id/edit", element: <EditInventoryPage /> },
                  { path: "inventory/:id", element: <ViewInventoryPage /> },
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
