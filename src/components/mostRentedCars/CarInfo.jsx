import React from "react";

const CarInfo = ({ price }) => {
  return (
    <div className="flex items-baseline gap-2 mb-4 pb-4 dark:border-dark-border border-soft-gray border-b-2">
      <span className="text-3xl font-bold text-premium-orange font-heading">
        {price}
      </span>
      <span className="text-sm font-medium text-deep-gray dark:text-dark-text-muted">
        SAR / Day
      </span>
    </div>
  );
};
export default CarInfo;
