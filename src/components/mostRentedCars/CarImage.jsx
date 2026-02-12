import React from "react";
import { Accessibility } from "lucide-react";
import { mostRentedCarsStyles } from "../../utils/styles";

const CarImage = ({ car, isHovered, categoryName }) => {
  return (
    <div className={mostRentedCarsStyles.card.image.wrapper}>
      <img
        src={car.image}
        alt={car.name}
        loading="lazy"
        className={
          isHovered
            ? mostRentedCarsStyles.card.image.imgHovered
            : mostRentedCarsStyles.card.image.img
        }
      />

      {/* Dark Overlay */}
      <div
        className={
          isHovered
            ? mostRentedCarsStyles.card.image.overlayHovered
            : mostRentedCarsStyles.card.image.overlay
        }
      />

      {/* Top Badges */}
      <div className={mostRentedCarsStyles.card.image.badgesWrapper}>
        <div className={mostRentedCarsStyles.card.image.yearBadge}>
          <span className={mostRentedCarsStyles.card.image.yearText}>
            {car.year}
          </span>
        </div>

        {car.accessible && (
          <div className={mostRentedCarsStyles.card.image.accessibilityBadge}>
            <Accessibility size={16} />
          </div>
        )}
      </div>

      {/* Bottom Car Info */}
      <div className={mostRentedCarsStyles.card.image.bottomInfo}>
        <p className={mostRentedCarsStyles.card.image.categoryText}>
          {categoryName}
        </p>
        <h3 className={mostRentedCarsStyles.card.image.carName}>{car.name}</h3>
      </div>
    </div>
  );
};

export default CarImage;
