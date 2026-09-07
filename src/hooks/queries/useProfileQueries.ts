// src/hooks/queries/useProfileQueries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockService } from "@/mocks/services";
import type { DoctorProfile, NotificationPreference } from "@/types";

export const profileKeys = {
    all: ["profile"] as const,
    details: () => [...profileKeys.all, "details"] as const,
    preferences: () => [...profileKeys.all, "preferences"] as const,
};

export function useDoctorProfileQuery() {
    return useQuery({
        queryKey: profileKeys.details(),
        queryFn: () => mockService.fetchDoctorProfile(),
    });
}

export function useNotificationPreferencesQuery() {
    return useQuery({
        queryKey: profileKeys.preferences(),
        queryFn: () => mockService.fetchNotificationPreferences(),
    });
}

export function useUpdateDoctorProfileMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (profile: Partial<DoctorProfile>) => mockService.updateDoctorProfile(profile),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: profileKeys.details() });
        },
    });
}

export function useUpdatePreferencesMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (preferences: NotificationPreference[]) =>
            mockService.updateNotificationPreferences(preferences),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: profileKeys.preferences() });
        },
    });
}
