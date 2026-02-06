import axiosInstance from "../api/axiosInstance";
import { handleApiError } from "../utils/authUtils";
import { AUTH_ENDPOINTS } from "../api/endpoints/endpoints";
import { localeKeys } from "../utils/localeKeys";

/**
 * Resend Reset Code Action
 *
 * Sends a new password reset verification code to the user's email
 *
 * @param {string} email - User's email address
 * @returns {Promise<Object>} Result object with success status and message
 *
 * @example
 * resendResetCode("user@example.com")
 *   .then(result => {
 *     if (result.success) {
 *       console.log("Code sent successfully");
 *     }
 *   });
 */
const ResendResetCodeAction = (email) => {
  // Validate email parameter
  if (!email) {
    return Promise.resolve({
      success: false,
      message: "Email is required",
    });
  }

  return axiosInstance
    .post(AUTH_ENDPOINTS.RESEND_PASSWORD_RESET, { email })
    .then((response) => {
      const isSuccess = response.data?.succeeded ?? false;

      return {
        success: isSuccess,
        message: isSuccess
          ? localeKeys.codeSentSuccess
          : response.data?.message || "Failed to send code",
      };
    })
    .catch((error) => {
      const message = handleApiError(error);
      return {
        success: false,
        message: message,
      };
    });
};

export default ResendResetCodeAction;
