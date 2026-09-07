// src/pages/Notifications.tsx
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    useNotificationsQuery,
    useMarkNotificationReadMutation,
    useMarkAllNotificationsReadMutation,
} from "@/hooks/queries";
import { toast } from "sonner";

export default function Notifications() {
    const [tab, setTab] = useState<"all" | "unread">("all");

    const { data: notifications, isLoading } = useNotificationsQuery(tab);
    const { mutate: markAsRead } = useMarkNotificationReadMutation();
    const { mutate: markAllAsRead, isPending: isMarkingAll } =
        useMarkAllNotificationsReadMutation();

    const unreadCount = notifications?.filter((n) => !n.isRead).length ?? 0;

    const handleMarkAll = () => {
        markAllAsRead(undefined, {
            onSuccess: () => {
                toast.success("All notifications marked as read");
            },
        });
    };

    const handleNotificationClick = (id: string, isRead: boolean) => {
        if (!isRead) {
            markAsRead(id);
        }
    };

    const todayList = notifications?.filter((n) => n.group === "Today") ?? [];
    const earlierList = notifications?.filter((n) => n.group === "Earlier This Week") ?? [];

    const getAvatarBg = (color: "green" | "blue" | "amber") => {
        switch (color) {
            case "green":
                return "bg-emerald-200/90";
            case "blue":
                return "bg-blue-200/90";
            case "amber":
                return "bg-amber-200/90";
            default:
                return "bg-slate-200";
        }
    };

    return (
        <div className="space-y-6 p-8">
            {/* Top Bar: Filter Tabs & Mark All As Read */}
            <div className="flex items-center justify-between">
                <Tabs value={tab} onValueChange={(v) => setTab(v as "all" | "unread")}>
                    <TabsList className="h-10 gap-2 bg-transparent p-0">
                        <TabsTrigger
                            value="all"
                            className="h-10 rounded-full px-5 text-xs font-semibold data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=inactive]:bg-slate-100 data-[state=inactive]:text-slate-600"
                        >
                            All Notification
                        </TabsTrigger>
                        <TabsTrigger
                            value="unread"
                            className="h-10 rounded-full px-5 text-xs font-semibold data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=inactive]:bg-slate-100 data-[state=inactive]:text-slate-600"
                        >
                            Unread ({unreadCount})
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                <Button
                    variant="outline"
                    onClick={handleMarkAll}
                    disabled={isMarkingAll || unreadCount === 0}
                    className="h-10 rounded-xl border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50"
                >
                    Mark all as read
                </Button>
            </div>

            {/* Content List */}
            {isLoading ? (
                <div className="space-y-4">
                    <Skeleton className="h-5 w-24" />
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-20 w-full rounded-2xl" />
                    ))}
                </div>
            ) : notifications && notifications.length > 0 ? (
                <div className="space-y-8">
                    {/* Today Section */}
                    {todayList.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold text-slate-500">Today</h3>
                            <div className="space-y-3">
                                {todayList.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() =>
                                            handleNotificationClick(item.id, item.isRead)
                                        }
                                        className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-100/60 bg-[#F1F5F9]/80 p-4 transition-all hover:bg-[#E2E8F0]/80"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`size-12 shrink-0 rounded-xl ${getAvatarBg(
                                                    item.avatarColor,
                                                )}`}
                                            />
                                            <div>
                                                <p className="text-sm text-slate-800">
                                                    <span className="font-bold text-slate-900">
                                                        {item.title}
                                                    </span>{" "}
                                                    {item.message}
                                                </p>
                                                <p className="mt-0.5 text-xs text-slate-400">
                                                    {item.timestamp}
                                                </p>
                                            </div>
                                        </div>

                                        {!item.isRead && (
                                            <div className="mr-2 size-2.5 shrink-0 rounded-full bg-blue-600 shadow-xs shadow-blue-500/50" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Earlier This Week Section */}
                    {earlierList.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="text-xs font-bold text-slate-500">Earlier This Week</h3>
                            <div className="space-y-3">
                                {earlierList.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() =>
                                            handleNotificationClick(item.id, item.isRead)
                                        }
                                        className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-100/60 bg-[#F1F5F9]/80 p-4 transition-all hover:bg-[#E2E8F0]/80"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`size-12 shrink-0 rounded-xl ${getAvatarBg(
                                                    item.avatarColor,
                                                )}`}
                                            />
                                            <div>
                                                <p className="text-sm text-slate-800">
                                                    <span className="font-bold text-slate-900">
                                                        {item.title}
                                                    </span>{" "}
                                                    {item.message}
                                                </p>
                                                <p className="mt-0.5 text-xs text-slate-400">
                                                    {item.timestamp}
                                                </p>
                                            </div>
                                        </div>

                                        {!item.isRead && (
                                            <div className="mr-2 size-2.5 shrink-0 rounded-full bg-blue-600 shadow-xs shadow-blue-500/50" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center text-slate-400">
                    No notifications to display.
                </div>
            )}
        </div>
    );
}
