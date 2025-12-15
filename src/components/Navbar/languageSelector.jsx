import { useState } from "react";
import { Globe } from "lucide-react";
import IconButton from "./IconButton";
import DropdownMenu from "../../layouts/dropDownMenu";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ArItem = {
    label: "العربية",
    onClick: () => {
      setIsOpen(false);
      // Handle language change to Arabic
    },
  };
  const EnItem = {
    label: "English",
    onClick: () => {
      setIsOpen(false);
      // Handle language change to English
    },
  };

  return (
    <div className="relative">
      <IconButton onClick={() => setIsOpen(!isOpen)}>
        <Globe size={18} className="text-deep-gray dark:text-premium-orange " />
      </IconButton>
      <DropdownMenu isOpen={isOpen} items={[EnItem, ArItem]} />
    </div>
  );
};

export default LanguageSelector;
