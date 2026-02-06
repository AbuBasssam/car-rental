import { ROUTES } from "../routes/paths";
import { AUTH_ENDPOINTS } from "../api/endpoints/endpoints";
import { redirect } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { validationKeys, errorsKeys } from "../utils/localeKeys";
import {
  clearResetEmail,
  normalizeError,
  deleteCsrfToken,
  saveResetToken,
} from "../utils/authUtils";

/**
 * VerifyResetCodeAction
 *
 * Handles verification of password reset OTP code
 *
 * Flow:
 * 1. Extract email and OTP from form
 * 2. Send verification request to backend
 * 3. On success:
 *    - Save reset token to sessionStorage
 *    - Clear CSRF token
 *    - Redirect to reset password page
 * 4. On error:
 *    - Return normalized error message
 *
 * @param {Object} params - React Router action params
 * @param {Request} params.request - The form request object
 * @returns {Promise<Object|Response>} Error data or redirect response
 */
const VerifyResetCodeAction = async ({ request }) => {
  //Test Flow
  /*
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(
    `Email: ${data.email}
     Code: ${data.code}`,
  );
  return redirect(ROUTES.RESET_PASSWORD, { replace: true });*/

  try {
    const formData = await request.formData();
    const email = formData.get("email")?.trim() || null;
    const code = formData.get("code")?.trim() || null;

    if (!email) {
      // Session expired - redirect to request reset page
      return redirect(ROUTES.FORGOT_PASSWORD, {
        state: { message: errorsKeys.resetSessionExpired },
        replace: true,
      });
    }

    const payload = {
      email: email,
      otpCode: code,
    };

    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.VERIFY_PASSWORD,
      payload,
    );

    if (response.data?.succeeded) {
      // Extract reset token from response
      const { token, expiresAt } = response.data.data;

      // Save reset token with expiration
      saveResetToken(token, expiresAt);

      // Clear reset email from storage
      clearResetEmail();

      // Delete CSRF token (security measure)
      deleteCsrfToken();

      // Redirect to reset password page
      return redirect(ROUTES.RESET_PASSWORD, { replace: true });
    }

    // ============================================
    // 5️⃣ HANDLE BACKEND ERROR RESPONSE
    // ============================================

    return response.data;
  } catch (err) {
    // ============================================
    // 6️⃣ HANDLE NETWORK/SYSTEM ERRORS
    // ============================================
    const normalizedError = normalizeError(err);

    // Special handling for invalid/expired code error
    let finalMessage = normalizedError.message;
    if (
      normalizedError.isMessageKey &&
      normalizedError.message === errorsKeys.badRequest
    ) {
      // Replace generic "bad request" with specific "invalid code" message
      finalMessage = validationKeys.invalidOrExpiredCode;
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

export default VerifyResetCodeAction;
