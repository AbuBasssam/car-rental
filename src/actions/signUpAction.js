import { redirect } from "react-router-dom";
import { localeKeys } from "../utils/localeKeys";
import { ROUTES } from "../routes/paths";
import { AUTH_ENDPOINTS } from "../api/endpoints/endpoints";
import axiosInstance from "../api/axiosInstance";
import {
  handleApiError,
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

/**
 * Sign up Action
 * Handles form submission, performs data validation, and manages the registration API lifecycle.
 *
 * @param {Object} context - React Router's action context object.
 * @param {Request} context.request - The Fetch API Request object containing the form data.
 * @returns {Promise<Response|Object>} A redirect on success, or an object containing validation/server errors.
 */
export const signUpAction = async ({ request }) => {
  const formData = await request.formData();

  // Extract form fields (FormData API)

  const firstName = formData.get("firstName").trim();

  const lastName = formData.get("lastName").trim();

  const email = formData.get("email").trim();

  const password = formData.get("password").trim();

  const confirmPassword = formData.get("confirmPassword").trim();

  const acceptedTerms = formData.get("acceptedTerms") === "on";

  // ============================================
  // 1. Client-Side Validation
  // ============================================

  const validateForm = () => {
    const errors = {};

    const firstNameError = validateName(firstName, localeKeys.firstName);
    if (firstNameError) errors.firstName = firstNameError;

    const lastNameError = validateName(lastName, localeKeys.lastName);
    if (lastNameError) errors.lastName = lastNameError;

    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;

    const passwordValidation = validateStrongPassword(password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.error;
    }

    const confirmPasswordError = validatePasswordsMatch(
      password,
      confirmPassword,
    );
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

    // Accept terms & conditions
    const termsError = validateTermsAcceptance(acceptedTerms);
    if (termsError) errors.acceptedTerms = termsError;

    return errors;
  };

  const validationErrors = validateForm();

  // If validation fails, return errors immediately to be consumed via useActionData
  if (Object.keys(validationErrors).length > 0) {
    return { validationErrors };
  }

  // ============================================
  // 2. Registration API Call
  // ============================================
  const registrationData = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    password: password,
  };

  return axiosInstance
    .post(AUTH_ENDPOINTS.SIGN_UP, registrationData)
    .then((response) => {
      return Promise.resolve(response.data.data).then(() => {
        deleteCsrfToken();

        saveVerificationEmail(email);

        return redirect(ROUTES.VERIFY_ACCOUNT);
      });
    })
    .catch((error) => {
      return handleApiError(error);
    });
};
