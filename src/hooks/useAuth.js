import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * useAuth Hook
 *
 * Access auth context from any component.
 *
 * @returns {Object} Auth context
 * @returns {Object|null} returns.user - Current user
 * @returns {boolean} returns.isAuthenticated - Authentication status
 * @returns {boolean} returns.isVerifying - Verification in progress
 * @returns {Function} returns.syncLoaderData - Sync from loader
 * @returns {Function} returns.setUser - Set user manually
 * @returns {Function} returns.clearUser - Clear user manually
 *
 * @throws {Error} If used outside AuthProvider
 *
 * @example
 * const { user, isAuthenticated, isVerifying } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
