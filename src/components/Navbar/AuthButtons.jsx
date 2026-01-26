import { useTranslation } from "react-i18next";
import PrimaryButton from "../../layouts/primaryButton.jsx";
import { ROUTES } from "../../routes/paths.js";
import localeKeys from "../../utils/localeKeys.js";

const AuthButtons = ({ isMobile = false, onLogin }) => {
  const { t } = useTranslation();

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
      <PrimaryButton type="button" onClick={() => console.log("Hello")}>
        {t(localeKeys.register)}
      </PrimaryButton>
    </>
  );
};
export default AuthButtons;
