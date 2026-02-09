import { redirect } from "react-router-dom";
import { AUTH_ENDPOINTS } from "../api/endpoints/endpoints";
import axiosInstance from "../api/axiosInstance";
import {
  deleteCsrfToken,
  getValidVerificationEmail,
  normalizeError,
} from "../utils/authUtils";
import { validateEmail, validatePassword } from "../utils/validators";
import { ROUTES } from "../routes/paths";
import { updateAuthCache } from "../loaders/Rootloader"; // أضف هذا

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const validationErrors = {};

  const emailError = validateEmail(email);
  if (emailError) validationErrors.email = emailError;

  const passwordError = validatePassword(password);
  if (passwordError) validationErrors.password = passwordError;

  if (Object.keys(validationErrors).length > 0) {
    return {
      succeeded: false,
      message: "Validation failed",
      validationErrors,
    };
  }

  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.SIGN_IN, {
      email: email.trim(),
      password,
    });

    if (response.data?.succeeded) {
      const userData = response.data.data;

      deleteCsrfToken();
      updateAuthCache({
        user: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: email,
          imagePath: userData.imagePath || null,
          fullName: `${userData.firstName} ${userData.lastName}`.trim(),
        },
        isAuthenticated: true,
      });

      return redirect(ROUTES.HOME, { replace: true });
    }

    return response.data;
  } catch (error) {
    const verificationEmail = getValidVerificationEmail();
    if (verificationEmail && verificationEmail === email) {
      try {
        await axiosInstance.post(AUTH_ENDPOINTS.RESEND_VERIFICATION, { email });
        return redirect(ROUTES.VERIFY_ACCOUNT, { replace: true });
      } catch {
        // Continue with normal error handling
      }
    }

    const normalizedError = normalizeError(error);

    return {
      isMessageKey: normalizedError.isMessageKey,
      succeeded: false,
      message: normalizedError.message,
      errors: normalizedError.errors || [],
      validationErrors: normalizedError.validationErrors || {},
    };
  }
};
