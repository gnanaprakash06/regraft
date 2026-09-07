// src/types/index.ts

export type CaseType = "Cranial" | "Orbital" | "Maxillofacial" | "TMJ";
export type CaseStatus = "In Progress" | "Pending Review" | "Completed";

export interface SurgicalCase {
    id: string;
    title: string;
    caseId: string;
    type: CaseType;
    patientName: string;
    patientId: string;
    status: CaseStatus;
    updatedAt: string;
    createdAt: string;
    progress: number;
    projectCode: string;
    thumbnail: string;
}

export interface DoctorProfile {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    designation: string;
    hospital: string;
    registrationId: string;
    referralCode: string;
    avatar?: string;
}

export interface DashboardStats {
    totalCases: number;
    activeCases: number;
    pendingReview: number;
    completedCases: number;
}

export interface NotificationItem {
    id: string;
    title: string;
    message: string;
    actor: string;
    timestamp: string;
    isRead: boolean;
    group: "Today" | "Earlier This Week";
    avatarColor: "green" | "blue" | "amber";
}

export interface RecentActivityItem {
    id: string;
    title: string;
    projectCode: string;
    status: string;
    timestamp: string;
}

export interface UpcomingDeliveryItem {
    id: string;
    projectCode: string;
    type: string;
    deliveryDate: string;
}

export interface NotificationPreference {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
}

export interface SubmitCasePayload {
    patientName: string;
    surgeonName: string;
    caseType: CaseType;
    implantMaterial: string;
    notes?: string;
    file?: File | null;
}
