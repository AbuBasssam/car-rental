import React, { useState, useEffect } from "react";
import { loginStyles } from "../utils/styles";
import AnimatedBackground from "../components/login/AnimatedBackground";
import BackButton from "../components/login/BackButton";
import LoginCard from "../components/login/LoginCard";
import RoundedThemeToggle from "../utils/RoundedThemeToggle";
import { useActionData } from "react-router-dom";
import { showErrorToast } from "../config/toastConfig";
import useVerificationSuccessToast from "../hooks/useVerificationSuccessToast";

const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useVerificationSuccessToast();

  // ✅ React Router hooks
  const actionData = useActionData(); //Get Errors from action

  // ✅ Loading state
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (actionData?.errors) {
      const { general, email, password } = actionData.errors;

      if (general) {
        showErrorToast(general);
      }

      if (email) {
        showErrorToast(email);
      }

      if (password) {
        showErrorToast(password);
      }
    }
  }, [actionData]);

  return (
    <div className={loginStyles.pageContainer}>
      <AnimatedBackground isActive={isActive} />
      <BackButton />
      <RoundedThemeToggle />
      <LoginCard
        isActive={isActive}
        showPassword={showPassword}
        onTogglePassword={togglePasswordVisibility}
      />
    </div>
  );
};

export default Login;
