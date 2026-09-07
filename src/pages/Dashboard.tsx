// src/pages/Dashboard.tsx
import { Link } from "react-router-dom";
import {
    Plus,
    Folder,
    Activity,
    Clock,
    CheckCircle2,
    RefreshCw,
    Calendar,
    FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    useDashboardStatsQuery,
    useProjectsQuery,
    useRecentActivityQuery,
    useUpcomingDeliveriesQuery,
    useDoctorProfileQuery,
} from "@/hooks/queries";

export default function Dashboard() {
    const { data: stats, isLoading: isStatsLoading } = useDashboardStatsQuery();
    const { data: projects, isLoading: isProjectsLoading } = useProjectsQuery();
    const { data: activity, isLoading: isActivityLoading } = useRecentActivityQuery();
    const { data: deliveries, isLoading: isDeliveriesLoading } = useUpcomingDeliveriesQuery();
    const { data: profile } = useDoctorProfileQuery();

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
        <div className="space-y-8 p-8">
            {/* Welcome Banner */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-5">
                    <Avatar className="size-18 border-2 border-slate-200 bg-slate-200 shadow-sm">
                        <AvatarImage src={profile?.avatar} alt={profile?.fullName || "Doctor"} />
                        <AvatarFallback className="bg-slate-300 text-xl font-bold text-slate-700">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Welcome back,{" "}
                            <span className="font-extrabold text-slate-900">
                                {profile?.fullName || "Dr. Santhoshkumar R"}
                            </span>
                        </h1>
                        <p className="text-sm text-slate-500">
                            Manage your cranial, maxillofacial and patient-specific implant projects
                            from a single dashboard.
                        </p>
                    </div>
                </div>

                <Button
                    asChild
                    className="h-12 rounded-xl bg-[#1565C0] px-6 text-sm font-semibold text-white shadow-md shadow-blue-900/10 transition-all hover:bg-[#0D47A1]"
                >
                    <Link to="/upload" className="flex items-center gap-2">
                        <Plus className="size-5" />
                        <span>New Project</span>
                    </Link>
                </Button>
            </div>

            {/* Metrics Bar / Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {/* Total Cases */}
                <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-xs">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Folder className="size-6" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-500">Total Cases</p>
                        {isStatsLoading ? (
                            <Skeleton className="my-1 h-7 w-12" />
                        ) : (
                            <p className="text-2xl font-bold text-slate-900">
                                {stats?.totalCases ?? 24}
                            </p>
                        )}
                        <p className="text-xs font-medium text-blue-600">All time projects</p>
                    </div>
                </div>

                {/* Active Cases */}
                <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-xs">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                        <Activity className="size-6" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-500">Active Cases</p>
                        {isStatsLoading ? (
                            <Skeleton className="my-1 h-7 w-12" />
                        ) : (
                            <p className="text-2xl font-bold text-slate-900">
                                {String(stats?.activeCases ?? 6).padStart(2, "0")}
                            </p>
                        )}
                        <p className="text-xs font-medium text-blue-600">In progress</p>
                    </div>
                </div>

                {/* Pending Review */}
                <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-xs">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                        <Clock className="size-6" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-500">Pending Review</p>
                        {isStatsLoading ? (
                            <Skeleton className="my-1 h-7 w-12" />
                        ) : (
                            <p className="text-2xl font-bold text-slate-900">
                                {String(stats?.pendingReview ?? 3).padStart(2, "0")}
                            </p>
                        )}
                        <p className="text-xs font-medium text-blue-600">Awaiting approval</p>
                    </div>
                </div>

                {/* Completed Cases */}
                <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-xs">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <CheckCircle2 className="size-6" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-500">Completed Cases</p>
                        {isStatsLoading ? (
                            <Skeleton className="my-1 h-7 w-12" />
                        ) : (
                            <p className="text-2xl font-bold text-slate-900">
                                {stats?.completedCases ?? 15}
                            </p>
                        )}
                        <p className="text-xs font-medium text-blue-600">successfully Completed</p>
                    </div>
                </div>
            </div>

            {/* Main Content: Projects Grid + Side Activity */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* My Projects Column (2 cols wide on desktop) */}
                <div className="space-y-4 lg:col-span-2">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">My Projects</h2>
                        <p className="text-xs text-slate-500">
                            An overview is all your scan projects
                        </p>
                    </div>

                    {isProjectsLoading ? (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="space-y-3 rounded-2xl border border-slate-100 bg-white p-4"
                                >
                                    <Skeleton className="h-36 w-full rounded-xl" />
                                    <Skeleton className="h-5 w-24" />
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                            {projects?.map((project) => (
                                <div
                                    key={project.id}
                                    className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xs transition-shadow hover:shadow-md"
                                >
                                    {/* Thumbnail container */}
                                    <div className="relative flex h-44 w-full items-center justify-center overflow-hidden bg-[#CBE4FE]/60 p-4">
                                        <img
                                            src={project.thumbnail}
                                            alt={project.title}
                                            className="h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
                                        />
                                        <Badge
                                            variant="completed"
                                            className="absolute top-3 right-3 text-[10px] font-semibold"
                                        >
                                            {project.status}
                                        </Badge>
                                    </div>

                                    {/* Card Details */}
                                    <div className="space-y-3 p-4">
                                        <div>
                                            <h3 className="text-base font-bold text-slate-900">
                                                {project.title}
                                            </h3>
                                            <p className="text-xs text-slate-500">
                                                Patient Name: {project.patientName}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                Project Code: {project.projectCode}
                                            </p>
                                        </div>

                                        {/* Updated and Created Dates */}
                                        <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-[11px]">
                                            <div className="flex items-center gap-1.5 text-emerald-600">
                                                <RefreshCw className="size-3 shrink-0" />
                                                <div>
                                                    <p className="font-semibold">Updated</p>
                                                    <p className="text-[10px] text-slate-400">
                                                        {project.updatedAt}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-blue-600">
                                                <Calendar className="size-3 shrink-0" />
                                                <div>
                                                    <p className="font-semibold">Created</p>
                                                    <p className="text-[10px] text-slate-400">
                                                        {project.createdAt}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="space-y-1 pt-1">
                                            <div className="flex justify-end">
                                                <span className="text-[10px] font-bold text-slate-500">
                                                    {project.progress}%
                                                </span>
                                            </div>
                                            <Progress value={project.progress} className="h-1.5" />
                                        </div>

                                        {/* Action CTA */}
                                        <Button
                                            asChild
                                            className="w-full rounded-xl bg-[#1565C0] py-2 text-xs font-semibold text-white hover:bg-[#0D47A1]"
                                        >
                                            <Link to="/cases">Go to Project</Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Recently Activity & Upcoming Deliveries */}
                <div className="space-y-6">
                    {/* Recently Activity */}
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs">
                        <h3 className="mb-4 text-base font-bold text-slate-900">
                            Recently Activity
                        </h3>
                        {isActivityLoading ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-12 w-full rounded-xl" />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {activity?.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between gap-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                                                <FileText className="size-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-slate-800">
                                                    {item.title}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="shrink-0 text-[11px] text-slate-400">
                                            {item.timestamp}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Upcoming Deliveries */}
                    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xs">
                        <h3 className="mb-4 text-base font-bold text-slate-900">
                            Upcoming Deliveries
                        </h3>
                        {isDeliveriesLoading ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-12 w-full rounded-xl" />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {deliveries?.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between gap-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 shrink-0 rounded-full bg-emerald-200" />
                                            <div>
                                                <p className="text-xs font-bold text-slate-800">
                                                    {item.projectCode}
                                                </p>
                                                <p className="text-[11px] text-slate-500">
                                                    {item.type}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="shrink-0 text-xs font-medium text-emerald-600">
                                            {item.deliveryDate}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
