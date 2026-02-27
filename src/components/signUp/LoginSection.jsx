import { signupStyles } from "../../utils/styles";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/paths";
import { useTranslation } from "react-i18next";
import localeKeys from "../../utils/localeKeys.js";

const LoginSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={signupStyles.signinSection}>
      <p className={signupStyles.signinText}>
        {t(localeKeys.alreadyHaveAccount)}
      </p>
      <button
        onClick={() => navigate(ROUTES.LOGIN)}
        className={signupStyles.signinButton}
      >
        {t(localeKeys.login)}
      </button>
    </div>
  );
};

export default LoginSection;
