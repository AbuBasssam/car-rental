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
};
