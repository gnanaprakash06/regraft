// src/components/AppSidebar.tsx
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
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

const AppSidebar = () => {
    const { logout } = useAuth();

    const handleLogout = useCallback(() => {
        logout();
    }, [logout]);

    return (
        <Sidebar className="border-r-0 text-white **:data-[slot=sidebar-inner]:bg-linear-to-b **:data-[slot=sidebar-inner]:from-[#1565C0] **:data-[slot=sidebar-inner]:to-[#0D47A1]">
            {/* Brand Header */}
            <SidebarHeader className="px-5 pt-8 pb-4">
                <div className="flex items-center">
                    <img
                        src="/logo/regraft-logo.png"
                        alt="ReGRAFT"
                        className="h-9 w-auto object-contain brightness-110 drop-shadow-sm"
                    />
                </div>
            </SidebarHeader>

            {/* Navigation */}
            <SidebarContent className="px-3 py-6">
                <SidebarGroup className="p-0">
                    <nav>
                        <SidebarMenu className="space-y-2">
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <NavLink
                                        to={item.url}
                                        end={item.url === "/"}
                                        className={({ isActive }) =>
                                            cn(
                                                "flex items-center gap-3.5 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200",
                                                isActive
                                                    ? "bg-white font-semibold text-[#1565C0] shadow-md shadow-black/5"
                                                    : "text-white/80 hover:bg-white/10 hover:text-white",
                                            )
                                        }
                                    >
                                        <item.icon className="size-5 shrink-0" />
                                        <span>{item.title}</span>
                                    </NavLink>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </nav>
                </SidebarGroup>
            </SidebarContent>

            {/* Logout Footer */}
            <SidebarFooter className="p-4 pt-2">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition-all hover:bg-white/10 hover:text-white"
                >
                    <LogOut className="size-4 shrink-0" />
                    <span>Logout</span>
                </button>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
