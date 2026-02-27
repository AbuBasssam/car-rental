import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { registerAuthUpdate, unregisterAuthUpdate } from "./AuthBridge";
import axiosInstance from "../api/axiosInstance";
import { AUTH_ENDPOINTS } from "../api/endpoints/endpoints";

// ============================================
// 🎯 AUTH CONTEXT - FINAL FIXED VERSION
// ============================================

const AuthContext = createContext(null);

/**
 * Map User Data
 *
 * Ensures user data has all required fields.
 *
 * @param {Object} userData - Raw user data
 * @returns {Object|null} Mapped user data
 */
const mapUserData = (userData) => {
  if (!userData) return null;

  return {
    ...userData,
    // Ensure fullName exists even if server doesn't send it
    fullName:
      userData.fullName ||
      `${userData.firstName || ""} ${userData.lastName || ""}`.trim(),
  };
};

export function AuthProvider({ children }) {
  // ============================================
  // 📊 STATE MANAGEMENT
  // ============================================

  const [state, setState] = useState({
    user: null,
    isVerifying: true, // Default to true for lazy auth
  });

  // ============================================
  // 🔐 PROACTIVE VERIFICATION
  // ============================================

  /**
   * Perform Proactive Verification
   *
   * Called when loader detects session indicators.
   * Makes a verify request to confirm user status.
   *
   * Benefits:
   * - Faster UX (immediate verification)
   * - No waiting for first protected request
   * - Cleaner user experience
   */
  const performProactiveVerification = useCallback(async () => {
    try {
      const response = await axiosInstance.get(AUTH_ENDPOINTS.VERIFY);

      // If we reach here, Access Token is valid or was refreshed successfully
      if (response.data?.succeeded && response.data?.data) {
        setState({
          user: mapUserData(response.data.data),
          isVerifying: false,
        });

        if (import.meta.env.MODE === "development") {
          console.log("✅ Proactive verification successful");
        }
      } else {
        // Invalid response structure
        setState({ user: null, isVerifying: false });
      }
    } catch {
      // Verification failed - user is guest
      if (import.meta.env.MODE === "development") {
        console.log("❌ Verification failed, user is guest");
      }

      setState({ user: null, isVerifying: false });
    }
  }, []);

  // ============================================
  // 🔄 SYNC FROM LOADER
  // ============================================

  /**
   * Sync auth state from rootLoader
   *
   * Called once from Root.jsx after loader completes.
   *
   * Logic:
   * - If isAuthenticated && user → Set user, stop verifying
   * - If needsVerification → Keep verifying + trigger proactive check
   * - Otherwise → Clear user, stop verifying
   *
   * @param {Object} loaderData - Data from rootLoader
   * @param {Object} loaderData.user - User object
   * @param {boolean} loaderData.isAuthenticated - Auth status
   * @param {boolean} loaderData.needsVerification - Needs lazy verification
   */
  const syncLoaderData = useCallback(
    (loaderData) => {
      if (!loaderData) {
        setState({ user: null, isVerifying: false });
        return;
      }

      const { user, isAuthenticated, needsVerification } = loaderData;

      if (isAuthenticated && user) {
        // ✅ User authenticated from cache
        setState({
          user: mapUserData(user),
          isVerifying: false,
        });
      } else if (needsVerification) {
        // ⏳ Need verification - start proactive check
        setState({
          user: null,
          isVerifying: true,
        });

        // Trigger proactive verification immediately
        performProactiveVerification();
      } else {
        // ❌ Not authenticated
        setState({ user: null, isVerifying: false });
      }

      if (import.meta.env.MODE === "development") {
        console.log("🔄 Auth state synced from loader:", {
          hasUser: !!user,
          isAuthenticated,
          needsVerification,
        });
      }
    },
    [performProactiveVerification],
  );

  // ============================================
  // 🔧 EXTERNAL UPDATES (from Interceptor)
  // ============================================

  /**
   * Handle external auth updates
   *
   * Called by Interceptor via triggerAuthUpdate().
   *
   * Use cases:
   * - After successful token refresh
   * - After refresh failure (logout)
   *
   * @param {Object|null} userData - User data or null
   * @param {boolean} isVerifying - Verification status
   */
  const handleExternalUpdate = useCallback((userData, isVerifying = false) => {
    setState({
      user: mapUserData(userData),
      isVerifying,
    });

    if (import.meta.env.MODE === "development") {
      console.log("🌉 External auth update:", {
        hasUser: !!userData,
        isVerifying,
      });
    }
  }, []);

  // ============================================
  // 📝 MANUAL SETTERS (for login/logout actions)
  // ============================================

  /**
   * Manually set user
   *
   * Used after successful login action.
   * Automatically stops verification.
   *
   * @param {Object} userData - User data
   */
  const setUser = useCallback((userData) => {
    setState({
      user: mapUserData(userData),
      isVerifying: false,
    });

    if (import.meta.env.MODE === "development") {
      console.log("✅ User set manually:", userData?.email);
    }
  }, []);

  /**
   * Manually clear user
   *
   * Used after logout action.
   * Automatically stops verification.
   */
  const clearUser = useCallback(() => {
    setState({
      user: null,
      isVerifying: false,
    });

    if (import.meta.env.MODE === "development") {
      console.log("🚪 User cleared manually");
    }
  }, []);

  // ============================================
  // 🔌 REGISTER EXTERNAL UPDATE HANDLER
  // ============================================

  useEffect(() => {
    // Register this instance's update handler with the bridge
    registerAuthUpdate(handleExternalUpdate);

    if (import.meta.env.MODE === "development") {
      console.log("🔌 AuthProvider mounted, bridge active");
    }

    // Cleanup on unmount
    return () => {
      unregisterAuthUpdate();

      if (import.meta.env.MODE === "development") {
        console.log("🔌 AuthProvider unmounted, bridge disabled");
      }
    };
  }, [handleExternalUpdate]);

  // ============================================
  // 📦 MEMOIZED CONTEXT VALUE
  // ============================================

  /**
   * Memoized context value to prevent unnecessary re-renders
   *
   * Only updates when state changes.
   */
  const value = useMemo(
    () => ({
      // State
      user: state.user,
      isAuthenticated: !!state.user,
      isVerifying: state.isVerifying,

      // Methods
      syncLoaderData,
      setUser,
      clearUser,
    }),
    [state.user, state.isVerifying, syncLoaderData, setUser, clearUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
