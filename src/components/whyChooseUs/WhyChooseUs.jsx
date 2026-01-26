import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ScrollReveal from "scrollreveal";
import chooseImg from "../../assets/choose.png";

import FeatureCard from "./FeatureCard";
import Header from "../whyChooseUs/Header";
import localeKeys from "../../utils/localeKeys.js";

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

    sr.reveal(".choose__image img", { origin: "left" });
    sr.reveal(".section__header", { origin: "top", delay: 500 });
    sr.reveal(".section__description", { origin: "top", delay: 700 });
    sr.reveal(".choose__card", {
      interval: 300,
      origin: "bottom",
      distance: "30px",
    });
  }, []);

  const featuresData = [
    {
      icon: RiCustomerService2Line,
      title: t(localeKeys.support_24Per_7),
      desc: t(localeKeys.support_24Per_7Desc),
    },
    {
      icon: RiPriceTag3Line,
      title: t(localeKeys.competitivePricing),
      desc: t(localeKeys.competitivePricingDesc),
    },
    {
      icon: RiShieldCheckLine,
      title: t(localeKeys.fullyInsured),
      desc: t(localeKeys.fullyInsuredDesc),
    },
    {
      icon: RiSteering2Line,
      title: t(localeKeys.modernFleet),
      desc: t(localeKeys.modernFleetDesc),
    },
  ];

  return (
    <section
      id="choose"
      className="bg-authentic-white dark:bg-mirage transition-colors duration-300"
    >
      <div className="choose__container">
        {/* Image Sub-section */}
        <div className="choose__image">
          <img
            src={chooseImg}
            loading="lazy"
            alt={t(localeKeys.modernCarFleet)}
          />
        </div>

        {/* Content Sub-section */}
        <div className="choose__content">
          <Header
            title={t(localeKeys.whyChooseUs)}
            description={t(localeKeys.whyChooseUsDesc)}
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
