// src/context/AuthProvider.tsx
// Ported from devotional_frontend-main/src/context/AuthProvider.tsx

import { getGoogleAccessToken } from "@/lib/google";
import { notifyError, notifySuccess } from "@/lib/notification";
import { authService, type AuthUserType } from "@/services/auth.service";
import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextValue = {
    isAuthenticated: boolean;
    user: AuthUserType | null;
    isPending: boolean;
    login: (email: string, password: string) => Promise<void>;
    googleLogin: () => Promise<void>;
    logout: () => void;
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        () => !!authService.getAccessToken(),
    );
    const [user, setUser] = useState<AuthUserType | null>(null);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        // Register a logout handler so AuthService navigates via React Router
        const unsubscribe = authService.onLogout(() => {
            setIsAuthenticated(false);
            setUser(null);
            navigate("/login");
        });
        return unsubscribe;
    }, [navigate]);

    const value = useMemo(
        () => ({
            isAuthenticated,
            user,
            isPending,

            // Email/password login
            login: async (email: string, password: string) => {
                setIsPending(true);
                try {
                    const data = await authService.loginWithCredentials(email, password);
                    authService.setAccessToken(data.accessToken);
                    setUser(data.user);
                    setIsAuthenticated(true);
                    notifySuccess("Login successful!");
                    navigate("/");
                } catch (err: unknown) {
                    const message =
                        err instanceof Error ? err.message : "Login failed. Please try again.";
                    notifyError(message);
                    throw err;
                } finally {
                    setIsPending(false);
                }
            },

            // Google OAuth login
            googleLogin: async () => {
                setIsPending(true);
                try {
                    const googleToken = await getGoogleAccessToken();
                    const data = await authService.loginWithGoogle(googleToken);
                    authService.setAccessToken(data.accessToken);
                    setUser(data.user);
                    setIsAuthenticated(true);
                    notifySuccess("Login successful!");
                    navigate("/");
                } catch (err: unknown) {
                    const message = err instanceof Error ? err.message : "Google login failed.";
                    notifyError(message);
                    throw err;
                } finally {
                    setIsPending(false);
                }
            },

            // Logout
            logout: () => {
                authService.triggerLogout();
                setIsAuthenticated(false);
                setUser(null);
            },
        }),
        [isAuthenticated, user, isPending, navigate],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
