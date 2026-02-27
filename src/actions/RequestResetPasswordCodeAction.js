import { redirect } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { ROUTES } from "../routes/paths";
import { AUTH_ENDPOINTS } from "../api/endpoints/endpoints";
import { validationKeys } from "../utils/localeKeys";
import { validateEmail } from "../utils/validators";
import {
  normalizeError,
  deleteCsrfToken,
  saveResetEmail,
} from "../utils/authUtils";

/**
 * RequestResetPasswordCodeAction
 *
 * Handles the forgot password request - sends verification code to user's email
 *
 * Flow:
 * 1. Validate email input
 * 2. Send request to backend
 * 3. On success: Save email to sessionStorage and redirect to verify-reset page
 * 4. On error: Return error message to display in form
 *
 * @param {Object} params - React Router action params
 * @param {Request} params.request - The form request object
 * @returns {Promise<Object|Response>} Validation errors or redirect response
 */
const RequestResetPasswordCodeAction = async ({ request }) => {
  try {
    // ============================================
    // 1️⃣ EXTRACT FORM DATA
    // ============================================
    const formData = await request.formData();
    const email = formData.get("email")?.trim() || "";

    // ============================================
    // 2️⃣ VALIDATE INPUT
    // ============================================
    const validationErrors = {};
    const emailError = validateEmail(email);

    if (emailError) {
      validationErrors.email = emailError;
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
    // 3️⃣ PREPARE API REQUEST
    // ============================================
    const payload = {
      email: email,
    };

    // ============================================
    // 4️⃣ SEND REQUEST TO BACKEND
    // ============================================
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.FORGOT_PASSWORD,
      payload,
    );

    // ============================================
    // 5️⃣ HANDLE SUCCESS
    // ============================================
    if (response.data?.succeeded) {
      // Clear any existing CSRF token
      deleteCsrfToken();

      // Save email to sessionStorage for verification page
      saveResetEmail(email);

      // Redirect to verification page
      return redirect(ROUTES.VERIFY_RESET);
    }

    // ============================================
    // 6️⃣ HANDLE BACKEND ERROR RESPONSE
    // ============================================
    return response.data;
  } catch (err) {
    // ============================================
    // 7️⃣ HANDLE NETWORK/SYSTEM ERRORS
    // ============================================
    const normalizedError = normalizeError(err);

    return {
      succeeded: false,
      isMessageKey: normalizedError.isMessageKey,
      message: normalizedError.message,
      errors: normalizedError.errors || [],
      validationErrors: normalizedError.validationErrors || {},
    };
  }
};

export default RequestResetPasswordCodeAction;
