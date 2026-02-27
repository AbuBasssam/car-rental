import React from "react";
import { useTranslation } from "react-i18next";
import { Users, Briefcase, Fuel, Settings } from "lucide-react";
import { mostRentedCarsStyles } from "../../utils/styles";
import { mostRentedCarsKeys } from "../../utils/localeKeys.js";

const CarFeatures = ({ car }) => {
  const { t } = useTranslation();

  const features = [
    { icon: Settings, label: car.transmission },
    { icon: Fuel, label: car.fuel },
    {
      icon: Users,
      label: `${car.seats} ${t(mostRentedCarsKeys.seats)}`,
    },
    {
      icon: Briefcase,
      label: `${car.bags} ${t(mostRentedCarsKeys.bags)}`,
    },
  ];

  return (
    <div className={mostRentedCarsStyles.card.features.grid}>
      {features.map((item, i) => {
        const Icon = item.icon;
        return (
          <div key={i} className={mostRentedCarsStyles.card.features.item}>
            <Icon
              size={16}
              className={mostRentedCarsStyles.card.features.icon}
            />
            <span className={mostRentedCarsStyles.card.features.label}>
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CarFeatures;
