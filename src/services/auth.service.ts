// src/services/auth.service.ts
// Ported from devotional_frontend-main/src/services/auth.service.ts

import { axiosInstance } from "@/lib/axiosInstance";

export type LogoutHandler = () => void;

export type AuthUserType = {
    userId: string;
    email: string;
    name: string;
    role: string;
};

export type AuthResponse = {
    accessToken: string;
    user: AuthUserType;
};

class AuthService {
    private accessKey = "authToken";
    private refreshKey = "refreshToken";
    private logoutHandlers: LogoutHandler[] = [];

    // ─── Token Management ───────────────────────────────────────────

    getAccessToken(): string | null {
        return sessionStorage.getItem(this.accessKey);
    }

    setAccessToken(token: string) {
        sessionStorage.setItem(this.accessKey, token);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(this.refreshKey);
    }

    setRefreshToken(token: string) {
        localStorage.setItem(this.refreshKey, token);
    }

    clear() {
        sessionStorage.removeItem(this.accessKey);
        localStorage.removeItem(this.refreshKey);
    }

    // ─── Logout Pub/Sub ─────────────────────────────────────────────

    onLogout(handler: LogoutHandler) {
        this.logoutHandlers.push(handler);
        return () => {
            this.logoutHandlers = this.logoutHandlers.filter((h) => h !== handler);
        };
    }

    async triggerLogout() {
        try {
            // TODO: Replace with actual backend logout endpoint
            axiosInstance.post("/auth/logout").catch((error) => {
                console.error("Error during logout request:", error);
            });
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            this.clear();
            this.logoutHandlers.forEach((h) => h());
        }
    }

    // ─── Google Login ───────────────────────────────────────────────

    async loginWithGoogle(googleAccessToken: string): Promise<AuthResponse> {
        // TODO: Replace with actual backend endpoint
        // When the backend is ready, uncomment the block below and remove the mock.
        //
        // const { data } = await axiosInstance.post("/auth/google-login", {
        //   googleToken: googleAccessToken,
        // });
        // return data.data as AuthResponse;

        // ── Mock implementation (remove when backend is ready) ──
        console.log(
            "[AuthService] Mock Google login with token:",
            googleAccessToken.slice(0, 20) + "...",
        );
        await new Promise((resolve) => setTimeout(resolve, 500));

        const mockUser: AuthUserType = {
            userId: "mock-user-001",
            email: "admin@regraft.com",
            name: "ReGRAFT Admin",
            role: "admin",
        };

        const mockResponse: AuthResponse = {
            accessToken: `mock-access-token-${Date.now()}`,
            user: mockUser,
        };

        return mockResponse;
    }

    // ─── Email/Password Login ───────────────────────────────────────

    async loginWithCredentials(email: string, _password: string): Promise<AuthResponse> {
        // TODO: Replace with actual backend endpoint
        // const { data } = await axiosInstance.post("/auth/login", { email, password });
        // return data.data as AuthResponse;

        // ── Mock implementation (remove when backend is ready) ──
        console.log("[AuthService] Mock credentials login for:", email);
        await new Promise((resolve) => setTimeout(resolve, 500));

        const mockUser: AuthUserType = {
            userId: "mock-user-002",
            email: email,
            name: email.split("@")[0],
            role: "admin",
        };

        const mockResponse: AuthResponse = {
            accessToken: `mock-access-token-${Date.now()}`,
            user: mockUser,
        };

        return mockResponse;
    }

    // ─── Token Refresh ──────────────────────────────────────────────

    async refreshToken(): Promise<string> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        // TODO: Replace with actual backend refresh endpoint
        // const { data } = await axios.post(
        //   `${import.meta.env.VITE_API_URL}/auth/refresh`,
        //   { token: refreshToken }
        // );
        // if (!data?.accessToken) {
        //   this.triggerLogout();
        //   throw new Error("Invalid refresh response");
        // }
        // this.setAccessToken(data.accessToken);
        // return data.accessToken;

        throw new Error("Token refresh not implemented yet");
    }
}

export const authService = new AuthService();
