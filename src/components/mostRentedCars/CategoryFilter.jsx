import React from "react";
import { mostRentedCarsStyles } from "../../utils/styles";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div
      className={mostRentedCarsStyles.categoryFilter.wrapper}
      data-aos="fade-up"
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.key)}
          className={
            selectedCategory === cat.key
              ? mostRentedCarsStyles.categoryFilter.buttonActive
              : mostRentedCarsStyles.categoryFilter.buttonInactive
          }
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};
export default CategoryFilter;
