// src/routes/index.tsx
// Authenticated and public routes for ReGRAFT
/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import RootLayout from "@/layouts/RootLayout";
import ProtectedRoute from "./ProtectedRoutes";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy-loaded route chunks
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const MyCases = lazy(() => import("@/pages/MyCases"));
const UploadCase = lazy(() => import("@/pages/UploadCase"));
const Notifications = lazy(() => import("@/pages/Notifications"));
const AccountSettings = lazy(() => import("@/pages/AccountSettings"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const SignInPage = lazy(() =>
    import("@/components/sign-in").then((m) => ({ default: m.SignInPage })),
);

const PageFallback = () => (
    <div className="space-y-4 p-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full rounded-2xl" />
    </div>
);

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: "login",
                        element: (
                            <Suspense fallback={<PageFallback />}>
                                <SignInPage />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/",
                        element: <AppLayout />,
                        children: [
                            {
                                index: true,
                                element: (
                                    <Suspense fallback={<PageFallback />}>
                                        <Dashboard />
                                    </Suspense>
                                ),
                            },
                            { path: "dashboard", element: <Navigate to="/" replace /> },
                            {
                                path: "cases",
                                element: (
                                    <Suspense fallback={<PageFallback />}>
                                        <MyCases />
                                    </Suspense>
                                ),
                            },
                            {
                                path: "upload",
                                element: (
                                    <Suspense fallback={<PageFallback />}>
                                        <UploadCase />
                                    </Suspense>
                                ),
                            },
                            {
                                path: "notifications",
                                element: (
                                    <Suspense fallback={<PageFallback />}>
                                        <Notifications />
                                    </Suspense>
                                ),
                            },
                            {
                                path: "settings",
                                element: (
                                    <Suspense fallback={<PageFallback />}>
                                        <AccountSettings />
                                    </Suspense>
                                ),
                            },
                        ],
                    },
                ],
            },
            {
                path: "*",
                element: (
                    <Suspense fallback={<PageFallback />}>
                        <NotFound />
                    </Suspense>
                ),
            },
        ],
    },
]);

export default router;
