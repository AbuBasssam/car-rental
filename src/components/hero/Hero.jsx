import { useState } from "react";

import { MdOutlineDateRange } from "react-icons/md";

import lightHero from "../../assets/light hero.png";

import PrimaryButton from "../../layouts/primaryButton.jsx";
import OutlineButton from "../../layouts/outlineButton.jsx";

import HeroIntro from "./heroIntro.jsx";
import LocationInput from "./LocationInput.jsx";
import DateInput from "./DateInput.jsx";

const addDays = (date, days) => {
  if (!date) return null;
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const Hero = () => {
  const [differentDropoff, setDifferentDropoff] = useState(false);
  const [formData, setFormData] = useState({
    pickupLocation: "",
    pickupDate: null,
    dropoffDate: null,
    dropoffLocation: "",
  });
  const [errors, setErrors] = useState({});

  const content = {
    pickupLocation: "Pickup Location",
    pickupLocationPlaceholder: "Select Branch",
    pickupDate: "Pickup Date",
    dropoffDate: "Return Date",
    dropoffLocation: "Return Location",
    dropoffLocationPlaceholder: "Select Branch",
    searchButton: "Search",
    differentDropoffToggle: "Return to Different Location",
    errors: {
      pickupLocationRequired: "Pickup location is required",
      pickupDateRequired: "Pickup date is required",
      dropoffDateRequired: "Return date is required",
      dropoffDateInvalid: "Return date must be after pickup date",
      dropoffLocationRequired: "Return location is required",
    },
  };
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
      newErrors.pickupLocation = content.errors.pickupLocationRequired;
    }

    if (!formData.pickupDate) {
      newErrors.pickupDate = content.errors.pickupDateRequired;
    }

    if (!formData.dropoffDate) {
      newErrors.dropoffDate = content.errors.dropoffDateRequired;
    }

    if (formData.pickupDate && formData.dropoffDate) {
      if (formData.dropoffDate <= formData.pickupDate) {
        newErrors.dropoffDate = content.errors.dropoffDateInvalid;
      }
    }

    if (differentDropoff && !formData.dropoffLocation.trim()) {
      newErrors.dropoffLocation = content.errors.dropoffLocationRequired;
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

  // Helper function to convert YYYY-MM-DD string back to Date object for DatePicker's selected prop
  // const parseDate = (dateString) => (dateString ? new Date(dateString) : null);

  return (
    <section className="bg-mercury dark:bg-mirage py-40 lg:py-20 px-5 lg:px-14">
      <div className="max-w-325 mx-auto flex flex-col lg:flex-row items-center justify-between gap-10  transition-colors duration-300">
        <div className="flex-1 space-y-6">
          <HeroIntro />

          {/* BUTTONS */}
          <div className="flex gap-4" data-aos="fade-up" data-aos-delay="400">
            <PrimaryButton title="Book Your Ride" />
            <OutlineButton title="Sell Your Car" />
          </div>
        </div>

        {/* Image */}
        <div data-aos="zoom-in-left">
          <img src={lightHero} alt="Luxury Car" loading="eager" />
        </div>
      </div>

      {/* FORM SECTION */}
      <form
        onSubmit={handleSearch}
        className="bg-white dark:bg-big-stone rounded-xl shadow-md p-5 my-5 transition-colors duration-300"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        {/* Main Fields */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Pickup Location */}
          <div>
            {errors.pickupLocation && (
              <p className="error-message">{errors.pickupLocation}</p>
            )}

            <LocationInput
              label={content.pickupLocation}
              placeholder={content.pickupLocationPlaceholder}
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
              label={content.pickupDate}
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
              label={content.dropoffDate}
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
                label={content.dropoffLocation}
                placeholder={content.dropoffLocationPlaceholder}
                name="dropoffLocation"
                value={formData.dropoffLocation}
                onChange={handleInputChange}
                locations={locations}
              />
            </div>
          )}

          {/* Search button */}
          <PrimaryButton
            title={content.searchButton}
            className="w-full"
            type="submit"
            onClick={handleSearch}
          />
        </div>

        {/* Divider + Toggle */}
        <div className="mt-4 pt-3 border-t-2 border-mercury dark:border-pickled-bluewood flex justify-end transition-colors duration-300">
          <button
            type="button"
            onClick={() => setDifferentDropoff(!differentDropoff)}
            className="text-sm font-semibold text-orange-500 hover:underline dark:text-neon-orange transition-colors duration-200"
          >
            {content.differentDropoffToggle}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Hero;
