import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaLocationArrow, FaChevronDown } from "react-icons/fa";
import { useClickOutside } from "../../hooks/useClickOutside";
import localeKeys from "../../utils/localeKeys.js";

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
    <div className="flex flex-col gap-1 relative" ref={dropdownRef}>
      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
        {label}
      </label>

      {/* Input Field */}
      <div className="flex items-center gap-2 border border-mercury dark:border-pickled-bluewood rounded-lg px-3 py-2 bg-white dark:bg-mirage hover:bg-soft-gray dark:hover:bg-fiord focus-within:border-premium-orange focus-within:ring-2 focus-within:ring-premium-orange/20 transition-all">
        <FaLocationArrow className="text-premium-orange text-sm shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={searchTerm || (selectedLocation ? selectedLocation.label : "")}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="flex-1 text-sm outline-none bg-transparent text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
        <button
          type="button"
          onClick={toggleDropdown}
          className="p-1 rounded-full hover:bg-authentic-white dark:hover:bg-big-stone transition"
        >
          <FaChevronDown
            className={`text-gray-400 dark:text-gray-500 text-xs transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-big-stone border border-mercury dark:border-pickled-bluewood rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location) => (
              <button
                key={location.id || location.value}
                type="button"
                onClick={() => handleSelect(location)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                  value === location.value
                    ? "bg-seashell dark:bg-pickled-bluewood text-premium-orange font-semibold"
                    : "text-deep-gray dark:text-gray-300 hover:bg-soft-gray dark:hover:bg-fiord"
                }`}
              >
                <div className="flex items-center gap-2">{location.label}</div>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-400 dark:text-gray-500 text-center">
              {t(localeKeys.noLocationsFound)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
