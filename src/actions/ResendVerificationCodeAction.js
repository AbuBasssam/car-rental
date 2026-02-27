import axiosInstance from "../api/axiosInstance";
import { handleApiError } from "../utils/authUtils";
import { AUTH_ENDPOINTS } from "../api/endpoints/endpoints";
import { localeKeys } from "../utils/localeKeys";

/**
 * Resend Verification Code Action
 *
 * Sends a new verification code to the user's email address.
 * All error handling is done here.
 *
 * @param {string} email - User's email address
 * @returns {Promise<{success: boolean, message?: string, error?: string}>} Result object
 */
export const resendVerificationCode = (email) => {
  return axiosInstance
    .post(AUTH_ENDPOINTS.RESEND_VERIFICATION, { email })
    .then((response) => {
      const isSuccess = response.data?.succeeded ?? false;

      return {
        success: isSuccess,
        message: isSuccess ? localeKeys.codeSentSuccess : "",
      };
    })
    .catch((error) => {
      const message = handleApiError(error);
      return { success: false, message: message };
    });
};
export default resendVerificationCode;
