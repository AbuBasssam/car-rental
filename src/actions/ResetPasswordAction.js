import { redirect } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { keys } from "../utils/constants";
import { ROUTES } from "../routes/paths";
import { AUTH_ENDPOINTS } from "../api/endpoints/endpoints";
import { validationKeys, errorsKeys } from "../utils/localeKeys";
import {
  clearResetSession,
  normalizeError,
  deleteCsrfToken,
  isResetTokenValid,
  clearResetToken,
} from "../utils/authUtils";
import {
  validateStrongPassword,
  validatePasswordsMatch,
} from "../utils/validators";

/**
 * ResetPasswordAction
 *
 * Final step in password reset flow - Changes user's password
 *
 * Flow:
 * 1. Extract passwords from form
 * 2. Validate password strength and match
 * 3. Get reset token from sessionStorage
 * 4. Send reset request with token in Authorization header
 * 5. On success:
 *    - Clear reset email and token
 *    - Delete CSRF token
 *    - Set success flag for toast
 *    - Redirect to login
 *
 * @param {Object} params - React Router action params
 * @param {Request} params.request - The form request object
 * @returns {Promise<Object|Response>} Validation errors or redirect response
 */
const ResetPasswordAction = async ({ request }) => {
  try {
    if (!isResetTokenValid()) {
      // Token expired - redirect to forgot password
      return redirect(ROUTES.FORGOT_PASSWORD, {
        state: { message: errorsKeys.resetSessionExpired },
      });
    }
    // ============================================
    // 1️⃣ EXTRACT FORM DATA
    // ============================================
    const formData = await request.formData();
    const password = formData.get("password")?.trim() || "";
    const confirmPassword = formData.get("confirmPassword")?.trim() || "";

    // ============================================
    // 2️⃣ VALIDATE PASSWORDS
    // ============================================
    const validationErrors = {};

    // Validate password strength
    const passwordError = validateStrongPassword(password);
    if (passwordError) {
      validationErrors.password = passwordError;
    }

    // Validate passwords match
    const confirmPasswordError = validatePasswordsMatch(
      password,
      confirmPassword,
    );
    if (confirmPasswordError) {
      validationErrors.confirmPassword = confirmPasswordError;
    }

    // Return validation errors if any
    if (Object.keys(validationErrors).length > 0) {
      return {
        succeeded: false,
        message: validationKeys.validationFailed,
        validationErrors,
      };
    }

    // ============================================
    // 3️⃣ GET RESET TOKEN
    // ============================================
    const resetToken = sessionStorage.getItem(keys.kResetToken);

    if (!resetToken) {
      return {
        succeeded: false,
        isMessageKey: true,
        message: errorsKeys.unauthorized,
        errors: [
          "Reset token not found. Please restart the password reset process.",
        ],
      };
    }

    // ============================================
    // 4️⃣ PREPARE REQUEST
    // ============================================
    const payload = {
      password: password,
      confirmPassword: confirmPassword,
    };

    // ============================================
    // 5️⃣ SEND RESET REQUEST WITH TOKEN IN HEADER
    // ============================================
    const response = await axiosInstance.put(
      AUTH_ENDPOINTS.RESET_PASSWORD,
      payload,
      {
        headers: {
          Authorization: `Bearer ${resetToken}`,
        },
      },
    );

    // ============================================
    // 6️⃣ HANDLE SUCCESS RESPONSE
    // ============================================
    if (response.data?.succeeded) {
      // Clear reset token data
      clearResetToken();

      // Delete CSRF token (security measure)
      deleteCsrfToken();

      // Set success flag for toast notification on login page
      sessionStorage.setItem(keys.kPasswordReset, "true");

      // Redirect to login page
      return redirect(ROUTES.LOGIN, { replace: true });
    }

    // ============================================
    // 7️⃣ HANDLE BACKEND ERROR RESPONSE
    // ============================================
    return response.data;
  } catch (err) {
    // ============================================
    // 8️⃣ HANDLE NETWORK/SYSTEM ERRORS
    // ============================================
    const normalizedError = normalizeError(err);

    // Check if error is 401 (expired token)
    if (err.response?.status === 401) {
      clearResetSession();
      return redirect(ROUTES.FORGOT_PASSWORD, {
        state: { message: validationKeys.expiredResetToken },
      });
    }

    // Special handling for common errors
    let finalMessage = normalizedError.message;
    if (
      normalizedError.isMessageKey &&
      normalizedError.message === errorsKeys.badRequest
    ) {
      // Token might be expired or invalid
      finalMessage = errorsKeys.unauthorized;
    }

    return {
      succeeded: false,
      isMessageKey: normalizedError.isMessageKey,
      message: finalMessage,
      errors: normalizedError.errors || [],
      validationErrors: normalizedError.validationErrors || {},
    };
  }
};

export default ResetPasswordAction;
