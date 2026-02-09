import { redirect } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { flashMessageType } from "../utils/constants";
import { ROUTES } from "../routes/paths";
import { AUTH_ENDPOINTS } from "../api/endpoints/endpoints";
import { validationKeys, errorsKeys, authKeys } from "../utils/localeKeys";
import {
  clearVerificationEmail,
  getValidVerificationEmail,
  normalizeError,
} from "../utils/authUtils";
import { setFlashMessage } from "../utils/flashService";

/**
 * Verify Account Action
 *
 * Handles account verification after registration.
 * Sends both email and verification code to the server.
 *
 * @returns {Function} React Router action handler
 */
export const AccountVerificationAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const email = getValidVerificationEmail();
    if (!email) {
      setFlashMessage(errorsKeys.registerSessionExpired, flashMessageType.info);

      return redirect(ROUTES.SIGNUP);
    }

    const payload = {
      email: email,
      otpCode: data.code,
    };

    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.VERIFY_EMAIL,
      payload,
    );

    if (response.data?.succeeded) {
      clearVerificationEmail();
      setFlashMessage(authKeys.verificationSuccess, flashMessageType.success);

      return redirect(ROUTES.LOGIN, { replace: true });
    }

    return response.data;
  } catch (err) {
    const normalizedError = normalizeError(err);
    if (err.response?.status === 410) {
      const cooldownSeconds = err.response?.data?.meta?.cooldownSeconds || 180; // Default 3 minutes

      return {
        succeeded: false,
        isMessageKey: true,
        message: errorsKeys.verificationAttemptsExceeded,
        errors: [],
        validationErrors: {},
        meta: {
          cooldownSeconds,
          isLocked: true,
        },
      };
    }

    let finalMessage = normalizedError.message;
    if (
      normalizedError.isMessageKey &&
      normalizedError.message === errorsKeys.badRequest
    ) {
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
