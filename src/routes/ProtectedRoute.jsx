import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../services/authService";
import { ROUTES } from "./paths";

/**
 * Protected Route Component
 * Protects routes that require authentication.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Authenticated content
 * @param {string} props.redirectTo - Page to redirect to (default: /login)
 * @returns {React.ReactNode}
 */
const ProtectedRoute = ({ children, redirectTo = ROUTES.LOGIN }) => {
  const location = useLocation();

  // Check authentication status
  if (!isAuthenticated()) {
    // Save the current location and redirect to login
    return (
      <Navigate to={redirectTo} state={{ from: location.pathname }} replace />
    );
  }

  // User is authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
