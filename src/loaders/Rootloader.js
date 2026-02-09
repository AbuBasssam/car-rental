import { verifyAuth } from "../api/endpoints/auth";
// import { handleApiError } from "../utils/authUtils";

/**
 * Root Loader
 *
 * This loader runs on initial app load and verifies user authentication.
 * It's called by React Router before rendering any routes.
 *
 * Flow:
 * 1. Calls verifyAuth() which sends GET request to /authentication/verify
 * 2. Backend reads httpOnly cookie and validates token
 * 3. Returns user data if authenticated, or null if not
 *
 * @returns {Promise<Object>} Object containing user data and authentication status
 * @returns {Object|null} returns.user - User data if authenticated, null otherwise
 * @returns {boolean} returns.isAuthenticated - Authentication status
 *
 */
let cachedAuthData = null;
let isLogout = false;
export const rootLoader = async () => {
  if (cachedAuthData) {
    return cachedAuthData;
  }
  if (isLogout) {
    //Prevents unnecessary API calls to verify auth after logout.
    return { user: null, isAuthenticated: false };
  }
  try {
    const response = await verifyAuth();

    if (response.data?.succeeded && response.data?.data) {
      const userData = response.data.data;
      cachedAuthData = {
        user: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email || null,
          imagePath: userData.imagePath || null,
          fullName: `${userData.firstName} ${userData.lastName}`.trim(),
        },
        isAuthenticated: true,
      };

      return cachedAuthData;
    }

    if (import.meta.env.MODE === "development") {
      console.warn(
        "Unexpected response structure from verifyAuth:",
        response.data,
      );
    }
    cachedAuthData = { user: null, isAuthenticated: false };
    return cachedAuthData;
  } catch (error) {
    // Log error in development mode only
    if (import.meta.env.MODE === "development") {
      console.log("Auth verification failed:", error.message);
    }

    cachedAuthData = { user: null, isAuthenticated: false };
    return cachedAuthData;
  }

  // Test Section
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
};
/**
 * Resets the authentication cache.
 * Must be called during logout to ensure next session triggers fresh verification.
 */
export const resetAuthCache = () => {
  cachedAuthData = null;
};
/**
 * Updates the authentication cache with new user data.
 * Used after successful login to update the cache without making another API call.
 *
 * @param {Object} authData - Authentication data object
 * @param {Object} authData.user - User data object
 * @param {boolean} authData.isAuthenticated - Authentication status
 */
export const updateAuthCache = (authData) => {
  cachedAuthData = authData;
  isLogout = false;
};

/**
 * Marks the user as logged out.
 */
export const setUserLogout = () => {
  isLogout = true;
};
