import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa";

import FormInput from "../../layouts/FormInput.jsx";
import PasswordInput from "../../layouts/PasswordInput.jsx";
import { ForgotPasswordLink } from "./ForgotPasswordLink.jsx";
import FullWidthButton from "../../layouts/FullWidthButton";
import localeKeys from "../../utils/localeKeys.js";

const LoginForm = ({ showPassword, onTogglePassword }) => {
  const { t } = useTranslation();

  return (
    <>
      <FormInput
        FieldIcon={FaUser}
        name="email"
        placeholder={t(localeKeys.enterYourEmail)}
        dir="ltr"
      />

      <div>
        <PasswordInput
          name="password"
          showPassword={showPassword}
          onTogglePassword={onTogglePassword}
          placeholder={t(localeKeys.enterYourPassword)}
          dir="ltr"
        />
        <ForgotPasswordLink />
      </div>

      <FullWidthButton type="submit">{t(localeKeys.login)}</FullWidthButton>
    </>
  );
};

export default LoginForm;
