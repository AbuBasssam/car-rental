import { keys } from "../utils/constants";
import { errorsKeys } from "./localeKeys";
import { authEventType } from "../utils/constants";

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
export const getCsrfTokenCookie = () => getCookie(keys.kCsrfToken);

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
    dispatchAuthEvent(authEventType.login, userName);
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
 *
 * @param {Error} error - Axios error object
 * @returns {string} User-friendly error message/ error Translation key
 *
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

    // Priority 3: HTTP status-based messages (i18n)
    const statusMessageKeys = {
      400: errorsKeys.badRequest,
      401: errorsKeys.unauthorized,
      403: errorsKeys.forbidden,
      404: errorsKeys.notFound,
      409: errorsKeys.conflict,
      422:
        data && typeof data === "object"
          ? errorsKeys.validationFailedWithData
          : errorsKeys.validationFailed,
      429: errorsKeys.tooManyRequests,
      500: errorsKeys.serverError,
      502: errorsKeys.badGateway,
      503: errorsKeys.serviceUnavailable,
      504: errorsKeys.gatewayTimeout,
    };

    const messageKey = statusMessageKeys[status];

    if (messageKey) {
      return messageKey;
    }

    // For 4xx client errors
    if (status >= 400 && status < 500) {
      if (status === 429) {
        return errorsKeys.too_many_requests;
      }

      if (status === 422) {
        return errorsKeys.validation_failed;
      }

      return errorsKeys.clientError;
    }

    // For 5xx server errors
    if (status >= 500) {
      return errorsKeys.serverErrorGeneral;
    }

    return errorsKeys.unexpectedError;
  } else if (error.request) {
    // Network or CORS errors
    if (error.message && error.message.includes("Network Error")) {
      return errorsKeys.networkError;
    }

    if (error.message && error.message.includes("timeout")) {
      return errorsKeys.timeoutError;
    }

    if (error.message && error.message.includes("CORS")) {
      return errorsKeys.corsError;
    }

    return errorsKeys.connectionError;
  } else {
    // Configuration or code errors
    if (error.message && error.message.includes("canceled")) {
      return errorsKeys.requestCancelled;
    }

    return error.message || errorsKeys.unexpectedError;
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
  dispatchAuthEvent(authEventType.logout);
};

/**
 * Check if session is valid
 * Note: Actual validation happens on backend via cookies
 */
export const hasActiveSession = () => {
  return isAuthenticated();
};
const dispatchAuthEvent = (type, user = null) => {
  const event = new CustomEvent("authChange", {
    detail: { type, user },
  });
  window.dispatchEvent(event);
};
const VERIFICATION_EMAIL_TTL = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Save verification email after successful signup
 */
export const saveVerificationEmail = (email) => {
  if (!email) return;

  const payload = {
    email,
    createdAt: Date.now(),
  };

  localStorage.setItem(keys.kVerificationEmail, JSON.stringify(payload));
};

/**
 * Remove verification email after successful verification
 */
export const clearVerificationEmail = () => {
  localStorage.removeItem(keys.kVerificationEmail);
};

/**
 * Get valid verification email if exists and not expired
 */
export const getValidVerificationEmail = () => {
  const raw = localStorage.getItem(keys.kVerificationEmail);
  if (!raw) return null;

  try {
    const { email, createdAt } = JSON.parse(raw);

    if (!email || !createdAt) {
      clearVerificationEmail();
      return null;
    }

    const isExpired = Date.now() - createdAt > VERIFICATION_EMAIL_TTL;

    if (isExpired) {
      clearVerificationEmail();
      return null;
    }

    return email;
  } catch {
    clearVerificationEmail();
    return null;
  }
};
