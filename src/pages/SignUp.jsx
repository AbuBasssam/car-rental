import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { signupStyles } from "../utils/styles";
import AnimatedBackground from "../components/login/AnimatedBackground";
import BackButton from "../components/login/BackButton";
import SignupCard from "../components/signUp/SignupCard";
import { useActionData } from "react-router-dom";
import { showErrorToast } from "../config/toastConfig";

const SignUpPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // ✅ React Router hooks
  const actionData = useActionData(); //Get Errors from action

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (actionData) {
      // 1. Handle Server-side Errors or General Failures
      if (actionData.serverError) {
        // Translate the error key if it's a known error key from localeKeys
        showErrorToast(t(actionData.serverError));
      }

      // 2. Handle specific API validation errors array
      if (actionData.errors && Array.isArray(actionData.errors)) {
        actionData.errors.forEach((err) => showErrorToast(err));
      }

      // 3. Handle Field Validation Errors
      if (actionData.validationErrors) {
        const firstErrorKey = Object.keys(actionData.validationErrors)[0];
        const errorObj = actionData.validationErrors[firstErrorKey];
        if (errorObj) showTranslationError(errorObj);
      }
    }

    function showTranslationError(errorObj) {
      // Check if errorObj has params and field property
      if (errorObj.params && errorObj.params.field) {
        // Translate the field key
        const translatedFieldName = t(errorObj.params.field);

        // Create updated params object with translated field
        const updatedParams = {
          ...errorObj.params, // Spread all original params
          field: translatedFieldName, // Override field with translated value
        };

        showErrorToast(t(errorObj.key, updatedParams));
      } else if (errorObj.params) {
        // Has params but no field property
        showErrorToast(t(errorObj.key, errorObj.params));
      } else {
        // No params at all
        showErrorToast(t(errorObj.key));
      }
    }
  }, [actionData, t]);

  return (
    <div className={signupStyles.pageContainer}>
      <AnimatedBackground isActive={isActive} />
      <BackButton />
      <SignupCard
        isActive={isActive}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        onTogglePassword={togglePasswordVisibility}
        onToggleConfirmPassword={toggleConfirmPasswordVisibility}
      />
    </div>
  );
};

export default SignUpPage;
