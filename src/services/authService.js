import {
  API_ENDPOINTS,
  HTTP_METHODS,
  REQUEST_CONFIG,
} from "../config/apiConfig";

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

/**
 * Sign In
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} - API response
 */
export const signIn = async (credentials) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(API_ENDPOINTS.SIGN_IN, {
      method: HTTP_METHODS.POST,
      ...REQUEST_CONFIG,
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Sign Up
 * @param {Object} userData - { firstName, lastName, email, password }
 * @returns {Promise<Object>} - API response
 */
export const signUp = async (userData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(API_ENDPOINTS.SIGN_UP, {
      method: HTTP_METHODS.POST,
      ...REQUEST_CONFIG,
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Sign Out
 * @returns {Promise<Object>} - API response
 */
export const signOut = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(API_ENDPOINTS.SIGN_OUT, {
      method: HTTP_METHODS.POST,
      ...REQUEST_CONFIG,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Logout failed");
    }

    // Clear any client-side data
    localStorage.removeItem("userName");

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Refresh Token
 * @returns {Promise<Object>} - API response with new token
 */
export const refreshToken = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(API_ENDPOINTS.REFRESH_TOKEN, {
      method: HTTP_METHODS.POST,
      ...REQUEST_CONFIG,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Token refresh failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Check if user is authenticated
 * Verifies if valid auth cookies exist
 */
export const isAuthenticated = () => {
  // Check if refreshToken cookie exists (server-side check would be better)
  const cookies = document.cookie.split(";");
  const hasRefreshToken = cookies.some((cookie) =>
    cookie.trim().startsWith("refreshToken="),
  );

  return hasRefreshToken;
};

/**
 * Get User Info from localStorage
 */
export const getUserInfo = () => {
  const userName = localStorage.getItem("userName");
  return userName ? { fullName: userName } : null;
};

/**
 * Save User Info to localStorage
 */
export const saveUserInfo = (fullName) => {
  if (fullName) {
    localStorage.setItem("userName", fullName);
  }
};
