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

/**
 * Login Action
 * Handles form submission using React Router's action
 */
export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  // Validate inputs
  const errors = {};

  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.password = passwordError;
  }

  // If validation errors exist, return them
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return axiosInstance
    .post(AUTH_ENDPOINTS.SIGN_IN, { email, password })
    .then((response) => {
      if (response.data?.succeeded && response.data?.data) {
        return Promise.resolve(response.data.data).then((userData) => {
          saveUserInfo(userData.fullName);

          deleteCsrfToken();

          return redirect(ROUTES.HOME, { replace: true });
        });
      }
      return response.data;
    })
    .catch((error) => {
      return handleApiError(error);
    });
};
