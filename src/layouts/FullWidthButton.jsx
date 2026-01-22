import React from "react";

const FullWidthButton = ({ children, className = "", ...props }) => {
  const defaultStyle = `w-full inline-flex items-center justify-center
    px-6 py-3 my-4 sm:py-4
    rounded-xl
    text-sm sm:text-base font-bold
    bg-gradient-to-r from-orange-500/90 to-orange-600/90 text-white/95
    transition-all duration-300
    hover:from-orange-600/90 hover:to-orange-700/90
    hover:-translate-y-0.5
    hover:shadow-xl hover:shadow-orange-500/30
    active:translate-y-0
    focus:outline-none focus:ring-2 focus:ring-orange-500/70
    relative overflow-hidden group`;

  return (
    <button className={`${defaultStyle} ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 transition-opacity duration-300 z-0 opacity-0 group-hover:opacity-100 bg-linear-to-r from-orange-400/50 to-orange-500/50" />
    </button>
  );
};
export default FullWidthButton;
