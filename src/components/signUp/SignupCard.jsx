import React from "react";
import { signupStyles } from "../../utils/styles";
import LoginSection from "./LoginSection";
import SignupForm from "./SignupForm";
import SignupHeader from "./SignUpHeader";
import { Form } from "react-router-dom";

const SignupCard = ({
  isActive,
  showPassword,
  showConfirmPassword,
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

        <Form method="post" className={signupStyles.form.container}>
          <SignupForm
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            onTogglePassword={onTogglePassword}
            onToggleConfirmPassword={onToggleConfirmPassword}
          />
        </Form>

        <LoginSection />
      </div>
    </div>
  );
};

export default SignupCard;
