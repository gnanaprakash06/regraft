// src/hooks/queries/useNotificationsQueries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockService } from "@/mocks/services";

export const notificationKeys = {
    all: ["notifications"] as const,
    list: (filter?: "all" | "unread") => [...notificationKeys.all, "list", filter] as const,
};

export function useNotificationsQuery(filter?: "all" | "unread") {
    return useQuery({
        queryKey: notificationKeys.list(filter),
        queryFn: () => mockService.fetchNotifications(filter),
    });
}

export function useMarkNotificationReadMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => mockService.markNotificationRead(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: notificationKeys.all });
        },
    });
}

export function useMarkAllNotificationsReadMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => mockService.markAllNotificationsRead(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: notificationKeys.all });
        },
    });
}
