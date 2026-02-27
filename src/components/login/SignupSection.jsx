import { useTranslation } from "react-i18next";
import { loginStyles } from "../../utils/styles";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/paths.js";
import localeKeys from "../../utils/localeKeys.js";

const SignupSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={loginStyles.signupSection}>
      <p className={loginStyles.signupText}>{t(localeKeys.dontHaveAccount)}</p>
      <button
        onClick={() => navigate(ROUTES.SIGNUP)}
        className={loginStyles.signupButton}
      >
        {t(localeKeys.createAccount)}
      </button>
    </div>
  );
};
export default SignupSection;
