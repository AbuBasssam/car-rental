import { useLoaderData, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
/**
 * Root Layout Component - Phase 3
 *
 * This component serves as the root layout for the application.
 * It receives authentication data from the rootLoader and updates AuthContext.
 *
 * Flow:
 * 1. Receives data from rootLoader via useLoaderData()
 * 2. Updates AuthContext with user data
 * 3. Optionally shows error toast if authentication failed
 * 4. Renders child routes via <Outlet />
 *
 * Important Notes:
 * - This component wraps all routes in the application
 * - The loader data is available immediately (no loading state needed here)
 * - The LoadingIndicator is shown by React Router during loader execution
 */
function Root() {
  const { user, isAuthenticated } = useLoaderData();
  const { setUser, clearUser } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      // User is authenticated - update context with user data
      setUser(user);
    } else {
      // User is not authenticated - clear context
      clearUser();
    }
  }, [user, isAuthenticated, setUser, clearUser]);

  return <Outlet />;
}

export default Root;
