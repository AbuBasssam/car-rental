import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
import { loginStyles } from "../../utils/styles";
import { ROUTES } from "../../routes/paths";
import localeKeys from "../../utils/localeKeys.js";

const BackButton = () => {
  const { t } = useTranslation();

  return (
    <a href={ROUTES.HOME} className={loginStyles.backButton}>
      <FaArrowLeft className="text-sm font-medium" />
      <span className="text-sm font-medium">{t(localeKeys.backToHome)}</span>
    </a>
  );
};
export default BackButton;
