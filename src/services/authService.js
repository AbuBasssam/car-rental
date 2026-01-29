import { AUTH_ENDPOINTS } from "../api/endpoints/endpoints";
import axiosInstance from "../api/axiosInstance";
import {
  handleApiError,
  saveUserInfo,
  clearSession,
  isRecoverableError,
  deleteCsrfToken,
} from "../utils/authUtils";

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

/**
 * Initialize CSRF Token
 * @returns {Promise<void>}
 */
export const initCsrfToken = async () => {
  try {
    await axiosInstance.get(AUTH_ENDPOINTS.CSRF_TOKEN);
  } catch (error) {
    console.error("Failed to initialize CSRF token:", error);
  }
};

/**
 * Sign In
 * Authenticates user with email and password
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} - API response data
 * @throws {Error} Custom authentication error
 */
export const signIn = (credentials) => {
  return axiosInstance
    .post(AUTH_ENDPOINTS.SIGN_IN, credentials)
    .then((response) => {
      if (response.data?.succeeded && response.data?.data) {
        return Promise.resolve(response.data.data)
          .then((userData) => {
            saveUserInfo(userData.fullName);
            deleteCsrfToken();

            return response.data;
          })
          .catch((updateError) => {
            // ✅ معالجة أخطاء التحديث فقط
            console.error("Error updating user session:", updateError);
            // حتى لو فشل التحديث، نرجع البيانات لأن API نجح
            return response.data;
          });
      }
      return response.data;
    })
    .catch((error) => {
      throw handleAuthError(error);
    });
};

/**
 * Refresh Token
 * Obtains a new access token using the refresh token
 * @returns {Promise<Object>} - API response data
 * @throws {Error} Custom authentication error
 */
export const refreshToken = async () => {
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.REFRESH_TOKEN);
    return response.data;
  } catch (error) {
    clearSession();
    throw handleAuthError(error);
  }
};

/**
 * Log Out
 * Ends the current user session and clears local data
 * @returns {Promise<Object>} - API response data
 * @throws {Error} Custom authentication error
 */
export const logOut = async () => {
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
    clearSession();
    deleteCsrfToken();
    return response.data;
  } catch (error) {
    clearSession();
    throw handleAuthError(error);
  }
};

// ============================================
// 🔧 ERROR HANDLING
// ============================================

/**
 * Handle authentication API errors
 * Enhanced with Response<T> structure support
 * @param {Error} error - Axios error object
 * @returns {Error} Custom error with enhanced details
 */
function handleAuthError(error) {
  const message = handleApiError(error);

  const customError = new Error(message);

  if (error.response) {
    const { status, data } = error.response;
    customError.status = status;
    customError.data = data;
    customError.succeeded = data?.succeeded || false;
    customError.errors = data?.errors || [];
    customError.recoverable = isRecoverableError(error);
  }

  return customError;
}
