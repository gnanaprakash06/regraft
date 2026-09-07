// src/hooks/queries/useDashboardQueries.ts
import { useQuery } from "@tanstack/react-query";
import { mockService } from "@/mocks/services";

export const dashboardKeys = {
    all: ["dashboard"] as const,
    stats: () => [...dashboardKeys.all, "stats"] as const,
    projects: () => [...dashboardKeys.all, "projects"] as const,
    activity: () => [...dashboardKeys.all, "activity"] as const,
    deliveries: () => [...dashboardKeys.all, "deliveries"] as const,
};

export function useDashboardStatsQuery() {
    return useQuery({
        queryKey: dashboardKeys.stats(),
        queryFn: () => mockService.fetchDashboardStats(),
    });
}

export function useProjectsQuery() {
    return useQuery({
        queryKey: dashboardKeys.projects(),
        queryFn: () => mockService.fetchProjects(),
    });
}

export function useRecentActivityQuery() {
    return useQuery({
        queryKey: dashboardKeys.activity(),
        queryFn: () => mockService.fetchRecentActivity(),
    });
}

export function useUpcomingDeliveriesQuery() {
    return useQuery({
        queryKey: dashboardKeys.deliveries(),
        queryFn: () => mockService.fetchUpcomingDeliveries(),
    });
}
