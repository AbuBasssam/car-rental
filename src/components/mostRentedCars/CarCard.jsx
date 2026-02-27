import React from "react";
import { useTranslation } from "react-i18next";
import CarImage from "./CarImage";
import CarInfo from "./CarInfo";
import CarFeatures from "./CarFeatures";
import { mostRentedCarsStyles } from "../../utils/styles";
import { mostRentedCarsKeys } from "../../utils/localeKeys.js";

const CarCard = ({
  car,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  categoryName,
}) => {
  const { t } = useTranslation();

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={
        isHovered
          ? mostRentedCarsStyles.card.containerHovered
          : mostRentedCarsStyles.card.container
      }
    >
      <CarImage car={car} isHovered={isHovered} categoryName={categoryName} />

      <div className={mostRentedCarsStyles.card.content}>
        <CarInfo price={car.price} />
        <CarFeatures car={car} />

        <button className={mostRentedCarsStyles.card.bookButton}>
          {t(mostRentedCarsKeys.bookNow)}
        </button>
      </div>
    </div>
  );
};

export default CarCard;
