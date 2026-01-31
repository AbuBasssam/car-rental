import { redirect } from "react-router-dom";
import { AUTH_ENDPOINTS } from "../api/endpoints/endpoints";
import axiosInstance from "../api/axiosInstance";
import {
  handleApiError,
  deleteCsrfToken,
  saveUserInfo,
} from "../utils/authUtils";

import { validateEmail, validatePassword } from "../utils/validators";
import { ROUTES } from "../routes/paths";
import { getValidVerificationEmail } from "../utils/authUtils";

/**
 * Login Action
 * Handles form submission using React Router's action
 */
export const loginAction = ({ request }) => {
  let email;
  return request
    .formData()
    .then((formData) => {
      email = formData.get("email");
      const password = formData.get("password");

      const errors = {};

      const emailError = validateEmail(email);
      if (emailError) errors.email = emailError;

      const passwordError = validatePassword(password);
      if (passwordError) errors.password = passwordError;

      if (Object.keys(errors).length > 0) {
        return Promise.reject({ type: "validation", errors });
      }

      return { email, password };
    })
    .then(({ email, password }) =>
      axiosInstance
        .post(AUTH_ENDPOINTS.SIGN_IN, { email, password })
        .then((response) => ({ response, email })),
    )
    .then(({ response }) => {
      if (response.data?.succeeded && response.data?.data) {
        const userData = response.data.data;

        saveUserInfo(userData.fullName);
        deleteCsrfToken();

        return redirect(ROUTES.HOME, { replace: true });
      }

      return response.data;
    })
    .catch((error) => {
      const verificationEmail = getValidVerificationEmail();
      if (verificationEmail && verificationEmail === email) {
        return axiosInstance
          .post(AUTH_ENDPOINTS.RESEND_VERIFICATION, { email })
          .then(() => redirect(ROUTES.VERIFY_ACCOUNT, { replace: true }));
      }
      return handleApiError(error);
    });
};
