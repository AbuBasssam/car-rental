import { useState, useEffect } from "react";
import { signupStyles } from "../utils/styles";
import AnimatedBackground from "../components/login/AnimatedBackground";
import BackButton from "../components/login/BackButton";
import SignupCard from "../components/signUp/SignupCard";
import { useActionData } from "react-router-dom";
import { useActionToast } from "../hooks/useActionToast";

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  useActionToast(actionData);

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
