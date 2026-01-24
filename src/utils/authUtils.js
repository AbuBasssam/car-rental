import { ROUTES } from "../routes/paths";

/**
 * Auth Utilities
 * Provides helper functions for authentication management
 */

// ============================================
// 🍪 COOKIE HELPERS
// ============================================

/**
 * Get CSRF token from cookie
 * @returns {string|null} - CSRF token value
 */
export const getCsrfToken = () => {
  const name = "XSRF-TOKEN";
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return null;
};
/**
 * Check if cookie exists
 * @param {string} cookieName
 * @returns {boolean}
 */
export const hasCookie = (cookieName) => {
  return document.cookie
    .split(";")
    .some((cookie) => cookie.trim().startsWith(`${cookieName}=`));
};

// ============================================
// AUTH STATE CHECKS
// ============================================

/**
 * Check if user is authenticated
 * (Based on localStorage userName only - tokens are in httpOnly cookies)
 */
export const isAuthenticated = () => {
  const userName = localStorage.getItem("userName");
  return !!userName;
};

/**
 * Get user display info
 */
export const getUserInfo = () => {
  const userName = localStorage.getItem("userName");
  return userName ? { fullName: userName } : null;
};

/**
 * Save user display info
 */
export const saveUserInfo = (fullName) => {
  if (fullName) {
    localStorage.setItem("userName", fullName);
  }
};

/**
 * Clear user info
 */
export const clearUserInfo = () => {
  localStorage.removeItem("userName");
};

// ============================================
// 🔧 ERROR HANDLING
// ============================================

/**
 * Handle API errors
 */
export const handleApiError = (error) => {
  if (error.response) {
    const { status } = error.response;

    const messages = {
      400: "Invalid request",
      401: "Unauthorized - Please login again",
      403: "Access forbidden",
      404: "Resource not found",
      422: "Validation error",
      429: "Too many requests",
      500: "Server error",
      503: "Service unavailable",
    };

    return messages[status] || "An error occurred";
  } else if (error.request) {
    return "Network error. Please check your connection.";
  } else {
    return error.message || "An unexpected error occurred.";
  }
};

// ============================================
// 🎯 SESSION HELPERS
// ============================================

/**
 * Clear session data
 */
export const clearSession = () => {
  clearUserInfo();
  // Cookies will be cleared by backend
};

/**
 * Check if session is valid
 * Note: Actual validation happens on backend via cookies
 */
export const hasActiveSession = () => {
  return isAuthenticated();
};
