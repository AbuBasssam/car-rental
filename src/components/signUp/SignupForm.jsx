import { React, useState } from "react";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import FormInput from "../../layouts/FormInput";
import PasswordInput from "../../layouts/PasswordInput";
import PasswordRequirements from "./PasswordRequirements";
import TermsCheckbox from "./TermsCheckbox";
import FullWidthButton from "../../layouts/FullWidthButton";
import { useTranslation } from "react-i18next";
import localeKeys from "../../utils/localeKeys.js";

const SignupForm = ({
  showPassword,
  showConfirmPassword,
  onTogglePassword,
  onToggleConfirmPassword,
}) => {
  const { t } = useTranslation();
  const [passwordValue, setPasswordValue] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <FormInput
          FieldIcon={FaUser}
          type="text"
          name="firstName"
          placeholder={t(localeKeys.firstName)}
        />

        <FormInput
          FieldIcon={FaUserCircle}
          type="text"
          name="lastName"
          placeholder={t(localeKeys.lastName)}
        />
      </div>

      <FormInput
        FieldIcon={MdEmail}
        name="email"
        placeholder={t(localeKeys.enterYourEmail)}
      />

      <PasswordInput
        name="password"
        showPassword={showPassword}
        onTogglePassword={onTogglePassword}
        placeholder={t(localeKeys.createPassword)}
        onChange={(e) => setPasswordValue(e.target.value)}
      />

      <PasswordInput
        name="confirmPassword"
        showPassword={showConfirmPassword}
        onTogglePassword={onToggleConfirmPassword}
        placeholder={t(localeKeys.confirmPassword)}
      />
      <PasswordRequirements password={passwordValue} />

      <TermsCheckbox
        onChange={(e) => setIsTermsAccepted(e.target.checked)}
        checked={isTermsAccepted}
      />

      <FullWidthButton type="submit">
        {t(localeKeys.createAccount)}
      </FullWidthButton>
    </>
  );
};

export default SignupForm;
