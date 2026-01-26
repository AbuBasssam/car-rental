// src/components/LanguageSelector.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import IconButton from "./IconButton";
import DropdownMenu from "../../layouts/DropDownMenu";
import useClickOutside from "../../hooks/useClickOutside";
import { languagesKeys } from "../../utils/localeKeys";
import { keys } from "../../utils/constants";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const dropdownRef = useClickOutside(() => setIsOpen(false), isOpen);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const ArItem = {
    label: t(languagesKeys.arabic),
    onClick: () => changeLanguage(keys.kAR),
  };

  const EnItem = {
    label: t(languagesKeys.english),
    onClick: () => changeLanguage(keys.kEN),
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <IconButton onClick={() => setIsOpen(!isOpen)}>
        <Globe size={18} className="text-deep-gray dark:text-premium-orange" />
      </IconButton>
      <DropdownMenu isOpen={isOpen} items={[EnItem, ArItem]} />
    </div>
  );
};

export default LanguageSelector;
