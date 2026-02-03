import { useSubmit } from "react-router-dom";
import { useCallback } from "react";
import { useAuth } from "./useAuth";
import { ROUTES } from "../routes/paths";

/**
 * useLogout Hook
 *
 * Provides a logout function that:
 * 1. Clears user state (optimistic update)
 * 2. Submits to logoutAction (server communication)
 * 3. Redirects to home page
 *
 * This hook must be used within a component that's inside the router context.
 *
 * @returns {Function} logout - Function to trigger logout
 */
export const useLogout = () => {
  const submit = useSubmit();
  const { clearUser } = useAuth();

  const logout = useCallback(() => {
    // Clear state immediately (optimistic update)
    clearUser();

    // Submit to logoutAction
    submit(null, { method: "post", action: ROUTES.LOGOUT });
  }, [submit, clearUser]);

  return logout;
};
