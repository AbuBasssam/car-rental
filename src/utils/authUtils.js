import { keys } from "../utils/constants";

/**
 * Auth Utilities
 * Provides helper functions for authentication management
 */

// ============================================
// 🍪 COOKIE HELPERS
// ============================================

/**
 * Get CSRF token from cookie
 * @returns {string|null} - CSRF token value otherwise null
 */
export const getCsrfToken = () => getCookie(keys.kCsrfToken);

/**
 * Delete a CsrfToken cookie by setting its expiration date to a past date.
 */
export const deleteCsrfToken = () => deleteCookie(keys.kCsrfToken);

/**
 * Check if cookie exists
 * @param {string} cookieName
 * @returns {boolean}
 */
const hasCookie = (cookieName) => {
  return document.cookie
    .split(";")
    .some((cookie) => cookie.trim().startsWith(`${cookieName}=`));
};

/**
 * Get a cookie with the specified name.
 *
 * @param {String} cookieName The name of the cookie to get
 * @returns {string|null} - Cookie value if found; otherwise null.
 */
const getCookie = (cookieName) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${cookieName}=`);
  if (parts.length === 2) {
    const cookie = parts.pop().split(";").shift();
    return cookie;
  }
  return null;
};

/**
 * Delete a cookie with the specified name by setting its expiration date to a past date.
 *
 * @param {String} cookieName The name of the cookie to delete
 */
const deleteCookie = (cookieName) => {
  const isExists = hasCookie(cookieName);
  if (!isExists) {
    return;
  }
  // Set the cookie with the same name and an expiration date in the past
  document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
};
// ============================================
// AUTH STATE CHECKS
// ============================================

/**
 * Check if user is authenticated
 *
 */
export const isAuthenticated = () => {
  const userName = localStorage.getItem(keys.kUsereName);
  return !!userName;
};

/**
 * Get user display info
 *
 * @returns {string|null} UserName value if found otherwise null.
 */
export const getUserInfo = () => {
  const userName = localStorage.getItem(keys.kUsereName);
  return userName ? { fullName: userName } : null;
};

/**
 * Save user display info
 * @param {String} userName The UserName value
 */
export const saveUserInfo = (userName) => {
  if (userName) {
    localStorage.setItem(keys.kUsereName, userName);
  }
};

/**
 * Clear user info
 *
 */

// ============================================
// 🔧 ERROR HANDLING
// ============================================

/**
 * Handle API errors with enhanced Response<T> structure support
 * Provides user-friendly error messages based on HTTP status and response structure
 * @param {Error} error - Axios error object
 * @returns {string} User-friendly error message
 */
export const handleApiError = (error) => {
  // Handle axios error structure
  if (error.response) {
    const { status, data } = error.response;

    // Check if response follows Response<T> structure
    if (data && typeof data === "object") {
      // Priority 1: Use Response<T> message if available and meaningful
      if (data.succeeded === false && data.message && data.message.trim()) {
        return data.message;
      }

      // Priority 2: Use Response<T> errors array if available
      if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
        const filteredErrors = data.errors.filter((err) => err && err.trim());
        if (filteredErrors.length > 0) {
          if (filteredErrors.length === 1) {
            return filteredErrors[0];
          }
          // Join first 3 errors for readability
          return `${filteredErrors.slice(0, 3).join(", ")}${filteredErrors.length > 3 ? "..." : ""}`;
        }
      }
    }

    // Priority 4: HTTP status-based messages
    const statusMessages = {
      400: "Invalid request. Please check your input.",
      401: "Your session has expired. Please log in again.",
      403: "You don't have permission to access this resource.",
      404: "The requested resource was not found.",
      409: "A conflict occurred. Please try again.",
      422: {
        default: "Validation failed.",
        withData:
          data && typeof data === "object"
            ? "Please correct the errors and try again."
            : "Validation failed.",
      },
      429: "Too many requests. Please wait a moment before trying again.",
      500: "Server error. Our team has been notified.",
      502: "Bad gateway. Please try again later.",
      503: "Service temporarily unavailable. Maintenance in progress.",
      504: "Gateway timeout. Please try again.",
    };

    const messageConfig = statusMessages[status];

    if (messageConfig) {
      if (typeof messageConfig === "object" && messageConfig.withData) {
        return messageConfig.withData;
      }
      return typeof messageConfig === "string"
        ? messageConfig
        : "An error occurred.";
    }

    // For 4xx client errors
    if (status >= 400 && status < 500) {
      return "Your request couldn't be processed. Please try again.";
    }

    // For 5xx server errors
    if (status >= 500) {
      return "Server error. Please try again later.";
    }

    return "An unexpected error occurred.";
  } else if (error.request) {
    // Network or CORS errors
    if (error.message && error.message.includes("Network Error")) {
      return "Unable to connect to the server. Please check your internet connection.";
    }

    if (error.message && error.message.includes("timeout")) {
      return "Request timed out. Please check your connection and try again.";
    }

    if (error.message && error.message.includes("CORS")) {
      return "Cross-origin request blocked. Please contact support.";
    }

    return "Network error. Please check your connection and try again.";
  } else {
    // Configuration or code errors
    if (error.message && error.message.includes("canceled")) {
      return "Request was cancelled.";
    }

    return error.message || "An unexpected error occurred. Please try again.";
  }
};

/**
 * Extract full error details for debugging/logging
 * @param {Error} error - Axios error object
 * @returns {Object} Detailed error information
 */
export const getErrorDetails = (error) => {
  const details = {
    timestamp: new Date().toISOString(),
    message: error.message,
    stack: error.stack,
  };

  if (error.response) {
    details.response = {
      status: error.response.status,
      statusText: error.response.statusText,
      headers: error.response.headers,
      data: error.response.data,
    };
  }

  if (error.config) {
    details.request = {
      url: error.config.url,
      method: error.config.method,
      baseURL: error.config.baseURL,
      timeout: error.config.timeout,
    };
  }

  return details;
};

/**
 * Check if error is recoverable (user can retry)
 * @param {Error} error - Error object
 * @returns {boolean} True if error is recoverable
 */
export const isRecoverableError = (error) => {
  if (!error.response) {
    // Network errors are usually recoverable
    return true;
  }

  const { status } = error.response;

  // Recoverable status codes
  const recoverableStatuses = [
    408, // Timeout
    429, // Too Many Requests
    502, // Bad Gateway
    503, // Service Unavailable
    504, // Gateway Timeout
  ];

  // 4xx errors except 401, 403, 404 are usually client errors
  // that might be recoverable with user action
  if (status >= 400 && status < 500 && ![401, 403, 404].includes(status)) {
    return true;
  }

  return recoverableStatuses.includes(status);
};

// ============================================
// 🎯 SESSION HELPERS
// ============================================

/**
 * Clear session data
 */
export const clearSession = () => {
  localStorage.removeItem(keys.kUsereName);
};

/**
 * Check if session is valid
 * Note: Actual validation happens on backend via cookies
 */
export const hasActiveSession = () => {
  return isAuthenticated();
};
