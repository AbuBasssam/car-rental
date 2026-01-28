import { redirect } from "react-router-dom";
import { registerUser } from "../api/endpoints/auth";
import { localeKeys, validationKeys, errorsKeys } from "../utils/localeKeys";
import { ROUTES } from "../routes/paths";
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

  const firstName = formData.get("firstName");

  const lastName = formData.get("lastName");

  const email = formData.get("email");

  const password = formData.get("password");

  const confirmPassword = formData.get("confirmPassword");

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

    // الموافقة على الشروط
    const termsError = validateTermsAcceptance(acceptedTerms === "on");
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
  try {
    const registrationData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password: password,
    };

    const response = await registerUser(registrationData);

    if (response.data.succeeded) {
      return redirect(ROUTES.VERIFY + `?email=${encodeURIComponent(email)}`);
    } else {
      // Handle server-side errors (e.g., 'Email already exists')
      return {
        serverError:
          response.data?.message || validationKeys.registrationFailed,
        errors: response.data?.errors || [],
      };
    }
  } catch (err) {
    /**
     * IMPORTANT: We cannot use handleApiError here because:
     * 1. Actions run on server-side (no hooks allowed)
     * 2. No access to useTranslation()
     *
     * Instead, we return error keys for the component to translate
     */
    let errorKey = errorsKeys.unexpectedError;

    // Determine error type
    if (err.request && !err.response) {
      // Network error
      errorKey = errorsKeys.networkError;
    } else if (err.response) {
      // HTTP error
      const status = err.response.status;

      if (status === 409) {
        errorKey = errorsKeys.conflict;
      } else if (status === 400) {
        errorKey = errorsKeys.badRequest;
      } else if (status >= 500) {
        errorKey = errorsKeys.serverError;
      }
    }

    return {
      serverError: errorKey,
      isNetworkError: err.request && !err.response,
    };
  }
};
