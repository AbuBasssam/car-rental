import React from "react";
import CarImage from "./CarImage";
import CarInfo from "./CarInfo";
import CarFeatures from "./CarFeatures";

const CarCard = ({
  car,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  categoryName,
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`bg-white dark:bg-big-stone
        rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ease-in-out
        ${
          isHovered
            ? "shadow-orange -translate-y-2 scale-[1.02] border-2 border-premium-orange"
            : "shadow-light-soft dark:shadow-dark-soft"
        }
      `}
    >
      <CarImage car={car} isHovered={isHovered} categoryName={categoryName} />

      <div className="p-5">
        <CarInfo price={car.price} />
        <CarFeatures car={car} />

        <button
          className="
            w-full bg-premium-orange text-white py-4 rounded-xl border-none
            text-lg font-bold cursor-pointer transition-all duration-300 ease-in-out
            shadow-lg shadow-premium-orange/30 font-heading
            hover:bg-premium-orange-dark hover:scale-[1.03] hover:shadow-orange
          "
        >
          احجز الآن
        </button>
      </div>
    </div>
  );
};

export default CarCard;
