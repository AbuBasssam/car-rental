import { AUTH_ENDPOINTS } from "../config/apiConfig";
import axiosInstance from "../config/apiConfig";
import {
  handleApiError,
  saveUserInfo,
  clearUserInfo,
} from "../utils/authUtils";

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

/**
 * Initialize CSRF Token
 * Must be called when app loads to set CSRF cookie
 */
export const initCsrfToken = async (credentials) => {
  try {
    await axiosInstance.get(AUTH_ENDPOINTS.CSRF_TOKEN, credentials);
    console.log("CSRF token initialized");
  } catch (error) {
    console.error("Failed to initialize CSRF token:", error);
  }
};

/**
 * Sign In
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} - API response
 */
export const signIn = async (credentials) => {
  try {
    // ✅ Axios يضيف CSRF token تلقائياً من interceptor
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.SIGN_IN,
      credentials,
    );

    const { data } = response;

    // ✅ حفظ معلومات المستخدم للعرض فقط
    if (data.succeeded && data.data) {
      saveUserInfo(data.data.fullName);
    }

    return data;
  } catch (error) {
    throw handleAuthError(error);
  }
};
export const refreshToken = async () => {
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.REFRESH_TOKEN);
    return response.data;
  } catch (error) {
    clearUserInfo();
    throw handleAuthError(error);
  }
};
// ============================================
// 🔧 ERROR HANDLING
// ============================================

/**
 * Handle authentication errors
 */
function handleAuthError(error) {
  // Axios error structure
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;

    // Extract error message
    const message = data?.message || data?.title || handleApiError(error);

    // Create custom error
    const customError = new Error(message);
    customError.status = status;
    customError.data = data;

    return customError;
  } else if (error.request) {
    // Request made but no response
    const customError = new Error(
      "Network error. Please check your connection.",
    );
    customError.status = 0;
    return customError;
  } else {
    // Something else happened
    return error;
  }
}
