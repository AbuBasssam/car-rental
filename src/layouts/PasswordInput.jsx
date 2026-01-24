import React from "react";
import { loginStyles } from "../utils/styles";
import { FaLock, FaEyeSlash, FaEye } from "react-icons/fa";

const PasswordInput = ({
  value,
  onChange,
  showPassword,
  onTogglePassword,
  placeholder = "Enter your password",
  required = false,
  ...props
}) => {
  return (
    <div className={loginStyles.form.inputContainer}>
      <div className={loginStyles.form.inputWrapper}>
        <div className={loginStyles.form.inputIcon}>
          <FaLock />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          defaultValue={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={loginStyles.form.input}
          {...props}
        />
        <div
          className={loginStyles.form.passwordToggle}
          onClick={onTogglePassword}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>
    </div>
  );
};
export default PasswordInput;
