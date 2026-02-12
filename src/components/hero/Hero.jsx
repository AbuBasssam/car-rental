import { useState } from "react";
import { useTranslation } from "react-i18next";

import lightHero from "../../assets/light hero.png";

import PrimaryButton from "../../layouts/primaryButton.jsx";
import OutlineButton from "../../layouts/outlineButton.jsx";

import HeroIntro from "./heroIntro.jsx";
import LocationInput from "./LocationInput.jsx";
import DateInput from "./DateInput.jsx";
import { heroStyles } from "../../utils/styles";
import { heroKeys, bookingKeys } from "../../utils/localeKeys";

const addDays = (date, days) => {
  if (!date) return null;
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const Hero = () => {
  const { t } = useTranslation();
  const [differentDropoff, setDifferentDropoff] = useState(false);
  const [formData, setFormData] = useState({
    pickupLocation: "",
    pickupDate: null,
    dropoffDate: null,
    dropoffLocation: "",
  });
  const [errors, setErrors] = useState({});

  // Keep mock data unchanged
  const locations = [
    { id: 1, value: "downtown", label: "Downtown Branch" },
    { id: 2, value: "airport", label: "Airport Branch" },
    { id: 3, value: "north", label: "North Branch" },
    { id: 4, value: "south", label: "South Branch" },
    { id: 5, value: "east", label: "East Branch" },
    { id: 6, value: "west", label: "West Branch" },
  ];

  // Handler for text/location inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleDateChange = (date, name) => {
    setFormData((prev) => ({ ...prev, [name]: date }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = t(bookingKeys.pickupLocationRequired);
    }

    if (!formData.pickupDate) {
      newErrors.pickupDate = t(bookingKeys.pickupDateRequired);
    }

    if (!formData.dropoffDate) {
      newErrors.dropoffDate = t(bookingKeys.dropoffDateRequired);
    }

    if (formData.pickupDate && formData.dropoffDate) {
      if (formData.dropoffDate <= formData.pickupDate) {
        newErrors.dropoffDate = t(bookingKeys.dropoffDateInvalid);
      }
    }

    if (differentDropoff && !formData.dropoffLocation.trim()) {
      newErrors.dropoffLocation = t(bookingKeys.dropoffLocationRequired);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Convert Date objects to strings (DD-MM-YYYY) only when submitting
      const payload = {
        ...formData,
        pickupDate: formData.pickupDate
          ? `${formData.pickupDate.getDate().toString().padStart(2, "0")}-${(
              formData.pickupDate.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}-${formData.pickupDate.getFullYear()}`
          : null,
        dropoffDate: formData.dropoffDate
          ? `${formData.dropoffDate.getDate().toString().padStart(2, "0")}-${(
              formData.dropoffDate.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}-${formData.dropoffDate.getFullYear()}`
          : null,
      };
      // Form is valid, proceed with search
      console.log("Form submitted:", payload);
      // Add your search logic here
    }
  };

  return (
    <section className={heroStyles.section}>
      <div className={heroStyles.container}>
        <div className={heroStyles.content.wrapper}>
          <HeroIntro />

          {/* BUTTONS */}
          <div
            className={heroStyles.buttonsWrapper}
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <PrimaryButton type="button">
              {t(heroKeys.bookYourRide)}
            </PrimaryButton>

            <OutlineButton title={t(heroKeys.sellYourCar)} />
          </div>
        </div>

        {/* Image */}
        <div data-aos="zoom-in-left">
          <img src={lightHero} alt={t(heroKeys.luxuryCar)} loading="eager" />
        </div>
      </div>

      {/* FORM SECTION */}
      <form
        onSubmit={handleSearch}
        className={heroStyles.form.container}
        data-aos="fade-up"
        data-aos-delay="400"
      >
        {/* Main Fields */}
        <div className={heroStyles.form.grid}>
          {/* Pickup Location */}
          <div>
            {errors.pickupLocation && (
              <p className="error-message">{errors.pickupLocation}</p>
            )}

            <LocationInput
              label={t(bookingKeys.pickupLocation)}
              placeholder={t(bookingKeys.selectBranch)}
              name="pickupLocation"
              value={formData.pickupLocation}
              locations={locations}
              onChange={handleInputChange}
            />
          </div>

          {/* Pickup Date */}
          <div>
            {errors.pickupDate && (
              <p className="error-message">{errors.pickupDate}</p>
            )}

            <DateInput
              label={t(bookingKeys.pickupDate)}
              name="pickupDate"
              value={formData.pickupDate}
              onChange={(date) => handleDateChange(date, "pickupDate")}
              min={new Date()}
            />
          </div>

          {/* Dropoff Date */}
          <div>
            {errors.dropoffDate && (
              <p className="error-message">{errors.dropoffDate}</p>
            )}

            <DateInput
              label={t(bookingKeys.returnDate)}
              value={formData.dropoffDate}
              onChange={(date) => handleDateChange(date, "dropoffDate")}
              min={
                formData.pickupDate
                  ? addDays(formData.pickupDate, 1)
                  : new Date()
              }
            />
          </div>

          {/* Dropoff Location (conditional) */}
          {differentDropoff && (
            <div>
              {errors.dropoffLocation && (
                <p className="error-message">{errors.dropoffLocation}</p>
              )}
              <LocationInput
                label={t(bookingKeys.returnLocation)}
                placeholder={t(bookingKeys.selectBranch)}
                name="dropoffLocation"
                value={formData.dropoffLocation}
                onChange={handleInputChange}
                locations={locations}
              />
            </div>
          )}

          {/* Search button */}
          <PrimaryButton
            type="submit"
            className="w-full"
            onClick={handleSearch}
          >
            {t("search")}
          </PrimaryButton>
        </div>

        {/* Divider + Toggle */}
        <div className={heroStyles.form.divider}>
          <button
            type="button"
            onClick={() => setDifferentDropoff(!differentDropoff)}
            className={heroStyles.form.toggleButton}
          >
            {differentDropoff
              ? t("booking.return_to_same_location")
              : t("booking.return_to_different_location")}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Hero;
