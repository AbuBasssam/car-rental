import React, { useState, useEffect } from "react";
import { loginStyles } from "../utils/styles";
import AnimatedBackground from "../components/login/AnimatedBackground";
import BackButton from "../components/login/BackButton";
import LoginCard from "../components/login/LoginCard";
import RoundedThemeToggle from "../utils/RoundedThemeToggle";
import { useActionData } from "react-router-dom";
import useFlashMessage from "../hooks/useFlashMessage";

import useActionToast from "../hooks/useActionToast";
const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Show message from previous redirect if exists (handle auth session expired)
  useFlashMessage();

  // ✅ React Router hooks
  const actionData = useActionData(); //Get Errors from action

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useActionToast(actionData);

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
