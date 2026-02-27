// ============================================
// 🔄 REFRESH TOKEN SERVICE - ENHANCED VERSION
// ============================================

import { AUTH_ENDPOINTS } from "./endpoints/endpoints";
import { showErrorToast } from "../config/toastConfig";
import { errorsKeys } from "../utils/localeKeys";
import { triggerAuthUpdate } from "../context/AuthBridge";

/**
 * Enhanced Refresh Token Service
 *
 * Features:
 * ✅ Backend error code support (errorCode, isRecoverable)
 * ✅ Clean AuthContext updates via triggerAuthUpdate (from authBridge)
 * ✅ Mutex lock to prevent parallel refresh calls
 * ✅ Smart toast notifications
 * ✅ No global window pollution
 * ✅ Fast Refresh compatible
 *
 * Architecture:
 * - Only ONE refresh request at a time
 * - If refresh is in progress, subsequent calls wait for the result
 * - If refresh fails, all waiting calls receive the failure
 *
 * Centralized service for handling token refresh:
 * - Used by Axios Interceptor
 * - Single source of truth for refresh logic
 * - Clean communication with AuthContext via authBridge
 */

// ============================================
// 🔒 MUTEX LOCK STATE
// ============================================

/**
 * Mutex lock to prevent parallel refresh calls
 *
 * Problem: Multiple requests can fail simultaneously with 401
 * Solution: Only ONE refresh request is made, others wait
 *
 * Flow:
 * Request 1 fails → Starts refresh
 * Request 2 fails → Waits for Request 1's refresh
 * Request 3 fails → Waits for Request 1's refresh
 * Request 1 refresh completes → All requests retry with new token
 */
let isRefreshing = false;
let refreshPromise = null;

/**
 * Reset the refresh state
 *
 * Called after successful refresh or failure to allow
 * new refresh attempts in the future.
 */
const resetRefreshState = () => {
  isRefreshing = false;
  refreshPromise = null;
};

// ============================================
// 🔄 REFRESH TOKEN REQUEST
// ============================================

/**
 * Perform Token Refresh
 *
 * Makes the actual API call to refresh the token.
 * This function is called ONLY ONCE even if multiple requests fail simultaneously.
 *
 * @param {string} email - User email for refresh request
 * @param {Function} axiosInstance - Axios instance to use (to avoid circular dependency)
 * @returns {Promise<Object>} User data if successful
 * @throws {Error} If refresh fails
 *
 * @example
 * const userData = await performRefresh("user@example.com", axiosInstance);
 * // Returns: { firstName, lastName, email, imagePath, fullName }
 */
const performRefresh = async (email, axiosInstance) => {
  try {
    if (import.meta.env.MODE === "development") {
      console.log("🔄 Performing token refresh for:", email);
    }

    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.REFRESH_TOKEN,
      { email },
      {
        _skipAuthRefresh: true, // Prevent interceptor from retrying this request
      },
    );

    if (response.data?.succeeded && response.data?.data) {
      const userData = response.data.data;

      if (import.meta.env.MODE === "development") {
        console.log("✅ Token refresh successful");
      }

      // Normalize user data structure
      return {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: email,
        imagePath: userData.imagePath || null,
        fullName: `${userData.firstName} ${userData.lastName}`.trim(),
      };
    }

    throw new Error("Invalid refresh response structure");
  } catch (error) {
    if (import.meta.env.MODE === "development") {
      console.error("❌ Token refresh failed:", error.message);
    }

    // Extract error details from backend
    const responseData = error.response?.data || {};
    const errorCode = responseData.meta?.errorCode;

    if (errorCode && import.meta.env.MODE === "development") {
      console.error("❌ Backend error code:", errorCode);
    }

    throw error;
  } finally {
    // Always reset state after refresh attempt
    resetRefreshState();
  }
};

// ============================================
// 🚀 PUBLIC API - REFRESH ACCESS TOKEN
// ============================================

/**
 * Refresh Access Token
 *
 * Public API for refreshing the access token.
 * Implements mutex lock to ensure only one refresh happens at a time.
 *
 * Flow:
 * 1. Check if refresh is already in progress
 *    - If yes: Wait for the existing refresh to complete
 *    - If no: Start a new refresh
 * 2. Perform refresh request
 * 3. Return user data on success
 * 4. Throw error on failure
 *
 * @param {string} email - User email
 * @param {Function} axiosInstance - Axios instance
 * @returns {Promise<Object>} User data if successful
 * @throws {Error} If refresh fails
 *
 * @example
 * try {
 *   const userData = await refreshAccessToken(email, axiosInstance);
 *   console.log("Refresh successful:", userData);
 * } catch (error) {
 *   console.error("Refresh failed:", error);
 * }
 */
export const refreshAccessToken = async (email, axiosInstance) => {
  // ============================================
  // 🔒 MUTEX LOCK: Prevent parallel refresh calls
  // ============================================

  if (isRefreshing && refreshPromise) {
    if (import.meta.env.MODE === "development") {
      console.log("⏳ Refresh already in progress, waiting...");
    }
    return refreshPromise; // Wait for the existing refresh to complete
  }

  // ============================================
  // 🆕 START NEW REFRESH
  // ============================================

  isRefreshing = true;
  refreshPromise = performRefresh(email, axiosInstance);

  return refreshPromise;
};

// ============================================
// 🚨 HANDLE REFRESH FAILURE
// ============================================

/**
 * Handle Refresh Failure - Enhanced Version
 *
 * Handles refresh failures with clean AuthContext updates.
 *
 * Features:
 * ✅ Clean AuthContext update via triggerAuthUpdate (from authBridge)
 * ✅ Smart toast notifications (skip for MissingToken)
 * ✅ Session cleanup
 * ✅ Automatic redirect
 * ✅ Fast Refresh compatible
 *
 * Flow:
 * 1. Clear authentication cache
 * 2. Update AuthContext to clear user
 * 3. Show error toast (if applicable)
 * 4. Navigate to login page
 * 5. Reset refresh state
 *
 * @param {Function} clearAuthCallback - Function to clear auth cache
 * @param {Function} navigateCallback - Function to navigate to login (optional)
 * @param {boolean} showToast - Whether to show error toast (default: true)
 *
 * @example
 * handleRefreshFailure(
 *   () => resetAuthCache(),
 *   () => window.location.href = "/login",
 *   true // show toast
 * );
 */
export const handleRefreshFailure = (
  clearAuthCallback,
  navigateCallback = null,
  showToast = true,
) => {
  if (import.meta.env.MODE === "development") {
    console.log("🚨 Handling refresh failure - clearing session");
  }

  // ============================================
  // 📋 STEP 1: Clear Authentication Cache
  // ============================================

  clearAuthCallback();

  // ============================================
  // 🌉 STEP 2: Update AuthContext (Clean Bridge)
  // ============================================

  /**
   * Clear user in AuthContext via clean communication bridge
   *
   * Benefits over window.__authContextUpdate:
   * ✅ No global scope pollution
   * ✅ Type-safe
   * ✅ Easy to test
   * ✅ Follows React principles
   * ✅ Fast Refresh compatible
   */
  triggerAuthUpdate(null, false); // null = clear user, false = not verifying

  // ============================================
  // 🔔 STEP 3: Show Error Toast
  // ============================================

  if (showToast) {
    showErrorToast(errorsKeys.unauthorized);
  }

  // ============================================
  // 🚪 STEP 4: Navigate to Login
  // ============================================

  if (navigateCallback) {
    navigateCallback();
  }

  // ============================================
  // 🔄 STEP 5: Reset Refresh State
  // ============================================

  resetRefreshState();
};

// ============================================
// 🛠️ HELPER FUNCTIONS
// ============================================

/**
 * Get User Email
 *
 * Helper function to extract user email from user object.
 * Used to check if we have the user's email (needed for refresh request).
 *
 * @param {Object} user - User object from context or cache
 * @returns {string|null} User email or null
 *
 * @example
 * const email = getUserEmail(user);
 * if (email) {
 *   await refreshAccessToken(email, axiosInstance);
 * }
 */
export const getUserEmail = (user) => {
  return user?.email || null;
};

/**
 * Parse Backend Error
 *
 * Extracts errorCode and isRecoverable from backend 401 response.
 * Used by interceptor to determine if refresh should be attempted.
 *
 * @param {Object} error - Axios error object
 * @returns {Object} Parsed error information
 * @returns {string|null} returns.errorCode - Backend error code
 * @returns {boolean} returns.isRecoverable - Whether refresh should be attempted
 * @returns {string} returns.message - Error message
 *
 * @example
 * const { errorCode, isRecoverable } = parseBackendError(error);
 *
 * if (!isRecoverable) {
 *   // Immediate logout - no refresh attempt
 *   handleRefreshFailure(...);
 * } else {
 *   // Attempt token refresh
 *   await refreshAccessToken(...);
 * }
 */
export const parseBackendError = (error) => {
  const errorData = error.response?.data?.meta || {};

  return {
    errorCode: errorData.errorCode || null,
    isRecoverable: errorData.isRecoverable || false,
    message: errorData.message || error.message || "Unknown error",
  };
};

/**
 * Should Skip Refresh By Error Code
 *
 * Determines if refresh should be skipped based on error code.
 * Enhanced version: Uses backend errorCode for decision.
 *
 * Non-recoverable errors:
 * - MissingToken: New user, no tokens
 * - InvalidToken: Token is malformed
 * - SessionExpired: Session fully expired
 * - AccessDenied: Explicit denial
 *
 * @param {string} errorCode - Backend error code
 * @returns {boolean} True if refresh should be skipped
 *
 * @example
 * const errorCode = error.response?.data?.meta?.errorCode;
 *
 * if (shouldSkipRefreshByErrorCode(errorCode)) {
 *   // Don't attempt refresh
 *   handleRefreshFailure(...);
 * } else {
 *   // Attempt refresh
 *   await refreshAccessToken(...);
 * }
 */
export const shouldSkipRefreshByErrorCode = (errorCode) => {
  const nonRecoverableErrors = [
    "MissingToken", // New user, no tokens
    "InvalidToken", // Token is malformed
    "SessionExpired", // Session fully expired
    "AccessDenied", // Explicit denial
  ];

  return nonRecoverableErrors.includes(errorCode);
};
