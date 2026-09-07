// src/routes/index.tsx
// Authenticated and public routes for ReGRAFT

import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import RootLayout from "@/layouts/RootLayout";
import Dashboard from "@/pages/Dashboard";
import MyCases from "@/pages/MyCases";
import UploadCase from "@/pages/UploadCase";
import Notifications from "@/pages/Notifications";
import AccountSettings from "@/pages/AccountSettings";
import NotFound from "@/pages/NotFound";
import { SignInPage } from "@/components/sign-in";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";

export const router = createBrowserRouter([
    {
        // RootLayout wraps AuthProvider (needs to be inside RouterProvider for useNavigate)
        element: <RootLayout />,
        children: [
            // ── Public routes (auth pages) ──
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: "login",
                        element: <SignInPage />,
                    },
                ],
            },

            // ── Protected routes (dashboard & core features) ──
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/",
                        element: <AppLayout />,
                        children: [
                            {
                                index: true,
                                element: <Dashboard />,
                            },
                            {
                                path: "dashboard",
                                element: <Navigate to="/" replace />,
                            },
                            {
                                path: "cases",
                                element: <MyCases />,
                            },
                            {
                                path: "upload",
                                element: <UploadCase />,
                            },
                            {
                                path: "notifications",
                                element: <Notifications />,
                            },
                            {
                                path: "settings",
                                element: <AccountSettings />,
                            },
                        ],
                    },
                ],
            },

            // ── Catch-all ──
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

export default router;
