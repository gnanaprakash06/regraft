// src/lib/axiosInstance.ts
// Ported from devotional_frontend-main/src/lib/axiosInstance.ts

import { authService } from "@/services/auth.service";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Request interceptor: attach auth token if available
axiosInstance.interceptors.request.use(
    (config) => {
        const token = authService.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Response interceptor: handle 401/403 → trigger logout
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest) return Promise.reject(error);

        // 401 Unauthorized or 403 Forbidden → logout
        if (error.response?.status === 401 || error.response?.status === 403) {
            authService.triggerLogout();
            return Promise.reject(error);
        }

        // TODO: Add 403 token refresh flow when backend supports it
        // if (error.response?.status === 403 && !originalRequest._retry) {
        //   originalRequest._retry = true;
        //   try {
        //     const newAccessToken = await authService.refreshToken();
        //     if (originalRequest.headers) {
        //       originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        //     }
        //     return axiosInstance(originalRequest);
        //   } catch (refreshError) {
        //     authService.clear();
        //     window.location.href = "/login";
        //     return Promise.reject(refreshError);
        //   }
        // }

        return Promise.reject(error);
    },
);
