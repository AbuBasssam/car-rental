import React, { useState, useEffect } from "react";
import { loginStyles } from "../utils/styles";
import AnimatedBackground from "../components/Login/AnimatedBackground";
import BackButton from "../components/Login/BackButton";
import LoginCard from "../components/Login/LoginCard";
import RoundedThemeToggle from "../utils/RoundedThemeToggle";
import { useActionData } from "react-router-dom";
import { showErrorToast } from "../config/toastConfig";

const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
