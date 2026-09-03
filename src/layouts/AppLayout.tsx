// src/layouts/AppLayout.tsx
// Authenticated dashboard shell with sidebar + header + content outlet

import AppSidebar from "@/components/AppSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="h-screen overflow-hidden">
                <header className="flex shrink-0 items-center gap-2 border-b px-4 py-2">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <span className="text-sm font-medium text-slate-600">ReGRAFT</span>
                </header>
                <main className="min-h-0 flex-1 overflow-auto p-4">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default AppLayout;
