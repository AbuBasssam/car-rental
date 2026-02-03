import { redirect } from "react-router-dom";
import { localeKeys } from "../utils/localeKeys";
import { ROUTES } from "../routes/paths";
import { AUTH_ENDPOINTS } from "../api/endpoints/endpoints";
import axiosInstance from "../api/axiosInstance";
import {
  normalizeError,
  deleteCsrfToken,
  saveVerificationEmail,
} from "../utils/authUtils";
import {
  validateEmail,
  validateStrongPassword,
  validateName,
  validatePasswordsMatch,
  validateTermsAcceptance,
} from "../utils/validators";

export const signUpAction = async ({ request }) => {
  const formData = await request.formData();

  const firstName = formData.get("firstName")?.trim() || "";
  const lastName = formData.get("lastName")?.trim() || "";
  const email = formData.get("email")?.trim() || "";
  const password = formData.get("password")?.trim() || "";
  const confirmPassword = formData.get("confirmPassword")?.trim() || "";
  const acceptedTerms = formData.get("acceptedTerms") === "on";

  const validationErrors = {};

  const firstNameError = validateName(firstName, localeKeys.firstName);
  if (firstNameError) validationErrors.firstName = firstNameError;

  const lastNameError = validateName(lastName, localeKeys.lastName);
  if (lastNameError) validationErrors.lastName = lastNameError;

  const emailError = validateEmail(email);
  if (emailError) validationErrors.email = emailError;

  const passwordError = validateStrongPassword(password);
  if (passwordError) validationErrors.password = passwordError;

  const confirmPasswordError = validatePasswordsMatch(
    password,
    confirmPassword,
  );
  if (confirmPasswordError) {
    validationErrors.confirmPassword = confirmPasswordError;
  }

  const termsError = validateTermsAcceptance(acceptedTerms);
  if (termsError) validationErrors.acceptedTerms = termsError;

  if (Object.keys(validationErrors).length > 0) {
    return {
      succeeded: false,
      message: "Please fix the validation errors",
      validationErrors,
    };
  }

  const registrationData = {
    firstName,
    lastName,
    email,
    password,
  };

  try {
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.SIGN_UP,
      registrationData,
    );

    if (response.data?.succeeded) {
      deleteCsrfToken();
      saveVerificationEmail(email);
      return redirect(ROUTES.VERIFY_ACCOUNT, { replace: true });
    }

    return response.data;
  } catch (error) {
    const normalizedError = normalizeError(error);

    return {
      succeeded: false,
      message: normalizedError.message,
      errors: normalizedError.errors || [],
      validationErrors: normalizedError.validationErrors,
    };
  }
};
