// src/routes/index.tsx
// Ported from devotional_frontend-main/src/routes/index.tsx
// Adapted for ReGRAFT's route structure

import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import RootLayout from "@/layouts/RootLayout";
import Dashboard from "@/pages/Dashboard";
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

            // ── Protected routes (dashboard) ──
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/",
                        element: <AppLayout />,
                        children: [
                            {
                                element: <Dashboard />,
                                index: true,
                            },
                            {
                                path: "dashboard",
                                element: <Navigate to="/" replace />,
                            },
                            // TODO: Add more protected routes as pages are built
                            // {
                            //   path: "patients",
                            //   element: <Patients />,
                            // },
                            // {
                            //   path: "implants",
                            //   element: <Implants />,
                            // },
                            // {
                            //   path: "settings",
                            //   element: <Settings />,
                            // },
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
