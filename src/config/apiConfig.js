import axios from "axios";
import { refreshToken, initCsrfToken } from "../services/authService";
import { getCsrfToken, clearSession } from "../utils/authUtils";
import { keys } from "../utils/constants";
import { getAppLanguage } from "../utils/helpers";
import { redirect } from "react-router-dom";
import { ROUTES } from "../routes/paths";

// ============================================
// 🌐 API CONFIGURATION
// ============================================
const isDevelopment = import.meta.env.MODE === "development";

// API Base URL

export const API_BASE_URL = isDevelopment
  ? "https://localhost:7137/api/v1"
  : "https://your-production-api.com/api/v1";

/**
 * Authentication API endpoints configuration
 * Defines all authentication-related API endpoints with base URL
 */
export const AUTH_ENDPOINTS = {
  // Authentication
  SIGN_IN: `${API_BASE_URL}/authentication/signin`,
  SIGN_UP: `${API_BASE_URL}/authentication/signup`,
  LOGOUT_OUT: `${API_BASE_URL}/authentication/logout`,
  REFRESH_TOKEN: `${API_BASE_URL}/authentication/refresh`,

  // Password Management

  FORGOT_PASSWORD: `${API_BASE_URL}/authentication/password-reset`,
  VERIFY_PASSWORD: `${API_BASE_URL}/authentication/password-reset-verification`,
  RESET_PASSWORD: `${API_BASE_URL}/authentication/password-reset`,
  RESEND_PASSWORD_RESET: `${API_BASE_URL}/authentication/password-reset/resend`,

  // Email Verification

  VERIFY_EMAIL: `${API_BASE_URL}/authentication/email-confirmation`,
  RESEND_VERIFICATION: `${API_BASE_URL}/authentication/email-verification/resend`,

  // Security

  CSRF_TOKEN: `${API_BASE_URL}/authentication/csrf-token`,
};

/**
 * Default timeout for API requests in milliseconds
 * @constant {number}
 */
export const REQUEST_TIMEOUT = 30000;

/**
 * List of endpoints that require CSRF token protection
 * These endpoints perform state-changing operations that need CSRF validation
 * @constant {string[]}
 */
const CSRF_REQUIRED_ENDPOINTS = [
  AUTH_ENDPOINTS.SIGN_IN,
  AUTH_ENDPOINTS.SIGN_UP,
  AUTH_ENDPOINTS.VERIFY_EMAIL,
  AUTH_ENDPOINTS.RESEND_VERIFICATION,

  AUTH_ENDPOINTS.FORGOT_PASSWORD,
  AUTH_ENDPOINTS.VERIFY_PASSWORD,
  AUTH_ENDPOINTS.RESEND_PASSWORD_RESET,
];

/**
 * List of endpoints excluded from CSRF token requirement
 * These are typically read-only or token initialization endpoints
 * @constant {string[]}
 */
const CSRF_EXCLUDED_ENDPOINTS = [
  AUTH_ENDPOINTS.CSRF_TOKEN,
  AUTH_ENDPOINTS.REFRESH_TOKEN,
];

/**
 * Determines if a CSRF token is required for the given URL and method.
 *
 * @param {string} url - The endpoint URL to check.
 * @param {string} method - The HTTP method being used.
 * @returns {boolean} - Returns true if a CSRF token is required; otherwise false.
 */
export const requiresCsrfToken = (url, method) => {
  const isStateMutatingMethod = ["post", "put", "patch", "delete"].includes(
    method?.toLowerCase(),
  );

  if (!isStateMutatingMethod) {
    return false;
  }

  const isExcluded = CSRF_EXCLUDED_ENDPOINTS.some((endpoint) =>
    url?.includes(endpoint),
  );

  if (isExcluded) {
    return false;
  }

  // ✅ تحقق من القائمة المطلوبة
  const isRequired = CSRF_REQUIRED_ENDPOINTS.some((endpoint) =>
    url?.includes(endpoint),
  );

  return isRequired;
};

// ============================================
// 📡 CREATE AXIOS INSTANCE
// ============================================
const appLanguage = getAppLanguage();
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": { appLanguage },
    Accept: "application/json",
  },
});

// ============================================
// 🔧 REQUEST INTERCEPTOR
// ============================================

/**
 * Cached promise for CSRF token initialization
 * Prevents multiple simultaneous initialization requests
 * @type {Promise<void>|null}
 */
let csrfInitPromise = null;

/**
 * Ensures CSRF token is available before making protected requests
 * Prevents race conditions by caching the initialization promise
 * @returns {Promise<void>} Resolves when CSRF token is guaranteed to be available
 * @throws {Error} If CSRF token initialization fails
 */
const ensureCsrfToken = async () => {
  if (!csrfInitPromise) {
    csrfInitPromise = (async () => {
      try {
        const token = getCsrfToken();
        if (!token) {
          await initCsrfToken();
        }
      } catch (error) {
        csrfInitPromise = null;
        throw error;
      }
    })();
  }
  return csrfInitPromise;
};
axiosInstance.interceptors.request.use(
  async (config) => {
    // Add CSRF token to state-changing requests
    const needsCsrf = requiresCsrfToken(config.url, config.method);

    if (needsCsrf) {
      await ensureCsrfToken();
      const csrfToken = getCsrfToken();

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
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  },
);

// ============================================
// 🔧 RESPONSE INTERCEPTOR
// ============================================

axiosInstance.interceptors.response.use(
  (response) => {
    // Success response
    if (isDevelopment) {
      console.log(
        `${response.config.method?.toUpperCase()} ${response.config.url}`,
        {
          status: response.status,
          data: response.data,
        },
      );
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 🔍 Logging
    if (isDevelopment) {
      console.error(
        `${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}`,
        {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        },
      );
    }

    // ✅ Handle 401 Unauthorized - Auto Refresh Token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // try to refresh token
        await refreshToken();

        // retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token failed
        console.error("Token refresh failed:", refreshError);

        clearSession();

        redirect(ROUTES.LOGIN);

        return Promise.reject(refreshError);
      }
    }

    // ✅ Handle 403 Forbidden (CSRF)
    if (error.response?.status === 403) {
      console.error("CSRF validation failed or access forbidden");
    }

    // ✅ Handle Network Errors
    if (error.code === "ECONNABORTED") {
      error.message = "Request timeout. Please try again.";
    } else if (error.message === "Network Error") {
      error.message = "Network error. Please check your connection.";
    }

    return Promise.reject(error);
  },
);
export default axiosInstance;
export { refreshToken };
