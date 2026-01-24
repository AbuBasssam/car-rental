import axios from "axios";
import { getCsrfToken } from "../utils/authUtils";
import { refreshToken } from "../services/authService";

// ============================================
// 🌐 API CONFIGURATION
// ============================================
const isDevelopment = import.meta.env.MODE === "development";

// API Base URL
export const API_BASE_URL = isDevelopment
  ? "https://localhost:7137/api/v1"
  : "https://your-production-api.com/api/v1";

// ============================================
// 📡 CREATE AXIOS INSTANCE
// ============================================

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  withCredentials: true, // Include cookies in requests
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "en",
    Accept: "application/json",
  },
});
// ============================================
// 🔧 REQUEST INTERCEPTOR
// ============================================

axiosInstance.interceptors.request.use(
  (config) => {
    // Add CSRF token to state-changing requests
    if (
      ["post", "put", "patch", "delete"].includes(config.method?.toLowerCase())
    ) {
      const csrfToken = getCsrfToken();

      if (csrfToken) {
        config.headers["X-XSRF-TOKEN"] = csrfToken;
      } else {
        console.warn("⚠️ CSRF token not found for", config.method, config.url);
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
    // ✅ Success response
    if (isDevelopment) {
      console.log(
        `✅ ${response.config.method?.toUpperCase()} ${response.config.url}`,
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

        // Clear user session
        localStorage.removeItem("userName");

        // redirect to login
        window.location.href = "/login";

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
// API Endpoints
export const AUTH_ENDPOINTS = {
  // Authentication
  SIGN_IN: `${API_BASE_URL}/authentication/signin`,
  SIGN_UP: `${API_BASE_URL}/authentication/signup`,
  LOGOUT_OUT: `${API_BASE_URL}/authentication/logout`,
  REFRESH_TOKEN: `${API_BASE_URL}/authentication/refresh`,

  FORGOT_PASSWORD: `${API_BASE_URL}/authentication/password-reset`,
  VERIFY_PASSWORD: `${API_BASE_URL}/authentication/password-reset-verification`,
  RESET_PASSWORD: `${API_BASE_URL}/authentication/password-reset`,
  RESEND_PASSWORD_RESET: `${API_BASE_URL}/authentication/password-reset/resend`,

  VERIFY_EMAIL: `${API_BASE_URL}/authentication/email-confirmation`,
  RESEND_VERIFICATION: `${API_BASE_URL}/authentication/email-verification/resend`,

  CSRF_TOKEN: `${API_BASE_URL}/authentication/csrf-token`,
};

// Request Configuration

export const REQUEST_TIMEOUT = 30000; // 30 seconds

/**
 * Create fetch with timeout
 */
export const fetchWithTimeout = (
  url,
  options = {},
  timeout = REQUEST_TIMEOUT,
) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), timeout),
    ),
  ]);
};
