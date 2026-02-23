import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FaCheckCircle, FaTimesCircle, FaCircle } from "react-icons/fa";
import { localeKeys } from "../../utils/localeKeys";
import { checkPasswordRequirements } from "../../utils/validators";
import { calculatePasswordStrength } from "../../utils/Passwordhelpers";
import { keys } from "../../utils/constants";
import { flexRow } from "../../utils/styles";

/**
 * PasswordRequirements Component
 *
 * Interactive password requirements checker with real-time validation
 * Supports RTL/LTR and Arabic/English languages
 *
 * @param {string} password - The password value to validate
 */
const PasswordRequirements = ({ password = "" }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === keys.kAR;
  const hasContent = password.length > 0;

  // Get password requirements status
  const requirements = useMemo(() => {
    const status = checkPasswordRequirements(password);
    return [
      { id: 1, met: status.length, label: t(localeKeys.passwordLength) },
      { id: 2, met: status.uppercase, label: t(localeKeys.passwordUppercase) },
      { id: 3, met: status.lowercase, label: t(localeKeys.passwordLowercase) },
      { id: 4, met: status.number, label: t(localeKeys.passwordNumber) },
      { id: 5, met: status.special, label: t(localeKeys.passwordSpecial) },
    ];
  }, [password, t]);

  // Calculate password strength
  const strength = useMemo(() => {
    const reqObj = requirements.reduce(
      (acc, curr) => ({ ...acc, [curr.id]: curr }),
      {},
    );
    return calculatePasswordStrength(reqObj, password, t, localeKeys);
  }, [requirements, password, t]);

  return (
    <section
      className="mt-3 sm:mt-4 relative z-10 transition-colors duration-500"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Header with title and strength label */}
      <header className="mb-2 sm:mb-3">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-white/90 transition-colors duration-300">
            {t(localeKeys.passwordRequirements)}
          </h4>
          {hasContent && strength.level > 0 && (
            <span
              className={`text-xs font-medium transition-colors duration-300 ${strength.textColor}`}
            >
              {strength.label}
            </span>
          )}
        </div>

        {/* Strength indicator bar */}
        {hasContent && (
          <div className="mt-2">
            <StrengthBar level={strength.level} color={strength.color} />
          </div>
        )}
      </header>

      {/* Requirements list */}
      <ul className="space-y-2" role="list">
        {requirements.map((requirement) => (
          <RequirementItem
            key={requirement.id}
            met={requirement.met}
            label={requirement.label}
            hasPassword={hasContent}
          />
        ))}
      </ul>
    </section>
  );
};

/**
 * RequirementItem
 * A sub-component that displays an individual password requirement with a reactive icon and label.
 * It changes its visual state based on whether the requirement is met and if the input is active.
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.met - Indicates if the specific requirement is satisfied.
 * @param {string} props.label - The translated text description.
 * @param {boolean} props.hasPassword - Whether the password field has content.
 * @returns {JSX.Element}
 */
const RequirementItem = ({ met, label, hasPassword }) => {
  // Determine icon and colors based on state
  const getStatusConfig = () => {
    if (!hasPassword) {
      return {
        Icon: FaCircle,
        iconColor: "text-orange-300/20 dark:text-white/20",
        textColor: "text-gray-600 dark:text-white/40",
      };
    }

    if (met) {
      return {
        Icon: FaCheckCircle,
        iconColor: "text-green-500 dark:text-green-400",
        textColor: "text-gray-800 dark:text-white/90",
      };
    }

    return {
      Icon: FaTimesCircle,
      iconColor: "text-red-500 dark:text-red-400",
      textColor: "text-gray-700 dark:text-white/60",
    };
  };

  const { Icon, iconColor, textColor } = getStatusConfig();

  return (
    <li
      className={`${flexRow} sm:gap-3 transition-all duration-300 ${
        met && hasPassword ? "transform scale-105" : ""
      }`}
    >
      <Icon
        className={`text-xs sm:text-sm shrink-0 ${iconColor} transition-colors duration-300`}
        aria-hidden="true"
      />
      <span
        className={`text-xs sm:text-sm ${textColor} transition-colors duration-300`}
      >
        {label}
      </span>
    </li>
  );
};

/**
 * StrengthBar
 * A visual progress-like indicator that represents the password complexity level.
 * It renders a segmented bar where each segment lights up based on the strength score.
 * @component
 * @param {Object} props - Component props
 * @param {number} props.level - Strength score (0-4).
 * @param {string} props.color - Tailwind background class.
 * @returns {JSX.Element}
 */
const StrengthBar = ({ level, color }) => (
  <div
    className="flex gap-1"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="4"
    aria-valuenow={level}
  >
    {[1, 2, 3, 4].map((segment) => (
      <div
        key={segment}
        className={`h-1 flex-1 rounded-full transition-all duration-500 ${
          segment <= level ? color : "bg-orange-200/30 dark:bg-white/10"
        }`}
      />
    ))}
  </div>
);

export default PasswordRequirements;
