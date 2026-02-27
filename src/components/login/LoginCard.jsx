import React from "react";
import { loginStyles } from "../../utils/styles";
import SignupSection from "./SignupSection";
import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";
import { Form } from "react-router-dom";

const LoginCard = ({ isActive, showPassword, onTogglePassword }) => {
  return (
    <div
      className={`${loginStyles.loginCard.container} ${isActive ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
    >
      <div className={loginStyles.loginCard.card}>
        <div className={loginStyles.loginCard.decor1} />
        <div className={loginStyles.loginCard.decor2} />

        <LoginHeader />

        <Form method="post" className={loginStyles.form.container}>
          <LoginForm
            showPassword={showPassword}
            onTogglePassword={onTogglePassword}
          />
        </Form>

        <SignupSection />
      </div>
    </div>
  );
};
export default LoginCard;
