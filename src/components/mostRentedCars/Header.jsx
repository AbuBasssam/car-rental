import React from "react";

const Header = () => {
  return (
    <div className="text-center mb-10" data-aos="fade-up">
      <h2 className="font-heading font-bold mb-4 text-eerie-black dark:text-mercury text-4xl md:text-5xl lg:text-6xl tracking-tighter-custom">
        Most Rented Cars
      </h2>
      <p className="text-deep-gray dark:text-dark-text-muted text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
        Premium cars carefully selected to suit your needs
      </p>
    </div>
  );
};

export default Header;
