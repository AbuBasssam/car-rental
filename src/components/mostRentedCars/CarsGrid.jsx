import React from "react";
import CarCard from "./CarCard";

const CarsGrid = ({ cars, hoveredId, onHoverChange }) => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 px-2"
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
