import React from "react";
import { useTranslation } from "react-i18next";
import { mostRentedCarsStyles } from "../../utils/styles";
import { mostRentedCarsKeys } from "../../utils/localeKeys.js";

const CarInfo = ({ price }) => {
  const { t } = useTranslation();

  return (
    <div className={mostRentedCarsStyles.card.price.wrapper}>
      <span className={mostRentedCarsStyles.card.price.amount}>{price}</span>
      <span className={mostRentedCarsStyles.card.price.period}>
        {t(mostRentedCarsKeys.perDay)}
      </span>
    </div>
  );
};
export default CarInfo;
