import React from "react";
import { useTranslation } from "react-i18next";
import { mostRentedCarsStyles } from "../../utils/styles";
import { mostRentedCarsKeys } from "../../utils/localeKeys.js";

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className={mostRentedCarsStyles.header.wrapper} data-aos="fade-up">
      <h2 className={mostRentedCarsStyles.header.title}>
        {t(mostRentedCarsKeys.title)}
      </h2>
      <p className={mostRentedCarsStyles.header.description}>
        {t(mostRentedCarsKeys.description)}
      </p>
    </div>
  );
};

export default Header;
