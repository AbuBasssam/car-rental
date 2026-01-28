import axiosInstance from "../axiosInstance";
import { AUTH_ENDPOINTS } from "./endpoints";

// ============================================
// 🔐 AUTHENTICATION ENDPOINTS
// ============================================

/**
 * Register a new user
 * POST /authentication/signup
 *
 * @param {Object} data - User registration data
 * @param {string} data.firstName - User's First Name
 * @param {string} data.lastName - User's Last Name
 * @param {string} data.email - User's email
 * @param {string} data.password - User's password
 * @returns {Promise} API response
 */
export const registerUser = (data) => {
  return axiosInstance.post(AUTH_ENDPOINTS.SIGN_UP, data);
};

/**
 * Verify user account with verification code
 * POST /authentication/email-confirmation
 *
 * @param {Object} data - Verification data
 * @param {string} data.email - User's email
 * @param {string} data.code - Verification code
 * @returns {Promise} API response
 */
export const verifyAccount = (data) => {
  return axiosInstance.post(AUTH_ENDPOINTS.VERIFY_EMAIL, data);
};

/**
 * Resend verification code to user's email
 * POST /authentication/email-verification/resend
 *
 * @param {Object} data - Email data
 * @param {string} data.email - User's email
 * @returns {Promise} API response
 */
export const resendVerificationCode = (data) => {
  return axiosInstance.post(AUTH_ENDPOINTS.RESEND_VERIFICATION, data);
};

/**
 * Login user with credentials
 * POST /authentication/signin
 *
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User's email
 * @param {string} credentials.password - User's password
 * @returns {Promise} API response
 */
export const login = (credentials) => {
  return axiosInstance.post(AUTH_ENDPOINTS.SIGN_IN, credentials);
};

/**
 * Logout current user
 * POST /authentication/logout
 *
 * @returns {Promise} API response
 */
export const logout = () => {
  return axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
};

// ============================================
// 🔑 PASSWORD RESET ENDPOINTS
// ============================================

/**
 * Request password reset (sends code to email)
 * POST /authentication/password-reset
 *
 * @param {Object} data - Email data
 * @param {string} data.email - User's email
 * @returns {Promise} API response
 */
export const requestPasswordReset = (data) => {
  return axiosInstance.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, data);
};

/**
 * Verify password reset code
 * POST /authentication/password-reset-verification
 *
 * @param {Object} data - Verification data
 * @param {string} data.email - User's email
 * @param {string} data.code - Reset code
 * @returns {Promise} API response
 */
export const verifyPasswordResetCode = (data) => {
  return axiosInstance.post(AUTH_ENDPOINTS.VERIFY_PASSWORD, data);
};

/**
 * Reset password with code
 * PUT /authentication/password-reset
 * ⚠️ IMPORTANT: Uses PUT method, not POST
 *
 * @param {Object} data - Reset data
 * @param {string} data.email - User's email
 * @param {string} data.code - Reset code
 * @param {string} data.newPassword - New password
 * @returns {Promise} API response
 */
export const resetPassword = (data) => {
  return axiosInstance.put(AUTH_ENDPOINTS.RESET_PASSWORD, data);
};

/**
 * Resend password reset code
 * POST /authentication/password-reset/resend
 *
 * @param {Object} data - Email data
 * @param {string} data.email - User's email
 * @returns {Promise} API response
 */
export const resendPasswordResetCode = (data) => {
  return axiosInstance.post(AUTH_ENDPOINTS.RESEND_PASSWORD_RESET, data);
};

// ============================================
// 🔄 TOKEN MANAGEMENT (will be used in Phase 5)
// ============================================

/**
 * Refresh authentication token
 * POST /authentication/refresh
 *
 * @returns {Promise} API response
 */
export const refreshToken = () => {
  return axiosInstance.post(AUTH_ENDPOINTS.REFRESH_TOKEN);
};

/**
 * Get CSRF token
 * GET /authentication/csrf-token
 *
 * @returns {Promise} API response
 */
export const getCsrfToken = () => {
  return axiosInstance.get(AUTH_ENDPOINTS.CSRF_TOKEN);
};
