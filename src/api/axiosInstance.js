import axios from "axios";
import { getAppLanguage } from "../utils/helpers";
import { requiresCsrfToken } from "../api/endpoints/endpoints";
import { getCsrfToken } from "../api/endpoints/auth";
import { getCsrfTokenCookie } from "../utils/authUtils";
import { keys } from "../utils/constants";

// ============================================
// 🌐 API CONFIGURATION
// ============================================
const isDevelopment = import.meta.env.MODE === "development";

/**
 * API Base URL from environment variables
 * Make sure to set VITE_API_BASE_URL in your .env file
 */
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://localhost:7137/api/v1";
const REQUEST_TIMEOUT = import.meta.env.REQUEST_TIMEOUT;

const appLanguage = getAppLanguage();

// ============================================
// 📡 CREATE AXIOS INSTANCE
// ============================================

/**
 * Axios instance configured for authentication
 *
 * CRITICAL SETTINGS:
 * - withCredentials: true -> Automatically sends httpOnly cookies with every request
 * - baseURL: All requests will be prefixed with this URL
 * - headers: Default headers for all requests
 */
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  withCredentials: true, // ⚠️ CRITICAL: This enables httpOnly cookie handling
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": { appLanguage },
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Check if CSRF token is required for this request
    const needsCsrf = requiresCsrfToken(config.url, config.method);

    // Use promise chaining for CSRF token handling
    return (
      needsCsrf
        ? getCsrfToken() // Get CSRF token if needed
        : Promise.resolve()
    ) // Skip if not needed
      .then(() => {
        // Add CSRF token to headers if available
        if (needsCsrf) {
          const csrfToken = getCsrfTokenCookie();
          if (csrfToken) {
            config.headers[keys.kCsrfToken] = csrfToken;
          }
        }

        // Logging request details in development mode
        if (isDevelopment) {
          console.log(`➡️ ${config.method?.toUpperCase()} ${config.url}`, {
            headers: config.headers,
            data: config.data,
          });
        }

        return config;
      })
      .catch((error) => {
        console.error("❌ CSRF Token Error:", error);
        return Promise.reject(error);
      });
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  },
);

// ============================================
// 📤 EXPORTS
// ============================================

export default axiosInstance;
export { API_BASE_URL };
