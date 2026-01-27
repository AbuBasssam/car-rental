import React from "react";
import { signupStyles } from "../../utils/styles";
import LoginSection from "./LoginSection";
import SignupForm from "./SignupForm";
import SignupHeader from "./SignUpHeader";

const SignupCard = ({
  isActive,
  formData,
  showPassword,
  showConfirmPassword,
  onSubmit,
  onChange,
  onTogglePassword,
  onToggleConfirmPassword,
}) => {
  return (
    <div
      className={`${signupStyles.signupCard.container} ${isActive ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
    >
      <div className={signupStyles.signupCard.card}>
        <div className={signupStyles.signupCard.decor1} />
        <div className={signupStyles.signupCard.decor2} />

        <SignupHeader />

        <SignupForm
          formData={formData}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          onSubmit={onSubmit}
          onChange={onChange}
          onTogglePassword={onTogglePassword}
          onToggleConfirmPassword={onToggleConfirmPassword}
        />

        <LoginSection />
      </div>
    </div>
  );
};

export default SignupCard;
