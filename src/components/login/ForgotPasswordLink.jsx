import React from "react";
import { loginStyles } from "../../utils/styles";
import { ROUTES } from "../../routes/paths";

export const ForgotPasswordLink = () => {
  return (
    <a
      href={ROUTES.FORGOT_PASSWORD}
      className={loginStyles.form.forgotPassword}
      alt="Forgot Password"
    >
      Forgot Password?
    </a>
  );
};
export default ForgotPasswordLink;
