// src/layouts/RootLayout.tsx
// Wraps AuthProvider around all routes (needs to be inside RouterProvider for useNavigate)

import { AuthProvider } from "@/context/AuthProvider";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
};

export default RootLayout;
