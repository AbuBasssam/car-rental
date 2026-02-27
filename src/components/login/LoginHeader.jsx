import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.svg";
import { loginStyles } from "../../utils/styles";
import localeKeys from "../../utils/localeKeys.js";

const LoginHeader = () => {
  const { t } = useTranslation();

  return (
    <div className={loginStyles.loginCard.headerContainer}>
      <div className={loginStyles.loginCard.logoContainer}>
        <div className={loginStyles.loginCard.logoText}>
          <img
            src={logo}
            alt={t(localeKeys.rentoLogo)}
            className="h-32 w-auto block"
            style={{
              display: "block",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
      <span className="text-2xl font-black text-premium-orange font-heading">
        {t(localeKeys.appName)}
      </span>
      <h2 className={loginStyles.loginCard.title}>
        {t(localeKeys.premiumDrive)}
      </h2>
      <p className={loginStyles.loginCard.subtitle}>
        {t(localeKeys.luxuryMobilityExperience)}
      </p>
    </div>
  );
};

export default LoginHeader;
