// src/static/menuConfig.ts

import { LayoutDashboard, Users, Box, Settings } from "lucide-react";

const menuItems = [
    {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Patients",
        url: "/patients",
        icon: Users,
    },
    {
        title: "Implants",
        url: "/implants",
        icon: Box,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
];

export default menuItems;
