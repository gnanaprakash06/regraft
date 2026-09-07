// src/static/menuConfig.ts
import { LayoutDashboard, FolderKanban, UploadCloud, Bell, Settings } from "lucide-react";

export interface MenuItem {
    title: string;
    url: string;
    icon: typeof LayoutDashboard;
}

const menuItems: MenuItem[] = [
    {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "My Case",
        url: "/cases",
        icon: FolderKanban,
    },
    {
        title: "Upload Case",
        url: "/upload",
        icon: UploadCloud,
    },
    {
        title: "Notifications",
        url: "/notifications",
        icon: Bell,
    },
    {
        title: "Account Settings",
        url: "/settings",
        icon: Settings,
    },
];

export default menuItems;
