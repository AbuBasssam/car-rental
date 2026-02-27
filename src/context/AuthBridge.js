// ============================================
// 🌉 AUTH COMMUNICATION BRIDGE
// ============================================

/**
 * Authentication Communication Bridge
 *
 * This file provides a clean communication channel between:
 * - Axios Interceptor → AuthContext
 * - RefreshTokenService → AuthContext
 *
 * By separating this into its own file, we:
 * ✅ Fix Fast Refresh (AuthContext only exports components)
 * ✅ Avoid circular dependencies
 * ✅ Make testing easier
 * ✅ Follow separation of concerns
 */

// ============================================
// 🔒 SINGLETON REFERENCE
// ============================================

/**
 * Singleton reference for auth updates
 *
 * This is set by AuthProvider on mount and allows external
 * code (Interceptor, RefreshTokenService) to update auth state
 * without importing AuthContext directly.
 *
 * Pattern:
 * - AuthProvider registers its update function
 * - External code calls triggerAuthUpdate()
 * - Update flows through the singleton reference
 */
let updateAuthInstance = () => {
  if (import.meta.env.MODE === "development") {
    console.warn("⚠️ AuthProvider not mounted yet");
  }
};

// ============================================
// 📤 PUBLIC API
// ============================================

/**
 * Register Auth Update Handler
 *
 * Called by AuthProvider to register its update function.
 * Internal use only - don't call this from application code.
 *
 * @param {Function} updateFn - Update function from AuthProvider
 *
 * @example
 * // In AuthProvider
 * useEffect(() => {
 *   registerAuthUpdate(handleExternalUpdate);
 *   return () => unregisterAuthUpdate();
 * }, [handleExternalUpdate]);
 */
export const registerAuthUpdate = (updateFn) => {
  updateAuthInstance = updateFn;

  if (import.meta.env.MODE === "development") {
    console.log("🔌 Auth bridge registered");
  }
};

/**
 * Unregister Auth Update Handler
 *
 * Called by AuthProvider on unmount to cleanup.
 * Internal use only - don't call this from application code.
 */
export const unregisterAuthUpdate = () => {
  updateAuthInstance = () => {
    if (import.meta.env.MODE === "development") {
      console.warn("⚠️ AuthProvider unmounted");
    }
  };

  if (import.meta.env.MODE === "development") {
    console.log("🔌 Auth bridge unregistered");
  }
};

/**
 * Trigger Auth Update
 *
 * External API for updating authentication state.
 * Call this from Interceptor or RefreshTokenService.
 *
 * @param {Object|null} userData - User data or null to clear
 * @param {boolean} isVerifying - Whether verification is in progress
 *
 * @example
 * // After successful refresh
 * triggerAuthUpdate(userData, false);
 *
 * @example
 * // On logout
 * triggerAuthUpdate(null, false);
 */
export const triggerAuthUpdate = (userData, isVerifying = false) => {
  updateAuthInstance(userData, isVerifying);
};

// ============================================
// 🧪 TESTING UTILITIES
// ============================================

/**
 * Reset Auth Bridge (for testing only)
 *
 * Resets the singleton to its initial state.
 * Use in test cleanup to ensure clean state.
 *
 * @example
 * afterEach(() => {
 *   resetAuthBridge();
 * });
 */
export const resetAuthBridge = () => {
  updateAuthInstance = () => {
    if (import.meta.env.MODE === "development") {
      console.warn("⚠️ AuthProvider not mounted yet");
    }
  };

  if (import.meta.env.MODE === "development") {
    console.log("🧪 Auth bridge reset");
  }
};

/**
 * Is Auth Bridge Active
 *
 * Check if AuthProvider has registered an update handler.
 * Useful for debugging.
 *
 * @returns {boolean} True if bridge is active
 */
export const isAuthBridgeActive = () => {
  return (
    updateAuthInstance.toString().includes("AuthProvider not mounted") === false
  );
};

// ============================================
// 📚 USAGE EXAMPLES
// ============================================

/**
 * EXAMPLE 1: In AuthProvider
 *
 * import { registerAuthUpdate, unregisterAuthUpdate } from "./authBridge";
 *
 * export const AuthProvider = ({ children }) => {
 *   const handleExternalUpdate = useCallback((userData, isVerifying) => {
 *     setState({ user: userData, isVerifying });
 *   }, []);
 *
 *   useEffect(() => {
 *     registerAuthUpdate(handleExternalUpdate);
 *     return () => unregisterAuthUpdate();
 *   }, [handleExternalUpdate]);
 *
 *   // ...
 * };
 */

/**
 * EXAMPLE 2: In Axios Interceptor
 *
 * import { triggerAuthUpdate } from "../context/authBridge";
 *
 * // After successful refresh
 * const userData = await refreshAccessToken(email, axiosInstance);
 * triggerAuthUpdate(userData, false);
 *
 * // On logout
 * triggerAuthUpdate(null, false);
 */

/**
 * EXAMPLE 3: In RefreshTokenService
 *
 * import { triggerAuthUpdate } from "../context/authBridge";
 *
 * export const handleRefreshFailure = (...) => {
 *   clearAuthCallback();
 *   triggerAuthUpdate(null, false);
 *   // ...
 * };
 */

/**
 * EXAMPLE 4: In Tests
 *
 * import { resetAuthBridge, isAuthBridgeActive } from "../context/authBridge";
 *
 * beforeEach(() => {
 *   resetAuthBridge();
 * });
 *
 * test("should register auth bridge", () => {
 *   render(<AuthProvider><App /></AuthProvider>);
 *   expect(isAuthBridgeActive()).toBe(true);
 * });
 */
