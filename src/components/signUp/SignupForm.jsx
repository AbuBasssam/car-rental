import React from "react";
import { signupStyles } from "../../utils/styles";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import FormInput from "../../layouts/FormInput";
import PasswordInput from "../../layouts/PasswordInput";
import TermsCheckbox from "./TermsCheckbox";
import FullWidthButton from "../../layouts/FullWidthButton";
import { useTranslation } from "react-i18next";
import localeKeys from "../../utils/localeKeys.js";

const SignupForm = ({
  formData,
  showPassword,
  showConfirmPassword,
  onSubmit,
  onChange,
  onTogglePassword,
  onToggleConfirmPassword,
}) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit} className={signupStyles.form.container}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <FormInput
          FieldIcon={FaUser}
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
          placeholder={t(localeKeys.firstName)}
          required
        />

        <FormInput
          FieldIcon={FaUserCircle}
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
          placeholder={t(localeKeys.lastName)}
          required
        />
      </div>

      <FormInput
        FieldIcon={MdEmail}
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        placeholder={t(localeKeys.enterYourEmail)}
        required
      />

      <PasswordInput
        name="password"
        value={formData.password}
        onChange={onChange}
        showPassword={showPassword}
        onTogglePassword={onTogglePassword}
        placeholder={t(localeKeys.createPassword)}
      />

      <PasswordInput
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={onChange}
        showPassword={showConfirmPassword}
        onTogglePassword={onToggleConfirmPassword}
        placeholder={t(localeKeys.confirmPassword)}
      />

      <TermsCheckbox checked={formData.acceptedTerms} onChange={onChange} />

      <FullWidthButton type="submit">
        {t(localeKeys.createAccount)}
      </FullWidthButton>
    </form>
  );
};

export default SignupForm;
