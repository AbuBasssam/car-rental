import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { keys } from "../utils/constants";
import { ROUTES } from "./paths";

/**
 * ResetPasswordRoute Component
 *
 * Protects the Reset Password page with special logic
 *
 * Protection Rules:
 * 1. If user is authenticated → Redirect to home (already logged in)
 * 2. If user is NOT authenticated BUT has valid reset token → Allow access
 * 3. If user is NOT authenticated AND no reset token → Redirect to forgot password
 *
 * This ensures only users who completed verification can access password reset page.
 *
 * Flow:
 * User Verifies Code → VerifyResetCodeAction saves token → Redirects to /reset-password
 * → ResetPasswordRoute checks for token → Allows access
 *
 * If someone tries to access /reset-password directly:
 * → ResetPasswordRoute checks for token → No token found → Redirect to forgot password
 *
 * @component
 */
function ResetPasswordRoute() {
  const { isAuthenticated } = useAuth();

  // ============================================
  // 🔐 GET RESET TOKEN FROM SESSION STORAGE
  // ============================================
  const getResetToken = () => {
    try {
      const token = sessionStorage.getItem(keys.kResetToken);
      return token || null;
    } catch {
      return null;
    }
  };

  const resetToken = getResetToken();

  // ============================================
  // 🛡️ PROTECTION LOGIC
  // ============================================

  // Case 1: User is already authenticated
  // They don't need to reset password - redirect to home
  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  // Case 2: User is NOT authenticated but has valid reset token
  // This is the expected flow after code verification - allow access
  if (resetToken) {
    return <Outlet />;
  }

  // Case 3: User is NOT authenticated AND no reset token
  // They're trying to access reset page directly - redirect to forgot password
  return <Navigate to={ROUTES.FORGOT_PASSWORD} replace />;
}

export default ResetPasswordRoute;
