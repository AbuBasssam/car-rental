import React from "react";
import logo from "../../assets/logo.svg";
import { loginStyles } from "../../utils/styles";

const LoginHeader = () => {
  return (
    <div className={loginStyles.loginCard.headerContainer}>
      <div className={loginStyles.loginCard.logoContainer}>
        <div className={loginStyles.loginCard.logoText}>
          <img
            src={logo}
            alt="logo"
            className="h-32 w-auto block"
            style={{
              display: "block",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
      <span className="text-2xl font-black text-premium-orange font-heading">
        Rento
      </span>
      <h2 className={loginStyles.loginCard.title}>PremiumDrive</h2>
      <p className={loginStyles.loginCard.subtitle}>
        LUXURY MOBILITY EXPERIENCE
      </p>
    </div>
  );
};
export default LoginHeader;
