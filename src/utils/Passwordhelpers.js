// ============================================
// 🔑 PASSWORD HELPERS
// ============================================

/**
 * Calculate password strength
 * Separated logic from PasswordRequirements component
 *
 * @param {Object} requirements - Requirements object
 * @param {string} password - Password value
 * @param {Function} t - i18n translation function
 * @param {Object} localeKeys - Locale keys object
 * @returns {Object} Strength object with level, label, color, textColor
 */
export const calculatePasswordStrength = (
  requirements,
  password,
  t,
  localeKeys,
) => {
  const metRequirements = Object.values(requirements).filter(
    (r) => r.met,
  ).length;

  if (metRequirements === 0 || password.length === 0) {
    return { level: 0, label: "", color: "", textColor: "" };
  } else if (metRequirements <= 2) {
    return {
      level: 1,
      label: t(localeKeys.passwordWeak),
      color: "bg-red-500 dark:bg-red-400",
      textColor: "text-red-600 dark:text-red-400",
    };
  } else if (metRequirements === 3) {
    return {
      level: 2,
      label: t(localeKeys.passwordMedium),
      color: "bg-yellow-500 dark:bg-yellow-400",
      textColor: "text-yellow-600 dark:text-yellow-400",
    };
  } else if (metRequirements === 4) {
    return {
      level: 3,
      label: t(localeKeys.passwordStrong),
      color: "bg-blue-500 dark:bg-blue-400",
      textColor: "text-blue-600 dark:text-blue-400",
    };
  } else {
    return {
      level: 4,
      label: t(localeKeys.passwordVeryStrong),
      color: "bg-green-500 dark:bg-green-400",
      textColor: "text-green-600 dark:text-green-400",
    };
  }
};
