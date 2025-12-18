import React from "react";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div
      className="flex gap-3 justify-center flex-wrap mb-12 px-4"
      data-aos="fade-up"
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.key)}
          className={`
            px-6 py-3 rounded-full text-sm font-semibold cursor-pointer
            transition-all duration-300 ease-in-out
            ${
              selectedCategory === cat.key
                ? "bg-premium-orange text-white shadow-orange scale-105 border-none"
                : "bg-white dark:bg-big-stone text-eerie-black dark:text-mercury border border-soft-gray dark:border-dark-border shadow-light-soft dark:shadow-dark-soft"
            }
            hover:scale-105
            ${
              selectedCategory !== cat.key
                ? "hover:bg-soft-gray dark:hover:bg-pickled-bluewood"
                : ""
            }
          `}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};
export default CategoryFilter;
