/**
 * Backend API configuration.
 *
 * NOTE: Never store Gemini or cloud API keys in the mobile application.
 * All AI and external requests must go through the backend server.
 */

// Resolved default backend URL: prefers EXPO_PUBLIC_BACKEND_URL when defined (e.g. Render deployment),
// falling back to local host on port 8000 for local development and ADB reverse.
const rawEnvUrl = typeof process !== "undefined" && process.env ? process.env.EXPO_PUBLIC_BACKEND_URL : undefined;
const resolvedEnvUrl = rawEnvUrl ? rawEnvUrl.trim().replace(/\/+$/, "") : "";

export const DEFAULT_BACKEND_URL = resolvedEnvUrl.length > 0
  ? (resolvedEnvUrl.startsWith("http://") || resolvedEnvUrl.startsWith("https://")
      ? resolvedEnvUrl
      : `http://${resolvedEnvUrl}`)
  : "http://127.0.0.1:8000";

let currentBackendUrl = DEFAULT_BACKEND_URL;

export function getBackendBaseUrl(): string {
  return currentBackendUrl;
}

export function setBackendBaseUrl(newUrl: string): string {
  let cleaned = newUrl.trim();
  // Strip trailing slashes
  cleaned = cleaned.replace(/\/+$/, "");
  if (cleaned.length > 0) {
    if (!cleaned.startsWith("http://") && !cleaned.startsWith("https://")) {
      cleaned = `http://${cleaned}`;
    }
    currentBackendUrl = cleaned;
  }
  return currentBackendUrl;
}
