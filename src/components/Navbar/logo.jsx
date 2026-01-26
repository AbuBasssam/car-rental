import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.svg";
import localeKeys from "../../utils/localeKeys.js";

const Logo = () => {
  const { t } = useTranslation();

  return (
    <div className="header-spacing flex items-center justify-center gap-2 sm:gap-3">
      <img
        src={logo}
        alt={t(localeKeys.rentoLogo)}
        className="h-auto w-28 md:w-32 lg:w-36 object-contain"
      />

      <h1 className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-premium-orange">
        {t(localeKeys.appName)}
      </h1>
    </div>
  );
};
export default Logo;
