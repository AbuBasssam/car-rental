import { validationKeys } from "../utils/localeKeys";

export const VALIDATION_CONSTANTS = {
  EMAIL_MAX_LENGTH: 256,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 16,
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 50,
  OTP_LENGTH: 6,
};
const validationResult = (translationKey, paramsObj = null) => {
  return {
    key: translationKey,
    params: paramsObj,
  };
};
/**
 * Validate Email Address
 * @param {string} email - Email to validate
 * @returns {string|null} Error key or null if valid
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === "") {
    return validationResult(validationKeys.emailRequired);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return validationResult(validationKeys.emailInvalid);
  }

  if (email.length > VALIDATION_CONSTANTS.EMAIL_MAX_LENGTH) {
    return validationResult(validationKeys.emailMaxLength, {
      parm1: VALIDATION_CONSTANTS.EMAIL_MAX_LENGTH,
    });
  }

  return null;
};

/**
 * Validate Password (Basic - for Login)
 * @param {string} password - Password to validate
 * @returns {string|null} Error key or null if valid
 */
export const validatePassword = (password) => {
  if (!password || password.trim() === "") {
    return validationResult(validationKeys.passwordRequired);
  }
  return null;
};

/**
 * Check Password Requirements (for UI display)
 * @param {string} password - Password to check
 * @returns {Object} Requirements object with individual checks
 */
export const checkPasswordRequirements = (password = "") => {
  return {
    length:
      password.length >= VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH &&
      password.length <= VALIDATION_CONSTANTS.PASSWORD_MAX_LENGTH,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/;'`~]/.test(password),
  };
};

/**
 * Validate Strong Password (for Signup/Reset)
 * @param {string} password - Password to validate
 * @returns {string|null} Error key or null if valid
 */
export const validateStrongPassword = (password) => {
  const basicError = validatePassword(password);
  if (basicError) {
    return basicError;
  }

  const requirements = checkPasswordRequirements(password);
  const allRequirementsMet = Object.values(requirements).every(
    (req) => req === true,
  );

  return allRequirementsMet
    ? null
    : validationResult(validationKeys.passwordInvalid);
};

/**
 * Validate Name (First/Last Name)
 * @param {string} name - Name to validate
 * @param {string} fieldKey - Translation key for field name
 * @returns {string|null} Error key or null if valid
 */
export const validateName = (name, fieldKey) => {
  let params;

  if (!name || name.trim() === "") {
    params = {
      parm1: fieldKey,
    };
    return validationResult(validationKeys.nameRequired, params);
  }

  if (name.length < VALIDATION_CONSTANTS.NAME_MIN_LENGTH) {
    params = {
      parm1: fieldKey,
      parm2: VALIDATION_CONSTANTS.NAME_MIN_LENGTH,
    };

    return validationResult(validationKeys.nameMinLength, params);
  }

  if (name.length > VALIDATION_CONSTANTS.NAME_MAX_LENGTH) {
    params = {
      parm1: fieldKey,
      parm2: VALIDATION_CONSTANTS.NAME_MAX_LENGTH,
    };
    return validationResult(validationKeys.nameMaxLength, params);
  }

  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(name)) {
    return validationResult(validationKeys.nameInvalid);
  }

  return null;
};

/**
 * Validate Passwords Match (for Signup)
 * @param {string} password - Password
 * @param {string} confirmPassword - Confirm password
 * @returns {string|null} Error key or null if valid
 */
export const validatePasswordsMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return validationResult(validationKeys.passwordsNotMatch);
  }
  return null;
};

/**
 * Validate Terms Acceptance
 * @param {boolean} accepted - Whether terms are accepted
 * @returns {string|null} Error key or null if valid
 */
export const validateTermsAcceptance = (accepted) => {
  if (!accepted) {
    return validationResult(validationKeys.termsRequired);
  }
  return null;
};

/**
 * Validate OTP Code
 * @param {string} code - Verification code
 * @returns {string|null} Error key or null if valid
 */
export const validateOTP = (code) => {
  if (!code || code.length < VALIDATION_CONSTANTS.OTP_LENGTH) {
    return validationResult(validationKeys.otpIncomplete);
  }
  return null;
};
// ─── Branch Validators ────────────────────────────────────────────────────────

/**
 * Validate Branch Name (EN or AR)
 * @param {string} value
 * @param {"en"|"ar"} lang
 * @returns {string|null} error message or null
 */
export const validateBranchName = (value, lang = "en") => {
  if (!value || !value.trim())
    return lang === "ar" ? "الاسم مطلوب" : "Name is required";
  if (value.trim().length > 75)
    return lang === "ar" ? "الحد الأقصى 75 حرفاً" : "Maximum 75 characters";
  return null;
};

/**
 * Validate City Name (EN or AR)
 * @param {string} value
 * @param {"en"|"ar"} lang
 * @returns {string|null}
 */
export const validateCityName = (value, lang = "en") => {
  if (!value || !value.trim())
    return lang === "ar" ? "المدينة مطلوبة" : "City is required";
  return null;
};

/**
 * Validate GPS Latitude
 * @param {string|number} value
 * @returns {string|null}
 */
export const validateLatitude = (value) => {
  const lat = parseFloat(value);
  if (isNaN(lat) || lat < -90 || lat > 90)
    return "Invalid Latitude (must be between −90 and 90)";
  return null;
};

/**
 * Validate GPS Longitude
 * @param {string|number} value
 * @returns {string|null}
 */
export const validateLongitude = (value) => {
  const lng = parseFloat(value);
  if (isNaN(lng) || lng < -180 || lng > 180)
    return "Invalid Longitude (must be between −180 and 180)";
  return null;
};

/**
 * Validate full branch form
 * @param {{ nameEN, nameAR, cityEN, cityAR, latitude, longitude }} form
 * @returns {Object} errors object — empty means valid
 */
export const validateBranchForm = (form) => {
  const errors = {};

  const nameENError = validateBranchName(form.nameEN, "en");
  if (nameENError) errors.nameEN = nameENError;

  const nameARError = validateBranchName(form.nameAR, "ar");
  if (nameARError) errors.nameAR = nameARError;

  const cityENError = validateCityName(form.cityEN, "en");
  if (cityENError) errors.cityEN = cityENError;

  const cityARError = validateCityName(form.cityAR, "ar");
  if (cityARError) errors.cityAR = cityARError;

  const latError = validateLatitude(form.latitude);
  if (latError) errors.latitude = latError;

  const lngError = validateLongitude(form.longitude);
  if (lngError) errors.longitude = lngError;

  return errors;
};
