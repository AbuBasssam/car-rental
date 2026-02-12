import { keys } from "../utils/constants";
// ============================================
// 🚀 LEVEL 3: LAZY AUTHENTICATION ROOT LOADER
// ============================================

/**
 * Advanced Root Loader - Zero API Calls Strategy
 *
 * This is the MOST OPTIMIZED approach for authentication verification.
 *
 * Philosophy:
 * ❌ NO verifyAuth() call on app load
 * ✅ Return cached data if available
 * ✅ Return unauthenticated if no cache
 * ✅ Let the FIRST protected request determine actual auth status
 * ✅ Axios Interceptor handles everything with isRecoverable
 *
 * Benefits:
 * 🎯 ZERO unnecessary API calls on app load
 * ⚡ Fastest possible app startup
 * 🔒 Backend controls recoverability with errorCode + isRecoverable
 * 💪 Interceptor handles all auth logic
 *
 * Trade-off:
 * ⚠️ Requires smart loading state in UI
 * ⚠️ User might see "unauthenticated" state briefly
 *
 * Flow:
 * 1. App loads → rootLoader returns cache or unauthenticated
 * 2. User navigates to protected route
 * 3. Component makes first protected request
 * 4. Request → 401 → Interceptor checks isRecoverable
 *    ├─ isRecoverable = true → Refresh → Update context → Continue
 *    └─ isRecoverable = false → Logout → Redirect to login
 *
 * @returns {Promise<Object>} Object containing user data and authentication status
 * @returns {Object|null} returns.user - User data if cached, null otherwise
 * @returns {boolean} returns.isAuthenticated - Authentication status from cache
 * @returns {boolean} returns.needsVerification - Flag to trigger verification on first request
 */

let cachedAuthData = null;
let isLogout = false;

export const rootLoader = async () => {
  // ============================================
  // 📦 STEP 1: Check Cache (Instant Return)
  // ============================================
  if (cachedAuthData) {
    console.log("✅ Returning cached auth data");
    return {
      ...cachedAuthData,
      needsVerification: false, // Already verified
    };
  }

  // ============================================
  // 🚪 STEP 2: Check Logout Flag
  // ============================================
  if (isLogout) {
    console.log("🚪 User logged out, returning unauthenticated");
    return {
      user: null,
      isAuthenticated: false,
      needsVerification: false,
    };
  }

  // ============================================
  // 🔍 STEP 3: Check Session Indicators
  // ============================================
  const sessionIndicators = checkForSessionIndicators();

  if (sessionIndicators !== undefined && sessionIndicators.hasSession) {
    console.log("📌 Session indicators found:", sessionIndicators);

    // Return optimistic state
    // The first protected request will verify actual status
    return {
      user: sessionIndicators.userData || null,
      isAuthenticated: false, // Conservative: assume not authenticated until verified
      needsVerification: true, // Flag for UI to show loading state
    };
  }

  // ============================================
  // 🆕 STEP 4: No Session Indicators (New User)
  // ============================================
  console.log("🆕 No session indicators, new user");

  return {
    user: null,
    isAuthenticated: false,
    needsVerification: false,
  };
};

/**
 * Check for Session Indicators
 *
 * Looks for evidence that a user was previously logged in.
 * This helps us decide if we should show a loading state.
 *
 * Indicators (in priority order):
 * 1. Cached auth data (already checked)
 * 2. localStorage: last_user_email
 * 3. localStorage: was_logged_in flag
 *
 * @returns {Object} Session indicator data
 * @returns {boolean} returns.hasSession - Whether session indicators exist
 * @returns {Object|null} returns.userData - Partial user data if available
 */
const checkForSessionIndicators = () => {
  try {
    // Check localStorage for last known email
    const lastEmail = localStorage.getItem(keys.kLastUserEmail);
    const wasLoggedIn = localStorage.getItem(keys.kWasLoggedIn) === "true";

    if (lastEmail || wasLoggedIn) {
      return {
        hasSession: true,
        userData: lastEmail ? { email: lastEmail } : null,
      };
    }
  } catch (error) {
    console.error("Error checking session indicators:", error);
    return {
      hasSession: false,
      userData: null,
    };
  }
};

/**
 * Update Authentication Cache
 *
 * Called after successful login or token refresh.
 * Stores user data in memory cache and localStorage.
 *
 * @param {Object} authData - Authentication data object
 * @param {Object} authData.user - User data object
 * @param {boolean} authData.isAuthenticated - Authentication status
 */
export const updateAuthCache = (authData) => {
  cachedAuthData = {
    ...authData,
    needsVerification: false,
  };
  isLogout = false;

  // Store indicators for future sessions
  try {
    if (authData.user?.email) {
      localStorage.setItem(keys.kLastUserEmail, authData.user.email);
    }
    localStorage.setItem(keys.kWasLoggedIn, "true");
  } catch (error) {
    console.error("Error storing session indicators:", error);
  }

  console.log("✅ Auth cache updated:", cachedAuthData);
};

/**
 * Reset Authentication Cache
 *
 * Called during logout to clear all cached data.
 * Must be called to ensure next session starts fresh.
 */
export const resetAuthCache = () => {
  cachedAuthData = null;
  isLogout = true;
  console.log("🔄 Auth cache reset");
};

/**
 * Set User Logout
 *
 * Marks the user as logged out and clears all session indicators.
 * This prevents unnecessary verification attempts on next app load.
 */
export const setUserLogout = () => {
  isLogout = true;

  // Clear all session indicators
  try {
    localStorage.removeItem(keys.kLastUserEmail);
    localStorage.removeItem(keys.kWasLoggedIn);
  } catch (error) {
    console.error("Error clearing session indicators:", error);
  }

  console.log("🚪 User marked as logged out");
};

/**
 * Get User Email for Refresh
 *
 * Helper to get user email needed for refresh token request.
 * Tries multiple sources in priority order.
 *
 * @returns {string|null} User email or null
 */
export const getUserEmailForRefresh = () => {
  try {
    // 1. Try cache first
    if (cachedAuthData?.user?.email) {
      return cachedAuthData.user.email;
    }

    // 2. Try localStorage
    const lastEmail = localStorage.getItem("last_user_email");
    if (lastEmail) {
      return lastEmail;
    }

    return null;
  } catch (error) {
    console.error("Error getting user email for refresh:", error);
    return null;
  }
};

// Export cache for use in interceptor
export { cachedAuthData };

// Test Section (commented out)
/*
  const userData = {
    firstName: "Ali",
    lastName: "Maher",
  };
  return {
    user: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email || null,
      imagePath: userData.imagePath || null,
      fullName: `${userData.firstName} ${userData.lastName}`.trim(),
    },
    isAuthenticated: true,
  };*/
