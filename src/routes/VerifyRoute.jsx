import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getValidVerificationEmail } from "../utils/authUtils";
import { ROUTES } from "./paths";

/**
 * VerifyRoute Component - Updated for Phase 3
 *
 * This component protects the Verify Account page with special logic:
 *
 * Protection Rules:
 * 1. If user is authenticated → Redirect to home (already logged in)
 * 2. If user is NOT authenticated BUT has valid verification email → Allow access
 * 3. If user is NOT authenticated AND no verification email → Redirect to signup
 *
 * This ensures only users who just signed up can access the verification page.
 *
 * Flow:
 * User Signs Up → SignUp saves email to localStorage → Redirects to /verify-account
 * → VerifyRoute checks for valid email → Allows access
 *
 * If someone tries to access /verify-account directly:
 * → VerifyRoute checks for valid email → No email found → Redirect to signup
 */
function VerifyRoute() {
  const { isAuthenticated } = useAuth();
  const verificationEmail = getValidVerificationEmail();

  // Case 1: User is already authenticated
  // They don't need to verify - redirect to home
  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  // Case 2: User is NOT authenticated but has valid verification email
  // This is the expected flow after signup - allow access
  if (verificationEmail) {
    return <Outlet />;
  }

  // Case 3: User is NOT authenticated AND no verification email
  // They're trying to access verification page directly - redirect to signup
  return <Navigate to={ROUTES.SIGNUP} replace />;
}

export default VerifyRoute;
