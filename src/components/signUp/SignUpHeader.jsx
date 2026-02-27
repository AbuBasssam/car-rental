import logo from "../../assets/logo.svg";
import { arabicTextAdjustment, signupStyles } from "../../utils/styles";
import { useTranslation } from "react-i18next";
import localeKeys from "../../utils/localeKeys.js";
import { keys } from "../../utils/constants.js";
const SignupHeader = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === keys.kAR;
  return (
    <div className={signupStyles.signupCard.headerContainer}>
      <div className={signupStyles.signupCard.logoContainer}>
        <div className={signupStyles.signupCard.logoText}>
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
      <h2
        className={signupStyles.signupCard.title}
        style={isArabic ? arabicTextAdjustment : {}}
      >
        {t(localeKeys.joinPremiumDrive)}
      </h2>
      <p className={signupStyles.signupCard.subtitle}>
        {t(localeKeys.createExclusiveAccount)}
      </p>
    </div>
  );
};

export default SignupHeader;
