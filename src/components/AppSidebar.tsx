// src/components/AppSidebar.tsx
// Ported from devotional_frontend-main/src/components/AppSidebar.tsx
// Restyled to match ReGRAFT's blue theme

import { useAuth } from "@/context/AuthProvider";
import { cn } from "@/lib/utils";
import menuItems from "@/static/menuConfig";
import { LogOut } from "lucide-react";
import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

const AppSidebar = () => {
    const { logout } = useAuth();

    const handleLogout = useCallback(() => {
        logout();
    }, [logout]);

    return (
        <Sidebar className="px-1">
            {/* Brand Header */}
            <SidebarHeader className="px-4 pt-4">
                <img
                    src="/logo/regraft-logo.png"
                    alt="ReGRAFT"
                    className="h-8 w-auto object-contain"
                />
            </SidebarHeader>

            {/* Navigation */}
            <SidebarContent className="my-6">
                <SidebarGroup>
                    <SidebarGroupLabel className="sr-only">Navigation Links</SidebarGroupLabel>
                    <nav>
                        <SidebarMenu className="space-y-1">
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <NavLink
                                        className={({ isActive }) =>
                                            cn(
                                                "mx-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-700",
                                                isActive && "bg-blue-50 text-blue-700",
                                            )
                                        }
                                        to={item.url}
                                        end={item.url === "/"}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.title}</span>
                                    </NavLink>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </nav>
                </SidebarGroup>
            </SidebarContent>

            {/* Logout Footer */}
            <SidebarFooter className="pb-4">
                <SidebarMenuButton
                    onClick={handleLogout}
                    className="w-full justify-start text-red-600 hover:text-red-700"
                >
                    <LogOut className="mr-3 h-4 w-4" />
                    Logout
                </SidebarMenuButton>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
