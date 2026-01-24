import { redirect } from "react-router-dom";
import { signIn } from "../services/authService";
import { saveUserInfo } from "../utils//authUtils";
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

  try {
    // Call API
    const response = await signIn({ email, password });

    // Check if login was successful
    if (response.succeeded && response.data) {
      // Save user info (fullName only, tokens are in cookies)
      saveUserInfo(response.data.fullName);

      // Redirect to dashboard
      return redirect(ROUTES.HOME);
    } else {
      // API returned error
      return {
        errors: {
          general: response.message || "Invalid email or password",
        },
      };
    }
  } catch (error) {
    console.error("Login error:", error);

    // Network or API error
    return {
      errors: {
        general:
          error.message ||
          "Network error. Please check your connection and try again.",
      },
    };
  }
};
