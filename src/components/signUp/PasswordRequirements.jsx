import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import localeKeys from "../../utils/localeKeys.js";
import { FaCheckCircle, FaTimesCircle, FaCircle } from "react-icons/fa";

/**
 * PasswordRequirements Component
 *
 * Interactive password requirements checker with real-time validation
 * Supports RTL/LTR and Arabic/English languages
 *
 * @param {string} password - The password value to validate
 * @param {boolean} show - Whether to show the requirements
 */
const PasswordRequirements = ({ password = "" }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  // Password validation rules
  const requirements = useMemo(() => {
    const hasLength = password.length >= 8 && password.length <= 16;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/;'`~]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return {
      length: {
        met: hasLength,
        label: t(localeKeys.passwordLength),
        key: "length",
      },
      uppercase: {
        met: hasUppercase,
        label: t(localeKeys.passwordUppercase),
        key: "uppercase",
      },
      lowercase: {
        met: hasLowercase,
        label: t(localeKeys.passwordLowercase),
        key: "lowercase",
      },
      special: {
        met: hasSpecial,
        label: t(localeKeys.passwordSpecial),
        key: "special",
      },
      number: {
        met: hasNumber,
        label: t(localeKeys.passwordNumber),
        key: "number",
      },
    };
  }, [password, t]);

  // Calculate password strength
  const passwordStrength = useMemo(() => {
    const metRequirements = Object.values(requirements).filter(
      (r) => r.met,
    ).length;

    if (metRequirements === 0 || password.length === 0) {
      return { level: 0, label: "", color: "" };
    } else if (metRequirements <= 2) {
      return {
        level: 1,
        label: t(localeKeys.passwordWeak),
        color: "bg-red-500",
        textColor: "text-red-500",
      };
    } else if (metRequirements === 3) {
      return {
        level: 2,
        label: t(localeKeys.passwordMedium),
        color: "bg-yellow-500",
        textColor: "text-yellow-500",
      };
    } else if (metRequirements === 4) {
      return {
        level: 3,
        label: t(localeKeys.passwordStrong),
        color: "bg-blue-500",
        textColor: "text-blue-500",
      };
    } else {
      return {
        level: 4,
        label: t(localeKeys.passwordVeryStrong),
        color: "bg-green-500",
        textColor: "text-green-500",
      };
    }
  }, [requirements, password.length, t]);

  return (
    <div
      className="mt-3 sm:mt-4 relative z-10"
      style={isArabic ? { direction: "rtl" } : {}}
    >
      {/* Header */}
      <div className="mb-2 sm:mb-3">
        <h4 className="text-xs sm:text-sm font-semibold text-white/90 mb-1">
          {t(localeKeys.passwordRequirements)}
        </h4>

        {/* Password Strength Indicator */}
        {password.length > 0 && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-white/70">
                {t(localeKeys.passwordStrength)}
              </span>
              {passwordStrength.level > 0 && (
                <span
                  className={`text-xs font-medium ${passwordStrength.textColor}`}
                >
                  {passwordStrength.label}
                </span>
              )}
            </div>

            {/* Strength bars */}
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    level <= passwordStrength.level
                      ? passwordStrength.color
                      : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Requirements list */}
      <div className="space-y-2">
        {Object.values(requirements).map((requirement) => (
          <RequirementItem
            key={requirement.key}
            met={requirement.met}
            label={requirement.label}
            hasPassword={password.length > 0}
            isArabic={isArabic}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * RequirementItem Component
 * Individual requirement row with icon and text
 */
const RequirementItem = ({ met, label, hasPassword, isArabic }) => {
  // Determine icon and colors
  const getIconAndColor = () => {
    if (!hasPassword) {
      return {
        Icon: FaCircle,
        iconColor: "text-white/30",
        textColor: "text-white/60",
      };
    }

    if (met) {
      return {
        Icon: FaCheckCircle,
        iconColor: "text-green-400",
        textColor: "text-white/90",
      };
    }

    return {
      Icon: FaTimesCircle,
      iconColor: "text-red-400",
      textColor: "text-white/70",
    };
  };

  const { Icon, iconColor, textColor } = getIconAndColor();

  return (
    <div
      className={`flex items-center gap-2 sm:gap-3 transition-all duration-300 ${
        met && hasPassword ? "transform scale-105" : ""
      }`}
      style={isArabic ? { direction: "rtl" } : {}}
    >
      {/* Icon */}
      <div className={`shrink-0 ${iconColor} transition-colors duration-300`}>
        <Icon className="text-xs sm:text-sm" />
      </div>

      {/* Label */}
      <span
        className={`text-xs sm:text-sm ${textColor} transition-colors duration-300`}
        style={isArabic ? { textAlign: "right" } : {}}
      >
        {label}
      </span>
    </div>
  );
};

export default PasswordRequirements;
