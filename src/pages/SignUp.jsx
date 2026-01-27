import React, { useState, useEffect } from "react";
import { signupStyles } from "../utils/styles";
import { useSignupForm } from "../hooks/useSignupForm";
import AnimatedBackground from "../components/login/AnimatedBackground";
import BackButton from "../components/login/BackButton";
import SignupCard from "../components/signUp/SignupCard";

const SignUpPage = () => {
  const [isActive, setIsActive] = useState(false);
  const {
    formData,
    showPassword,
    showConfirmPassword,
    handleChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleSubmit,
  } = useSignupForm();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={signupStyles.pageContainer}>
      <AnimatedBackground isActive={isActive} />
      <BackButton />
      <SignupCard
        isActive={isActive}
        formData={formData}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onTogglePassword={togglePasswordVisibility}
        onToggleConfirmPassword={toggleConfirmPasswordVisibility}
      />
    </div>
  );
};

export default SignUpPage;
