// src/layouts/AppLayout.tsx
// Authenticated dashboard shell with sidebar + header + content outlet

import AppSidebar from "@/components/AppSidebar";
import AppHeader from "@/components/app-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="h-screen overflow-hidden bg-[#F8FAFC]">
                <AppHeader />
                <main className="min-h-0 flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default AppLayout;
