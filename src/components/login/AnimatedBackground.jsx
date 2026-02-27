import React from "react";
import { loginStyles } from "../../utils/styles";

const AnimatedBackground = ({ isActive }) => {
  return (
    <div className={loginStyles.animatedBackground.base}>
      <div
        className={`${loginStyles.animatedBackground.orb1} ${isActive ? "translate-x-20 translate-y-10" : ""}`}
      />
      <div
        className={`${loginStyles.animatedBackground.orb2} ${isActive ? "-translate-x-20 -translate-y-10" : ""}`}
      />
      <div
        className={`${loginStyles.animatedBackground.orb3} ${isActive ? "-translate-x-10 translate-y-20" : ""}`}
      />
    </div>
  );
};
export default AnimatedBackground;
