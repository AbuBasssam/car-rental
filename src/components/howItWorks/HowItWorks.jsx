import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ScrollReveal from "scrollreveal";
import {
  RiMapPin2Line,
  RiCalendarCheckLine,
  RiCheckboxCircleLine,
  RiKey2Line,
} from "react-icons/ri";

import { IoCarSport } from "react-icons/io5";
import StepCard from "./StepCard";
import localeKeys from "../../utils/localeKeys.js";

const HowItWorks = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const sr = ScrollReveal({
      distance: "60px",
      duration: 1200,
      delay: 200,
      reset: false,
    });

    sr.reveal(".step__card", { interval: 200, origin: "bottom" });
  }, []);

  const steps = [
    {
      id: 1,
      icon: RiMapPin2Line,
      title: t(localeKeys.chooseLocation),
      desc: t(localeKeys.chooseLocationDesc),
    },
    {
      id: 2,
      icon: RiCalendarCheckLine,
      title: t(localeKeys.pickupDateStep),
      desc: t(localeKeys.pickupDateStepDesc),
    },
    {
      id: 3,
      icon: IoCarSport,
      title: t(localeKeys.selectYourCar),
      desc: t(localeKeys.selectYourCarDesc),
    },
    {
      id: 4,
      icon: RiKey2Line,
      title: t(localeKeys.comfortPickup),
      desc: t(localeKeys.comfortPickupDesc),
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 bg-white dark:bg-mirage transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="section__header mb-4">{t(localeKeys.howItWorks)}</h2>
          <p className="section__description">{t(localeKeys.howItWorksDesc)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((step) => (
            <StepCard key={step.id} stepInfo={step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
