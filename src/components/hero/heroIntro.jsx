import { useTranslation } from "react-i18next";
import localeKeys from "../../utils/localeKeys.js";

const HeroIntro = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2
        className="text-premium-orange font-semibold text-sm tracking-widest uppercase mt-5"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {t(localeKeys.findYourPerfectRide)}
      </h2>
      <h3
        className="text-4xl font-extrabold leading-tight text-gray-900 dark:text-gray-100"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {t(localeKeys.rentTheBestQuality)}{" "}
        <span className="text-premium-orange">{t(localeKeys.cars)} </span>
        {t(localeKeys.withUs)}
      </h3>
      <p
        className="text-gray-600 dark:text-gray-400 max-w-xl"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        {t(localeKeys.heroDescription)}
      </p>
    </>
  );
};
export default HeroIntro;
