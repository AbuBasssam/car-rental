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
export const rootLoader = async () => {
  if (cachedAuthData) {
    return cachedAuthData;
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
    return { user: null, isAuthenticated: false };
  } catch (error) {
    // Log error in development mode only
    if (import.meta.env.MODE === "development") {
      console.log("Auth verification failed:", error.message);
    }

    return { user: null, isAuthenticated: false };
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
