import React from "react";
import { loginStyles } from "../../utils/styles";
import SignupSection from "./SignupSection";
import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";

const LoginCard = ({
  isActive,
  credentials,
  showPassword,
  onSubmit,
  onChange,
  onTogglePassword,
}) => {
  return (
    <div
      className={`${loginStyles.loginCard.container} ${isActive ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
    >
      <div className={loginStyles.loginCard.card}>
        <div className={loginStyles.loginCard.decor1} />
        <div className={loginStyles.loginCard.decor2} />

        <LoginHeader />

        <LoginForm
          credentials={credentials}
          showPassword={showPassword}
          onSubmit={onSubmit}
          onChange={onChange}
          onTogglePassword={onTogglePassword}
        />

        <SignupSection />
      </div>
    </div>
  );
};
export default LoginCard;
