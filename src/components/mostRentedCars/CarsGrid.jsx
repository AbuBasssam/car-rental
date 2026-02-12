import React from "react";
import CarCard from "./CarCard";
import { mostRentedCarsStyles } from "../../utils/styles";

const CarsGrid = ({ cars, hoveredId, onHoverChange }) => {
  return (
    <div
      className={mostRentedCarsStyles.grid}
      data-aos="fade-up"
      data-aos-delay={100}
    >
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          isHovered={hoveredId === car.id}
          onMouseEnter={() => onHoverChange(car.id)}
          onMouseLeave={() => onHoverChange(null)}
          categoryName={car.category}
        />
      ))}
    </div>
  );
};

export default CarsGrid;
