import React, { useState, useEffect } from "react";
import { loginStyles } from "../utils/styles";
import { useLoginForm } from "../hooks/useLoginForm";
import AnimatedBackground from "../components/Login/AnimatedBackground";
import BackButton from "../components/Login/BackButton";
import LoginCard from "../components/Login/LoginCard";
import RoundedThemeToggle from "../utils/RoundedThemeToggle";

const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const {
    credentials,
    showPassword,
    handleChange,
    togglePasswordVisibility,
    handleSubmit,
  } = useLoginForm();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={loginStyles.pageContainer}>
      <AnimatedBackground isActive={isActive} />
      <BackButton />
      <RoundedThemeToggle />
      <LoginCard
        isActive={isActive}
        credentials={credentials}
        showPassword={showPassword}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onTogglePassword={togglePasswordVisibility}
      />
    </div>
  );
};

export default Login;
