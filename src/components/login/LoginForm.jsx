import React from "react";

import { FaUser } from "react-icons/fa";

import FormInput from "../../layouts/FormInput.jsx";
import PasswordInput from "../../layouts/PasswordInput.jsx";
import { ForgotPasswordLink } from "./ForgotPasswordLink.jsx";

import FullWidthButton from "../../layouts/FullWidthButton";

const LoginForm = ({ showPassword, onTogglePassword }) => {
  return (
    <>
      <FormInput
        FieldIcon={FaUser}
        type="email"
        name="email"
        placeholder="Enter your email"
        required
      />

      <div>
        <PasswordInput
          showPassword={showPassword}
          onTogglePassword={onTogglePassword}
        />
        <ForgotPasswordLink />
      </div>

      <FullWidthButton type="submit">Login</FullWidthButton>
    </>
  );
};
export default LoginForm;
