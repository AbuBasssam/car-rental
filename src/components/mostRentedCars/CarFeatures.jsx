import React from "react";
import { Users, Briefcase, Fuel, Settings } from "lucide-react";

const CarFeatures = ({ car }) => {
  const features = [
    { icon: Settings, label: car.transmission },
    { icon: Fuel, label: car.fuel },
    { icon: Users, label: `${car.seats} Seats` },
    { icon: Briefcase, label: `${car.bags} Bags` },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mb-5">
      {features.map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={i}
            className="flex items-center gap-2 p-3 rounded-xl transition-all duration-300 ease-in-out bg-seashell dark:bg-pickled-bluewood hover:bg-premium-orange hover:scale-105 group"
          >
            <Icon
              size={16}
              className="text-premium-orange shrink-0 transition- duration-300 group-hover:text-white"
            />
            <span className="text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis dark:text-dark-text-muted text-deep-gray group-hover:text-white transition-colors duration-300">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CarFeatures;
