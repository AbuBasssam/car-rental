import { useTranslation } from "react-i18next";
import { heroStyles } from "../../utils/styles";
import { heroKeys } from "../../utils/localeKeys";

const HeroIntro = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2
        className={heroStyles.intro.subtitle}
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {t(heroKeys.findYourPerfectRide)}
      </h2>
      <h3
        className={heroStyles.intro.title}
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {t(heroKeys.rentTheBestQuality)}{" "}
        <span className={heroStyles.intro.titleHighlight}>
          {t(heroKeys.cars)}{" "}
        </span>
        {t(heroKeys.withUs)}
      </h3>
      <p
        className={heroStyles.intro.description}
        data-aos="fade-up"
        data-aos-delay="300"
      >
        {t(heroKeys.description)}
      </p>
    </>
  );
};
export default HeroIntro;
