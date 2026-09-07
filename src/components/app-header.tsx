// src/components/app-header.tsx
import { Link, useLocation } from "react-router-dom";
import { Settings, Bell } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNotificationsQuery, useDoctorProfileQuery } from "@/hooks/queries";

interface AppHeaderProps {
    title?: string;
    subtitle?: string;
}

const ROUTE_HEADINGS: Record<string, { title: string; subtitle: string }> = {
    "/": {
        title: "",
        subtitle: "",
    },
    "/cases": {
        title: "My Case",
        subtitle: "Manage your cranial and maxillofacial implant cases",
    },
    "/upload": {
        title: "Upload Case",
        subtitle: "Submit CT/DICOM scans for 3D modeling and custom implant design",
    },
    "/notifications": {
        title: "Notifications",
        subtitle: "3 Unread Updates",
    },
    "/settings": {
        title: "Account Settings",
        subtitle: "Manage your profile & preferences",
    },
};

export function AppHeader({ title, subtitle }: AppHeaderProps) {
    const location = useLocation();
    const routeHeading = ROUTE_HEADINGS[location.pathname];
    const displayTitle = title ?? routeHeading?.title;
    const displaySubtitle = subtitle ?? routeHeading?.subtitle;

    const { data: notifications } = useNotificationsQuery();
    const { data: profile } = useDoctorProfileQuery();

    const unreadCount = notifications?.filter((n) => !n.isRead).length ?? 0;
    const initials = profile?.fullName
        ? profile.fullName
              .replace("Dr. ", "")
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()
        : "SR";

    return (
        <header className="sticky top-0 z-30 flex h-20 shrink-0 items-center justify-between border-b border-slate-100 bg-white/95 px-8 backdrop-blur-sm">
            {/* Left Title / Mobile Toggle */}
            <div className="flex items-center gap-4">
                <SidebarTrigger className="text-slate-600 md:hidden" />
                {displayTitle && (
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900">
                            {displayTitle}
                        </h1>
                        {displaySubtitle && (
                            <p className="text-xs text-slate-500">{displaySubtitle}</p>
                        )}
                    </div>
                )}
            </div>

            {/* Right Action Icons & Profile */}
            <div className="flex items-center gap-4">
                <Link
                    to="/settings"
                    aria-label="Settings"
                    className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-xs transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-blue-600"
                >
                    <Settings className="size-5" />
                </Link>

                <Link
                    to="/notifications"
                    aria-label="Notifications"
                    className="relative flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-xs transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-blue-600"
                >
                    <Bell className="size-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 size-2.5 rounded-full border-2 border-white bg-rose-500" />
                    )}
                </Link>

                <Link to="/settings" aria-label="Profile">
                    <Avatar className="size-10 border border-slate-200 shadow-xs transition-transform hover:scale-105">
                        <AvatarImage src={profile?.avatar} alt={profile?.fullName || "Doctor"} />
                        <AvatarFallback className="bg-slate-900 text-sm font-semibold text-white">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                </Link>
            </div>
        </header>
    );
}

export default AppHeader;
