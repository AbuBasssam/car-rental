import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ScrollReveal from "scrollreveal";
import chooseImg from "../../assets/choose.png";

import FeatureCard from "./FeatureCard";
import Header from "../whyChooseUs/Header";
import { sectionStyles, whyChooseUsStyles } from "../../utils/styles";
import { whyChooseUsKeys } from "../../utils/localeKeys";

import {
  RiCustomerService2Line,
  RiPriceTag3Line,
  RiShieldCheckLine,
  RiSteering2Line,
} from "react-icons/ri";

const WhyChooseUs = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const sr = ScrollReveal({
      distance: "60px",
      duration: 1500,
      delay: 400,
      reset: false,
    });

    // استخدام الأسماء من ملف styles مباشرة
    sr.reveal(`.${whyChooseUsStyles.image.reveal}`, { origin: "left" });
    sr.reveal(`.${sectionStyles.revealHeader}`, { origin: "top", delay: 500 });
    sr.reveal(`.${sectionStyles.revealDescription}`, {
      origin: "top",
      delay: 700,
    });
    sr.reveal(`.${whyChooseUsStyles.card.reveal}`, {
      interval: 300,
      origin: "bottom",
      distance: "30px",
    });
  }, []);

  const featuresData = [
    {
      icon: RiCustomerService2Line,
      title: t(whyChooseUsKeys.support_24Per_7),
      desc: t(whyChooseUsKeys.support_24Per_7Desc),
    },
    {
      icon: RiPriceTag3Line,
      title: t(whyChooseUsKeys.competitivePricing),
      desc: t(whyChooseUsKeys.competitivePricingDesc),
    },
    {
      icon: RiShieldCheckLine,
      title: t(whyChooseUsKeys.fullyInsured),
      desc: t(whyChooseUsKeys.fullyInsuredDesc),
    },
    {
      icon: RiSteering2Line,
      title: t(whyChooseUsKeys.modernFleet),
      desc: t(whyChooseUsKeys.modernFleetDesc),
    },
  ];

  return (
    <section
      id="choose"
      className="bg-authentic-white dark:bg-mirage transition-colors duration-300"
    >
      <div className={whyChooseUsStyles.container}>
        {/* Image Sub-section */}
        <div
          className={`${whyChooseUsStyles.image.wrapper} ${whyChooseUsStyles.image.reveal}`}
        >
          <img
            src={chooseImg}
            loading="lazy"
            alt={t(whyChooseUsKeys.modernCarFleet)}
            className={whyChooseUsStyles.image.img}
          />
        </div>

        {/* Content Sub-section */}
        <div className={whyChooseUsStyles.content.wrapper}>
          <Header
            title={t(whyChooseUsKeys.title)}
            description={t(whyChooseUsKeys.description)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {featuresData.map((feature, index) => (
              <FeatureCard key={index} fcInfo={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
