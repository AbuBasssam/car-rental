// ============================================
// 🌐 API ENDPOINTS CONSTANTS
// ============================================

/**
 * API Base URL from environment variables
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Authentication API endpoints configuration
 * Defines all authentication-related API endpoints with base URL
 */
export const AUTH_ENDPOINTS = {
  // Authentication
  SIGN_IN: `${API_BASE_URL}/authentication/signin`,
  SIGN_UP: `${API_BASE_URL}/authentication/signup`,
  LOGOUT: `${API_BASE_URL}/authentication/logout`,
  REFRESH_TOKEN: `${API_BASE_URL}/authentication/refresh`,

  // Password Management
  FORGOT_PASSWORD: `${API_BASE_URL}/authentication/password-reset`, // POST - Request code
  VERIFY_PASSWORD: `${API_BASE_URL}/authentication/password-reset-verification`,
  RESET_PASSWORD: `${API_BASE_URL}/authentication/password-reset`, // PUT - Reset with code
  RESEND_PASSWORD_RESET: `${API_BASE_URL}/authentication/password-reset/resend`,

  // Email Verification
  VERIFY_EMAIL: `${API_BASE_URL}/authentication/email-confirmation`,
  RESEND_VERIFICATION: `${API_BASE_URL}/authentication/email-verification/resend`,

  // Security
  CSRF_TOKEN: `${API_BASE_URL}/authentication/csrf-token`,
  VERIFY: `${API_BASE_URL}/authentication/token/validation`,
};

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

  const isRequired = CSRF_REQUIRED_ENDPOINTS.some((endpoint) =>
    url?.includes(endpoint),
  );

  return isRequired;
};
