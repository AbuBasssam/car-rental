import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ScrollReveal from "scrollreveal";
import { RiMapPin2Line, RiCalendarCheckLine, RiKey2Line } from "react-icons/ri";

import { IoCarSport } from "react-icons/io5";
import StepCard from "./StepCard";
import { howItWorksStyles, sectionStyles } from "../../utils/styles";
import { howItWorksKeys } from "../../utils/localeKeys";

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
      title: t(howItWorksKeys.chooseLocation),
      desc: t(howItWorksKeys.chooseLocationDesc),
    },
    {
      id: 2,
      icon: RiCalendarCheckLine,
      title: t(howItWorksKeys.pickupDateStep),
      desc: t(howItWorksKeys.pickupDateStepDesc),
    },
    {
      id: 3,
      icon: IoCarSport,
      title: t(howItWorksKeys.selectYourCar),
      desc: t(howItWorksKeys.selectYourCarDesc),
    },
    {
      id: 4,
      icon: RiKey2Line,
      title: t(howItWorksKeys.comfortPickup),
      desc: t(howItWorksKeys.comfortPickupDesc),
    },
  ];

  return (
    <section id="how-it-works" className={howItWorksStyles.section}>
      <div className={howItWorksStyles.container}>
        <div className={howItWorksStyles.header.wrapper}>
          <h2 className={sectionStyles.header}>{t(howItWorksKeys.title)}</h2>
          <p className={sectionStyles.description}>
            {t(howItWorksKeys.description)}
          </p>
        </div>

        <div className={howItWorksStyles.grid}>
          {steps.map((step) => (
            <StepCard key={step.id} stepInfo={step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
