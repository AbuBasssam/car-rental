import { useTranslation } from "react-i18next";
import PrimaryButton from "../../layouts/primaryButton.jsx";
import { ROUTES } from "../../routes/paths.js";
import localeKeys from "../../utils/localeKeys.js";

const AuthButtons = ({ isMobile = false, onLogin }) => {
  const { t } = useTranslation();
  const btnRegisterStyle = `inline-flex items-center justify-center
        px-6 py-2
        rounded-lg
        text-base font-semibold
        bg-orange-500 text-white
        transition-all duration-200
        hover:bg-orange-600
        dark:hover:bg-neon-orange
        hover:-translate-y-0.5
        hover:shadow-lg hover:shadow-orange-500/30
        active:translate-y-0`;

  if (isMobile) {
    return (
      <>
        <a
          href={ROUTES.LOGIN}
          className="font-heading interactive-text transition"
          onClick={onLogin}
        >
          {t(localeKeys.login)}
        </a>
        <a
          href={ROUTES.SIGNUP}
          className="font-heading interactive-text transition"
        >
          {t(localeKeys.register)}
        </a>
      </>
    );
  }

  // Desktop view
  return (
    <>
      <a
        href={ROUTES.LOGIN}
        className="font-heading text-eerie-black interactive-text transition"
        onClick={onLogin}
      >
        {t(localeKeys.login)}
      </a>
      <a href={ROUTES.SIGNUP} className={btnRegisterStyle}>
        {t(localeKeys.register)}
      </a>
    </>
  );
};
export default AuthButtons;
