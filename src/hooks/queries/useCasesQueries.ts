// src/hooks/queries/useCasesQueries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockService } from "@/mocks/services";
import type { SubmitCasePayload } from "@/types";
import { dashboardKeys } from "./useDashboardQueries";

export const casesKeys = {
    all: ["cases"] as const,
    list: (filter?: string, search?: string) =>
        [...casesKeys.all, "list", { filter, search }] as const,
};

export function useCasesQuery(filter?: string, search?: string) {
    return useQuery({
        queryKey: casesKeys.list(filter, search),
        queryFn: () => mockService.fetchCases(filter, search),
    });
}

export function useSubmitCaseMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: SubmitCasePayload) => mockService.submitCase(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: casesKeys.all });
            queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
        },
    });
}
