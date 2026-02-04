import React from "react";
import { loginStyles } from "../utils/styles.js";
const FormInput = ({
  FieldIcon,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  ...props
}) => {
  const Icon = FieldIcon;
  return (
    <div className={loginStyles.form.inputContainer}>
      <div className={loginStyles.form.inputWrapper}>
        <div className={loginStyles.form.inputIcon} aria-hidden="true">
          <Icon />
        </div>
        <input
          type={type}
          name={name}
          defaultValue={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={loginStyles.form.input}
          {...props}
        />
      </div>
    </div>
  );
};
export default FormInput;
