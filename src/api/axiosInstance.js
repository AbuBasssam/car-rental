import axios from "axios";
import { getAppLanguage } from "../utils/helpers";
import { requiresCsrfToken } from "../api/endpoints/endpoints";
import { getCsrfToken } from "../api/endpoints/auth";
import { getCsrfTokenCookie } from "../utils/authUtils";
import { keys } from "../utils/constants";
import { triggerAuthUpdate } from "../context/AuthBridge";
import { refreshAccessToken } from "../api/RefreshTokenService";

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
const REQUEST_TIMEOUT = import.meta.env.VITE_REQUEST_TIMEOUT;

const appLanguage = getAppLanguage();

// ============================================
// 📡 CREATE AXIOS INSTANCE
// ============================================

/**
 * Axios instance configured for authentication
 *
 * CRITICAL SETTINGS:
 * - withCredentials: true → Automatically sends httpOnly cookies with every request
 * - baseURL: All requests will be prefixed with this URL
 * - headers: Default headers for all requests
 */
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  withCredentials: true, // ⚠️ CRITICAL: This enables httpOnly cookie handling
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": appLanguage,
    Accept: "application/json",
  },
});

// ============================================
// 📤 REQUEST INTERCEPTOR - CSRF TOKEN HANDLING
// ============================================

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
// 📥 RESPONSE INTERCEPTOR - ENHANCED VERSION
// ============================================

/**
 * Enhanced Response Interceptor
 *
 * Features:
 * ✅ Backend error code support (errorCode, isRecoverable)
 * ✅ Clean auth state updates via triggerAuthUpdate (from authBridge)
 * ✅ Smart refresh logic with mutex lock
 * ✅ No global window pollution
 * ✅ Fast Refresh compatible
 *
 * Strategy:
 * 1. Check if 401 error
 * 2. Extract errorCode and isRecoverable from response
 * 3. If isRecoverable = false → Immediate logout (no refresh attempt)
 * 4. If isRecoverable = true → Attempt token refresh
 * 5. On refresh success → Update context + Retry request
 * 6. On refresh failure → Logout
 *
 * Error Codes Handling:
 * - MissingToken → isRecoverable = false → No refresh
 * - InvalidToken → isRecoverable = false → No refresh
 * - TokenExpired → isRecoverable = true → Try refresh
 * - SessionExpired → isRecoverable = false → No refresh
 * - AccessDenied → isRecoverable = false → No refresh
 */

/**
 * Check if endpoint should be excluded from auto-refresh
 *
 * @param {string} url - Request URL
 * @param {string} method - HTTP method
 * @returns {boolean} True if should skip refresh
 */
const shouldSkipRefresh = (url, method) => {
  // Skip refresh token endpoint itself (prevent infinite loop)
  if (url?.includes("authentication/refresh")) {
    return true;
  }

  // Skip reset password endpoint (has different 401 behavior)
  // Only for PUT method (the actual password reset)
  if (
    url?.includes("authentication/password-reset") &&
    method?.toLowerCase() === "put"
  ) {
    return true;
  }

  return false;
};

/**
 * Terminate Session
 *
 * Handles session termination for non-recoverable errors.
 * Uses dynamic imports to break circular dependencies.
 *
 * @param {string} errorCode - Backend error code
 */
const terminateSession = async (errorCode) => {
  // Dynamic import to break circular dependency
  const { handleRefreshFailure } = await import("../api/RefreshTokenService");
  const { resetAuthCache } = await import("../loaders/Rootloader");

  handleRefreshFailure(
    () => resetAuthCache(),
    () => {
      window.location.href = "/";
    },
    errorCode !== "MissingToken",
  );
};

axiosInstance.interceptors.response.use(
  // ✅ Success Response - Pass through
  (response) => response,

  // ❌ Error Response - Handle 401 with isRecoverable
  async (error) => {
    const originalRequest = error.config;

    // ============================================
    // 🔍 STEP 1: Check basic conditions to skip
    // ============================================

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      shouldSkipRefresh(originalRequest.url, originalRequest.method)
    ) {
      if (isDevelopment && originalRequest._retry) {
        console.log("⏭️ Request already retried, rejecting");
      }
      return Promise.reject(error);
    }

    // ============================================
    // 🎯 STEP 2: Extract error info and check recoverability
    // ============================================

    const errorData = error.response?.data?.meta || {};
    const { errorCode, isRecoverable = false } = errorData;

    if (isDevelopment) {
      console.log(
        `🔍 401 handling: ${errorCode || "unknown"}, Recoverable: ${isRecoverable}`,
      );
    }

    // ============================================
    // 🚫 STEP 3: Handle non-recoverable errors
    // ============================================

    if (!isRecoverable) {
      if (isDevelopment) {
        console.log(
          `❌ Error is NOT recoverable (${errorCode}), terminating session`,
        );
      }

      await terminateSession(errorCode);
      return Promise.reject(error);
    }

    // ============================================
    // 🔄 STEP 4: Attempt token refresh (isRecoverable = true)
    // ============================================

    originalRequest._retry = true;

    try {
      // Get user email from cache for refresh
      const { getUserEmailForRefresh, updateAuthCache } =
        await import("../loaders/Rootloader");
      const userEmail = getUserEmailForRefresh();

      if (!userEmail) {
        if (isDevelopment) {
          console.error("❌ Cannot refresh: No cached email");
        }
        throw new Error("No cached email");
      }

      if (isDevelopment) {
        console.log(
          `🔄 Error is recoverable (${errorCode}), attempting refresh...`,
        );
      }

      // Perform refresh
      const userData = await refreshAccessToken(userEmail, axiosInstance);

      // Update cache and UI
      updateAuthCache({ user: userData, isAuthenticated: true });
      triggerAuthUpdate(userData, false);

      if (isDevelopment) {
        console.log("✅ Refresh successful, retrying original request");
      }

      // Retry original request
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // ============================================
      // 🚨 STEP 5: Refresh failed - terminate session
      // ============================================

      if (isDevelopment) {
        console.error("🚨 Critical: Refresh flow failed");
      }

      await terminateSession(errorCode);
      return Promise.reject(refreshError);
    }
  },
);

// ============================================
// 📤 EXPORTS
// ============================================

export default axiosInstance;
export { API_BASE_URL };
