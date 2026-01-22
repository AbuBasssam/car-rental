import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { loginStyles } from "../../utils/styles";
import { ROUTES } from "../../routes/paths";

const BackButton = () => {
  return (
    <a href={ROUTES.HOME} className={loginStyles.backButton}>
      <FaArrowLeft className="text-sm font-medium" />
      <span className="text-sm font-medium">Back to Home</span>
    </a>
  );
};
export default BackButton;
