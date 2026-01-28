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

      // 3. Handle Field Validation Errors (If you want to show them as Toasts)
      // Note: Usually, validationErrors are shown under each input field,
      // but if you want to toast them:
      if (actionData.validationErrors) {
        const firstErrorKey = Object.keys(actionData.validationErrors)[0];
        const errorObj = actionData.validationErrors[firstErrorKey];

        if (errorObj) {
          showErrorToast(t(errorObj.key, errorObj.params));
        }
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
