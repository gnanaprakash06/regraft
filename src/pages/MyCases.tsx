// src/pages/MyCases.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useCasesQuery } from "@/hooks/queries";
import type { CaseStatus } from "@/types";

export default function MyCases() {
    const [filter, setFilter] = useState<string>("all");
    const [search, setSearch] = useState<string>("");

    const { data: cases, isLoading } = useCasesQuery(filter === "all" ? undefined : filter, search);

    const getStatusVariant = (status: CaseStatus) => {
        switch (status) {
            case "In Progress":
                return "inProgress";
            case "Pending Review":
                return "pendingReview";
            case "Completed":
                return "completed";
            default:
                return "default";
        }
    };

    return (
        <div className="space-y-6 p-8">
            {/* Search, Filter Tabs & Action Bar */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                    {/* Search Bar */}
                    <div className="relative w-full max-w-md">
                        <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search cases by patient or ID"
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white pr-4 pl-10 text-sm text-slate-800 placeholder-slate-400 shadow-2xs transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-hidden"
                        />
                    </div>

                    {/* Filter Tabs using Radix Tabs */}
                    <Tabs value={filter} onValueChange={setFilter} className="w-auto">
                        <TabsList className="h-11 gap-2 bg-transparent p-0">
                            <TabsTrigger
                                value="all"
                                className="h-10 rounded-full px-4 text-xs font-semibold data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=inactive]:bg-slate-100 data-[state=inactive]:text-slate-600"
                            >
                                All 24
                            </TabsTrigger>
                            <TabsTrigger
                                value="in progress"
                                className="h-10 rounded-full px-4 text-xs font-semibold data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=inactive]:bg-slate-100 data-[state=inactive]:text-slate-600"
                            >
                                Active 6
                            </TabsTrigger>
                            <TabsTrigger
                                value="pending review"
                                className="h-10 rounded-full px-4 text-xs font-semibold data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=inactive]:bg-slate-100 data-[state=inactive]:text-slate-600"
                            >
                                Pending 3
                            </TabsTrigger>
                            <TabsTrigger
                                value="completed"
                                className="h-10 rounded-full px-4 text-xs font-semibold data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=inactive]:bg-slate-100 data-[state=inactive]:text-slate-600"
                            >
                                Completed 15
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="h-11 gap-2 rounded-xl border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50"
                    >
                        <SlidersHorizontal className="size-4" />
                        <span>Filter</span>
                    </Button>

                    <Button
                        asChild
                        className="h-11 gap-2 rounded-xl bg-[#1565C0] px-5 text-xs font-semibold text-white shadow-md shadow-blue-900/10 hover:bg-[#0D47A1]"
                    >
                        <Link to="/upload">
                            <Plus className="size-4" />
                            <span>New File</span>
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Cases Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-slate-100 bg-white text-xs font-semibold text-slate-400">
                            <tr>
                                <th className="px-6 py-4">Case</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Patient Name</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Updated</th>
                                <th className="px-6 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                [1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Skeleton className="size-12 rounded-xl" />
                                                <div className="space-y-1">
                                                    <Skeleton className="h-4 w-36" />
                                                    <Skeleton className="h-3 w-20" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Skeleton className="h-4 w-16" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <Skeleton className="h-4 w-20" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <Skeleton className="h-6 w-24 rounded-full" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <Skeleton className="h-4 w-20" />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Skeleton className="ml-auto h-8 w-16 rounded-lg" />
                                        </td>
                                    </tr>
                                ))
                            ) : cases && cases.length > 0 ? (
                                cases.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="transition-colors hover:bg-slate-50/70"
                                    >
                                        {/* Case Info */}
                                        <td className="px-6 py-4.5">
                                            <div className="flex items-center gap-3.5">
                                                <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blue-50/60 p-1">
                                                    <img
                                                        src={item.thumbnail}
                                                        alt={item.title}
                                                        className="size-full object-contain"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-xs text-slate-400">
                                                        {item.caseId}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Type */}
                                        <td className="px-6 py-4.5 font-medium text-slate-600">
                                            {item.type}
                                        </td>

                                        {/* Patient Name */}
                                        <td className="px-6 py-4.5 font-medium text-slate-600">
                                            {item.patientName}
                                        </td>

                                        {/* Status Badge with Amber/Rose/Green mapping */}
                                        <td className="px-6 py-4.5">
                                            <Badge
                                                variant={getStatusVariant(item.status)}
                                                className="px-3.5 py-1 text-xs font-semibold"
                                            >
                                                {item.status}
                                            </Badge>
                                        </td>

                                        {/* Updated Date */}
                                        <td className="px-6 py-4.5 text-xs text-slate-500">
                                            {item.updatedAt}
                                        </td>

                                        {/* View Action */}
                                        <td className="px-6 py-4.5 text-right">
                                            <Button
                                                asChild
                                                className="h-8 rounded-lg bg-[#1565C0] px-5 text-xs font-semibold text-white hover:bg-[#0D47A1]"
                                            >
                                                <Link to={`/cases`}>View</Link>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-12 text-center text-slate-400"
                                    >
                                        No cases found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
