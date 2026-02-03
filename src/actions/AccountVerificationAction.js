import { redirect } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { keys } from "../utils/constants";
import { ROUTES } from "../routes/paths";
import { AUTH_ENDPOINTS } from "../api/endpoints/endpoints";
import { validateOTP } from "../utils/validators";
import { validationKeys, errorsKeys } from "../utils/localeKeys";
import { clearVerificationEmail, normalizeError } from "../utils/authUtils";

/**
 * Verify Account Action
 *
 * Handles account verification after registration.
 * Sends both email and verification code to the server.
 *
 * @returns {Function} React Router action handler
 */
export const AccountVerificationAction = async ({ request }) => {
  return request
    .formData()
    .then((formData) => Object.fromEntries(formData))
    .then((data) => {
      const validationErrors = {};
      const otpError = validateOTP(data.code);
      if (otpError) validationErrors.otp = otpError;
      if (Object.keys(validationErrors).length > 0) {
        return {
          succeeded: false,
          message: "Validation failed",
          validationError: validationErrors,
        };
      }
      const payload = {
        email: data.email,
        otpCode: data.code,
      };

      return axiosInstance.post(AUTH_ENDPOINTS.VERIFY_EMAIL, payload);
    })
    .then((response) => {
      if (response.data?.succeeded) {
        clearVerificationEmail();

        sessionStorage.setItem(keys.accountVerified, "true");

        return redirect(ROUTES.LOGIN, {
          replace: true,
        });
      }
    })
    .catch((err) => {
      const normalizedError = normalizeError(err);
      let finalMessage = normalizedError.message;
      if (
        normalizedError.isMessageKey &&
        normalizedError.message === errorsKeys.badRequest
      ) {
        finalMessage = validationKeys.invalidOrExpiredCode;
      }

      return {
        isMessageKey: normalizedError.isMessageKey,
        succeeded: false,
        message: finalMessage,
        errors: normalizedError.errors || [],
        validationErrors: normalizedError.validationErrors || {},
      };
    });
};
