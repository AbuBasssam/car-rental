import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaLocationArrow, FaChevronDown } from "react-icons/fa";
import { useClickOutside } from "../../hooks/useClickOutside";
import { flexRow, formInputStyles } from "../../utils/styles";
import { bookingKeys } from "../../utils/localeKeys";

const LocationInput = ({
  label,
  placeholder,
  value,
  onChange,
  name,
  locations = [],
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  const closeDropDown = () => {
    setIsOpen(false);
    setSearchTerm("");
  };

  const dropdownRef = useClickOutside(() => closeDropDown(), isOpen);

  // Filter locations based on search term
  const filteredLocations = locations.filter((location) =>
    location.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Get selected location label
  const selectedLocation = locations.find((loc) => loc.value === value);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
    setIsOpen(true);

    // Clear selection if input is cleared
    if (!inputValue) {
      onChange({ target: { name, value: "" } });
    }
  };

  const handleSelect = (location) => {
    onChange({ target: { name, value: location.value } });
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      inputRef.current?.focus();
    }
  };

  return (
    <div className={formInputStyles.container + " relative"} ref={dropdownRef}>
      <label className={formInputStyles.label}>{label}</label>

      {/* Input Field */}
      <div className={formInputStyles.inputWrapperHover}>
        <FaLocationArrow className={formInputStyles.icon} />
        <input
          ref={inputRef}
          type="text"
          value={searchTerm || (selectedLocation ? selectedLocation.label : "")}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className={formInputStyles.inputFlex}
        />
        <button
          type="button"
          onClick={toggleDropdown}
          className={formInputStyles.dropdownToggle}
        >
          <FaChevronDown
            className={
              isOpen ? formInputStyles.chevronOpen : formInputStyles.chevron
            }
          />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={formInputStyles.dropdown}>
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location) => (
              <button
                key={location.id || location.value}
                type="button"
                onClick={() => handleSelect(location)}
                className={
                  value === location.value
                    ? formInputStyles.dropdownItemSelected
                    : formInputStyles.dropdownItem
                }
              >
                <div className={flexRow}>{location.label}</div>
              </button>
            ))
          ) : (
            <div className={formInputStyles.dropdownEmpty}>
              {t(bookingKeys.noLocationsFound)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
