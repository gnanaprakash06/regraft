// src/mocks/services.ts
import type {
    SurgicalCase,
    DoctorProfile,
    DashboardStats,
    NotificationItem,
    RecentActivityItem,
    UpcomingDeliveryItem,
    NotificationPreference,
    SubmitCasePayload,
} from "@/types";
import {
    mockDashboardStats,
    mockDoctorProfile,
    mockProjects,
    mockCases,
    mockRecentActivity,
    mockUpcomingDeliveries,
    mockNotifications,
    mockNotificationPreferences,
} from "./data";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory state with localStorage fallback
const STORAGE_KEYS = {
    PROFILE: "regraft_profile",
    CASES: "regraft_cases",
    NOTIFICATIONS: "regraft_notifications",
    PREFERENCES: "regraft_preferences",
};

function getStored<T>(key: string, fallback: T): T {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch {
        return fallback;
    }
}

function setStored<T>(key: string, value: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // ignore
    }
}

let activeProfile = getStored<DoctorProfile>(STORAGE_KEYS.PROFILE, mockDoctorProfile);
let activeCases = getStored<SurgicalCase[]>(STORAGE_KEYS.CASES, mockCases);
let activeNotifications = getStored<NotificationItem[]>(
    STORAGE_KEYS.NOTIFICATIONS,
    mockNotifications,
);
let activePreferences = getStored<NotificationPreference[]>(
    STORAGE_KEYS.PREFERENCES,
    mockNotificationPreferences,
);

export const mockService = {
    async fetchDashboardStats(): Promise<DashboardStats> {
        await delay(300);
        const total = activeCases.length;
        const active = activeCases.filter((c) => c.status === "In Progress").length;
        const pending = activeCases.filter((c) => c.status === "Pending Review").length;
        const completed = activeCases.filter((c) => c.status === "Completed").length;
        return {
            totalCases: total || mockDashboardStats.totalCases,
            activeCases: active || mockDashboardStats.activeCases,
            pendingReview: pending || mockDashboardStats.pendingReview,
            completedCases: completed || mockDashboardStats.completedCases,
        };
    },

    async fetchProjects(): Promise<SurgicalCase[]> {
        await delay(350);
        return mockProjects;
    },

    async fetchRecentActivity(): Promise<RecentActivityItem[]> {
        await delay(300);
        return mockRecentActivity;
    },

    async fetchUpcomingDeliveries(): Promise<UpcomingDeliveryItem[]> {
        await delay(300);
        return mockUpcomingDeliveries;
    },

    async fetchCases(filter?: string, search?: string): Promise<SurgicalCase[]> {
        await delay(400);
        let list = [...activeCases];
        if (filter && filter !== "All" && filter !== "All 24") {
            const normalized = filter.toLowerCase().trim();
            list = list.filter((c) => c.status.toLowerCase().includes(normalized));
        }
        if (search && search.trim()) {
            const q = search.toLowerCase().trim();
            list = list.filter(
                (c) =>
                    c.title.toLowerCase().includes(q) ||
                    c.caseId.toLowerCase().includes(q) ||
                    c.patientName.toLowerCase().includes(q) ||
                    c.type.toLowerCase().includes(q),
            );
        }
        return list;
    },

    async fetchNotifications(filter?: "all" | "unread"): Promise<NotificationItem[]> {
        await delay(350);
        if (filter === "unread") {
            return activeNotifications.filter((n) => !n.isRead);
        }
        return activeNotifications;
    },

    async markNotificationRead(id: string): Promise<void> {
        await delay(200);
        activeNotifications = activeNotifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n,
        );
        setStored(STORAGE_KEYS.NOTIFICATIONS, activeNotifications);
    },

    async markAllNotificationsRead(): Promise<void> {
        await delay(250);
        activeNotifications = activeNotifications.map((n) => ({ ...n, isRead: true }));
        setStored(STORAGE_KEYS.NOTIFICATIONS, activeNotifications);
    },

    async fetchDoctorProfile(): Promise<DoctorProfile> {
        await delay(300);
        return activeProfile;
    },

    async updateDoctorProfile(profile: Partial<DoctorProfile>): Promise<DoctorProfile> {
        await delay(500);
        activeProfile = { ...activeProfile, ...profile };
        setStored(STORAGE_KEYS.PROFILE, activeProfile);
        return activeProfile;
    },

    async fetchNotificationPreferences(): Promise<NotificationPreference[]> {
        await delay(300);
        return activePreferences;
    },

    async updateNotificationPreferences(
        preferences: NotificationPreference[],
    ): Promise<NotificationPreference[]> {
        await delay(400);
        activePreferences = preferences;
        setStored(STORAGE_KEYS.PREFERENCES, activePreferences);
        return activePreferences;
    },

    async submitCase(payload: SubmitCasePayload): Promise<SurgicalCase> {
        await delay(600);
        const newCase: SurgicalCase = {
            id: `case-${Date.now()}`,
            title: `${payload.caseType} Reconstruction`,
            caseId: `Case PT-${Math.floor(1000 + Math.random() * 9000)}`,
            type: payload.caseType,
            patientName: payload.patientName || "PT-9024",
            patientId: "PT-9024",
            status: "In Progress",
            updatedAt: "Just now",
            createdAt: "Today",
            progress: 10,
            projectCode: `P${Math.floor(100000 + Math.random() * 900000)}`,
            thumbnail: "/images/step-1.png",
        };
        activeCases = [newCase, ...activeCases];
        setStored(STORAGE_KEYS.CASES, activeCases);
        return newCase;
    },
};
