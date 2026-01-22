import React from "react";
import { loginStyles } from "../../utils/styles";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/paths.js";

const SignupSection = () => {
  const navigate = useNavigate();

  return (
    <div className={loginStyles.signupSection}>
      <p className={loginStyles.signupText}>Don't have an account yet?</p>
      <button
        onClick={() => navigate(ROUTES.SIGNUP)}
        className={loginStyles.signupButton}
      >
        Create Account
      </button>
    </div>
  );
};
export default SignupSection;
