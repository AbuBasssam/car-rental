import { useTranslation } from "react-i18next";
import { loginStyles } from "../../utils/styles";
import { ROUTES } from "../../routes/paths";
import localeKeys from "../../utils/localeKeys.js";

export const ForgotPasswordLink = () => {
  const { t } = useTranslation();

  return (
    <a
      href={ROUTES.FORGOT_PASSWORD}
      className={loginStyles.form.forgotPassword}
      alt={t(localeKeys.forgotPassword)}
    >
      {t(localeKeys.forgotPassword)}
    </a>
  );
};

export default ForgotPasswordLink;
