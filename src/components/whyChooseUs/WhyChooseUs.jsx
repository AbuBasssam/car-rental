import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import chooseImg from "../../assets/choose.png";

import FeatureCard from "./FeatureCard";
import Header from "../whyChooseUs/Header";

import {
  RiCustomerService2Line,
  RiPriceTag3Line,
  RiShieldCheckLine,
  RiSteering2Line,
} from "react-icons/ri";

const WhyChooseUs = () => {
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
      title: "24/7 Support",
      desc: "Our dedicated team is available around the clock to assist you.",
    },
    {
      icon: RiPriceTag3Line,
      title: "Competitive Pricing",
      desc: "Enjoy the best market rates with full transparency and no hidden fees.",
    },
    {
      icon: RiShieldCheckLine,
      title: "Fully Insured",
      desc: "Drive with peace of mind knowing all our vehicles are fully covered.",
    },
    {
      icon: RiSteering2Line,
      title: "Modern Fleet",
      desc: "Experience the latest car models, meticulously maintained for your safety.",
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
          <img src={chooseImg} loading="lazy" alt="Modern Car Fleet" />
        </div>

        {/* Content Sub-section */}
        <div className="choose__content">
          <Header
            title="Why Choose Us"
            description="We provide a premium car rental experience tailored to your needs, focusing on quality, safety, and seamless service."
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
