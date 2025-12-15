import React from "react";
const PrimaryButton = ({ title, onClick }) => {
  return (
    <button
      type="button"
      className=" inline-flex items-center justify-center
        px-6 py-2
        rounded-lg
        text-base font-semibold
        bg-orange-500 text-white
        transition-all duration-200
        hover:bg-orange-600
        dark:hover:bg-neon-orange
        hover:-translate-y-0.5
        hover:shadow-lg hover:shadow-orange-500/30
        active:translate-y-0"
      onClick={onClick}
    >
      {title}
    </button>
  );
};
export default PrimaryButton;
