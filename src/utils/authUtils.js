import { keys } from "../utils/constants";
import { errorsKeys } from "./localeKeys";

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
// 🔧 ERROR HANDLING
// ============================================

/**
 * Handle API errors with unified ApiResponse<T> structure support
 * @param {Error} error - Axios error object
 * @returns {string} Error message or translation key
 */
export const handleApiError = (error) => {
  const normalized = normalizeError(error);
  return normalized.message;
};

/**
 * Normalize any error into a consistent structure
 * @param {Error} error - Any error object
 * @returns {Object} Normalized error structure
 */
export const normalizeError = (error) => {
  if (error.response) {
    return handleServerError(error.response);
  }

  if (error.request) {
    return handleNetworkError(error);
  }

  return handleClientError(error);
};

const handleServerError = (response) => {
  const { status, data } = response;

  if (data && typeof data === "object") {
    if (data.succeeded === false) {
      return {
        isMessageKey: data.message ? false : true,
        message: data.message || getDefaultMessageKeyForStatus(status),
        errors: data.errors || [],
        validationErrors: data.validationErrors || {},
        isRecoverable: isRecoverableStatus(status),
      };
    }
  }

  return {
    message: getDefaultMessageKeyForStatus(status),
    isRecoverable: isRecoverableStatus(status),
  };
};

const getDefaultMessageKeyForStatus = (status) => {
  const statusMessageKeys = {
    400: errorsKeys.badRequest,
    401: errorsKeys.unauthorized,
    403: errorsKeys.forbidden,
    404: errorsKeys.notFound,
    409: errorsKeys.conflict,
    422: errorsKeys.validationFailed,
    429: errorsKeys.tooManyRequests,
    500: errorsKeys.serverError,
    502: errorsKeys.badGateway,
    503: errorsKeys.serviceUnavailable,
    504: errorsKeys.gatewayTimeout,
  };

  if (statusMessageKeys[status]) {
    return statusMessageKeys[status];
  }

  if (status >= 400 && status < 500) {
    return errorsKeys.clientError;
  }

  if (status >= 500) {
    return errorsKeys.serverErrorGeneral;
  }

  return errorsKeys.unexpectedError;
};

const handleNetworkError = (error) => {
  if (error.message?.includes("Network Error")) {
    return {
      isMessageKey: true,
      message: errorsKeys.networkError,
      isRecoverable: true,
    };
  }

  if (error.message?.includes("timeout")) {
    return {
      isMessageKey: true,
      message: errorsKeys.timeoutError,
      isRecoverable: true,
    };
  }

  if (error.message?.includes("CORS")) {
    return {
      isMessageKey: true,

      message: errorsKeys.corsError,
      isRecoverable: false,
    };
  }

  return {
    message: errorsKeys.connectionError,
    isRecoverable: true,
  };
};

const handleClientError = (error) => {
  if (error.message?.includes("canceled")) {
    return {
      isMessageKey: true,

      message: errorsKeys.requestCancelled,
      isRecoverable: true,
    };
  }

  return {
    message: error.message || errorsKeys.unexpectedError,
    isRecoverable: false,
  };
};
/**
 * Check if error is recoverable (user can retry)
 * @param {Number} status - Error status code
 * @returns {boolean} True if error is recoverable
 */
const isRecoverableStatus = (status) => {
  const recoverableStatuses = [408, 429, 502, 503, 504];

  if (status >= 400 && status < 500 && ![401, 403, 404].includes(status)) {
    return true;
  }

  return recoverableStatuses.includes(status);
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
      data: error.response.data,
    };
  }

  if (error.config) {
    details.request = {
      url: error.config.url,
      method: error.config.method,
      baseURL: error.config.baseURL,
    };
  }

  return details;
};

/**
 * Extract validation errors from normalized error
 * @param {Error} error - Error object
 * @returns {Object|null} Field validation errors
 */
export const extractValidationErrors = (error) => {
  const normalized = normalizeError(error);
  return normalized.validationErrors || null;
};

/**
 * Check if error contains validation errors
 * @param {Error} error - Error object
 * @returns {boolean} True if validation errors exist
 */
export const hasValidationErrors = (error) => {
  const normalized = normalizeError(error);
  return !!(
    normalized.validationErrors &&
    Object.keys(normalized.validationErrors).length > 0
  );
};

/**
 * Get all error messages as an array
 * @param {Error} error - Error object
 * @returns {string[]} Array of error messages
 */
export const getAllErrorMessages = (error) => {
  const normalized = normalizeError(error);
  const messages = [];

  if (normalized.message) {
    messages.push(normalized.message);
  }

  if (normalized.errors && normalized.errors.length > 0) {
    messages.push(
      ...normalized.errors.filter((e) => e && e !== normalized.message),
    );
  }

  return messages;
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
