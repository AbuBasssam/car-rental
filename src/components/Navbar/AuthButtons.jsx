import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/paths.js";
import localeKeys from "../../utils/localeKeys.js";

/**
 * AuthButtons Component
 *
 * Displays Login and Register buttons for unauthenticated users
 * Uses React Router <Link> instead of <a> for client-side navigation
 *
 * @param {boolean} isMobile - Whether to render mobile or desktop version
 */
const AuthButtons = ({ isMobile }) => {
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
        <Link
          to={ROUTES.LOGIN}
          className="font-heading interactive-text transition"
        >
          {t(localeKeys.login)}
        </Link>
        <Link
          to={ROUTES.SIGNUP}
          className="font-heading interactive-text transition"
        >
          {t(localeKeys.register)}
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        to={ROUTES.LOGIN}
        className="font-heading text-eerie-black interactive-text transition"
      >
        {t(localeKeys.login)}
      </Link>
      <Link to={ROUTES.SIGNUP} className={btnRegisterStyle}>
        {t(localeKeys.register)}
      </Link>
    </>
  );
};
export default AuthButtons;
