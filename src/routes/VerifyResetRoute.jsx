import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getValidResetEmail } from "../utils/authUtils";
import { ROUTES } from "./paths";

function VerifyResetRoute() {
  const { isAuthenticated } = useAuth();
  const resetEmail = getValidResetEmail();

  // Case 1: User is already authenticated
  // They don't need to Reset - redirect to home
  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  // Case 2: User is NOT authenticated but has valid reset email
  // This is the expected flow after forgot password - allow access
  if (resetEmail) {
    return <Outlet />;
  }

  // Case 3: User is NOT authenticated AND no reset email
  // They're trying to access reset page directly - redirect to forgot password
  return <Navigate to={ROUTES.FORGOT_PASSWORD} replace />;
}

export default VerifyResetRoute;
