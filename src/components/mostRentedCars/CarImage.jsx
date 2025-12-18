import React from "react";
import { Calendar, Accessibility } from "lucide-react";

const CarImage = ({ car, isHovered, categoryName }) => {
  return (
    <div className="relative h-60 overflow-hidden">
      <img
        src={car.image}
        alt={car.name}
        loading="lazy"
        className={`w-full h-full object-cover transition-transform duration-500 ease-in-out
          ${isHovered ? "scale-110" : "scale-100"}
        `}
      />

      {/* Dark Overlay */}
      <div
        className={`
          absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent
          transition-opacity duration-300 ease-in-out
          ${isHovered ? "opacity-90" : "opacity-70"}
        `}
      />

      {/* Top Badges */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <div className="px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-md bg-white/95 dark:bg-big-stone/95 shadow-light-soft dark:shadow-dark-soft">
          <span className=" font-bold text-sm text-premium-orange">
            {car.year}
          </span>
        </div>

        {car.accessible && (
          <div className="bg-emerald-500 text-white p-2 rounded-full flex backdrop-blur-md shadow-lg shadow-emerald-500/40">
            <Accessibility size={16} />
          </div>
        )}
      </div>

      {/* Bottom Car Info */}
      <div className="absolute bottom-4 left-4 right-4">
        <p className="text-xs text-neon-orange font-bold mb-1 tracking-wider">
          {categoryName}
        </p>
        <h3 className="font-heading text-xl font-bold text-white drop-shadow-lg">
          {car.name}
        </h3>
      </div>
    </div>
  );
};

export default CarImage;
