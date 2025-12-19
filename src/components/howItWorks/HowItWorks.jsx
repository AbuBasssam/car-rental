import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import {
  RiMapPin2Line,
  RiCalendarCheckLine,
  RiCheckboxCircleLine,
  RiKey2Line,
} from "react-icons/ri";

import { IoCarSport } from "react-icons/io5";
import StepCard from "./StepCard";

const HowItWorks = () => {
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
      title: "Choose Location",
      desc: "Find the nearest branch from our extensive network across the city.",
    },
    {
      id: 2,
      icon: RiCalendarCheckLine,
      title: "Pick-up Date",
      desc: "Select your preferred date and time with our flexible scheduling system.",
    },
    {
      id: 3,
      icon: IoCarSport,
      title: "Select Your Car",
      desc: "Browse our modern fleet and choose the car that fits your style.",
    },
    {
      id: 4,
      icon: RiKey2Line,
      title: "Comfort Pickup",
      desc: "Receive your keys at the branch and start your journey with VIP service.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 bg-white dark:bg-mirage transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="section__header mb-4">How It Works</h2>
          <p className="section__description">
            Rent your favorite car in three simple steps. We've made the process
            fast, transparent, and hassle-free.
          </p>
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
