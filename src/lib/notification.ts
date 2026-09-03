// src/lib/notification.ts
// Ported from devotional_frontend-main/src/lib/notification.ts

import { toast } from "sonner";

export const notifySuccess = (msg: string, description?: string) =>
    toast.success(msg, { description });

export const notifyError = (msg: string, description?: string) => toast.error(msg, { description });

export const notifyWarning = (msg: string, description?: string) =>
    toast.warning(msg, { description });

export const notifyInfo = (msg: string, description?: string) => toast.info(msg, { description });

export const notifyLoading = (msg: string, description?: string) =>
    toast.loading(msg, { description });

export const notifyPromise = <T>(
    promise: Promise<T>,
    messages: {
        loading: string;
        success: string | ((data: T) => string);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: string | ((error: any) => string);
    },
) =>
    toast.promise(promise, {
        loading: messages.loading,
        success: messages.success,
        error: messages.error,
    });
