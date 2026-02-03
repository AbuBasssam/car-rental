import { createContext, useState, useCallback } from "react";

const AuthContext = createContext();

/**
 * AuthProvider - Centralized Authentication State Management
 *
 * Responsibilities:
 * - Maintain user state (user object + isAuthenticated flag)
 * - Provide setUser() and clearUser() for direct state updates
 *
 * Architecture:
 * - Actions (loginAction/logoutAction) handle server communication + redirect
 * - AuthContext handles state synchronization
 * - Components use Form submission or custom hooks for login/logout
 *
 * Note: We don't use useSubmit here because it must be used within
 * a component that's inside the router context, not in the provider itself.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const isAuthenticated = !!user;

  /**
   * Direct state setters (used by Root loader after rootLoader verification)
   * Also used to sync state after login/logout actions complete
   */
  const setUser = useCallback((userData) => setUserState(userData), []);
  const clearUser = useCallback(() => setUserState(null), []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
