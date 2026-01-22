import React from "react";
import { loginStyles } from "../../utils/styles";

import { FaUser } from "react-icons/fa";

import FormInput from "../../layouts/FormInput.jsx";
import PasswordInput from "../../layouts/PasswordInput.jsx";
import { ForgotPasswordLink } from "./ForgotPasswordLink.jsx";

import FullWidthButton from "../../layouts/FullWidthButton";

const LoginForm = ({
  credentials,
  showPassword,
  onSubmit,
  onChange,
  onTogglePassword,
}) => {
  return (
    <form onSubmit={onSubmit} className={loginStyles.form.container}>
      <FormInput
        FieldIcon={FaUser}
        type="email"
        name="email"
        value={credentials.email}
        onChange={onChange}
        placeholder="Enter your email"
        required
      />

      <div>
        <PasswordInput
          value={credentials.password}
          onChange={onChange}
          showPassword={showPassword}
          onTogglePassword={onTogglePassword}
        />
        <ForgotPasswordLink />
      </div>

      <FullWidthButton type="submit">Login</FullWidthButton>
    </form>
  );
};
export default LoginForm;
