import { redirect } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { keys } from "../utils/constants";
import { ROUTES } from "../routes/paths";
import { AUTH_ENDPOINTS } from "../api/endpoints/endpoints";
import { validateOTP } from "../utils/validators";
import { validationKeys } from "../utils/localeKeys";
import { clearVerificationEmail } from "../utils/authUtils";

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
      const validationError = validateOTP(data.code);
      if (validationError) {
        return { errorKey: validationError.key };
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
      const errorMessage =
        err.response?.data?.message || err.response?.data?.errors?.[0];

      return errorMessage
        ? { error: errorMessage }
        : { errorKey: validationKeys.invalidOrExpiredCode };
    });
};
