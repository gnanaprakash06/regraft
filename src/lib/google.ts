// src/lib/google.ts
// Ported from devotional_frontend-main/src/lib/google.ts

/**
 * Opens a Google OAuth popup and resolves with the access_token.
 * Requires the Google Identity Services script to be loaded in index.html.
 */
export function getGoogleAccessToken(): Promise<string> {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const google = (window as any).google;

        if (!google || !import.meta.env.VITE_GOOGLE_CLIENT_ID) {
            reject(
                new Error("Google Identity Services not loaded or VITE_GOOGLE_CLIENT_ID missing"),
            );
            return;
        }

        const client = google.accounts.oauth2.initTokenClient({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            scope: "openid email profile",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            callback: (resp: any) => {
                if (resp && resp.access_token) resolve(resp.access_token);
                else reject(new Error("No access_token from Google"));
            },
        });

        client.requestAccessToken();
    });
}
