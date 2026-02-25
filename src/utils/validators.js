import { validationKeys } from "../utils/localeKeys";

export const VALIDATION_CONSTANTS = {
  EMAIL_MAX_LENGTH: 256,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 16,
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 50,
  OTP_LENGTH: 6,
  BRANCH_NAME_MAX_LENGTH: 75,
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
 * Validates a branch name (English or Arabic).
 * Returns a structured validation result using branchKeys — no hardcoded strings.
 * @param {string} value
 * @returns {{ key: string, params: Object|null }|null}
 */
export const validateBranchName = (value) => {
  if (!value || !value.trim()) {
    return validationResult(validationKeys.branchNameRequired);
  }

  if (value.trim().length > VALIDATION_CONSTANTS.BRANCH_NAME_MAX_LENGTH) {
    return validationResult(validationKeys.validationNameMax, {
      max: VALIDATION_CONSTANTS.BRANCH_NAME_MAX_LENGTH,
    });
  }

  return null;
};

/**
 * Validates a city name (English or Arabic).
 * Returns a structured validation result using branchKeys — no hardcoded strings.
 * @param {string} value
 * @returns {{ key: string, params: Object|null }|null}
 */
export const validateCityName = (value) => {
  if (!value || !value.trim()) {
    return validationResult(validationKeys.cityRequired);
  }
  if (value.trim().length > VALIDATION_CONSTANTS.BRANCH_NAME_MAX_LENGTH) {
    return validationResult(validationKeys.validationNameMax, {
      max: VALIDATION_CONSTANTS.BRANCH_NAME_MAX_LENGTH,
    });
  }
  return null;
};

/**
 * Validates a GPS latitude value (must be a number between −90 and 90).
 * @param {string|number} value
 * @returns {{ key: string, params: Object|null }|null}
 */
export const validateLatitude = (value) => {
  const lat = parseFloat(value);
  if (isNaN(lat) || lat < -90 || lat > 90) {
    return validationResult(validationKeys.latInvalid);
  }
  return null;
};

/**
 * Validates a GPS longitude value (must be a number between −180 and 180).
 * @param {string|number} value
 * @returns {{ key: string, params: Object|null }|null}
 */
export const validateLongitude = (value) => {
  const lng = parseFloat(value);
  if (isNaN(lng) || lng < -180 || lng > 180) {
    return validationResult(validationKeys.lngInvalid);
  }
  return null;
};

/**
 * Validates the full branch form object.
 * All individual validators use branchKeys — fully i18n-compatible.
 * @param {{ nameEN: string, nameAR: string, cityEN: string, cityAR: string, latitude: string|number, longitude: string|number }} form
 * @returns {Object} Errors map — empty object means the form is valid
 */
export const validateBranchForm = (form) => {
  const errors = {};

  const nameENError = validateBranchName(form.nameEN);
  if (nameENError) errors.nameEN = nameENError;

  const nameARError = validateBranchName(form.nameAR);
  if (nameARError) errors.nameAR = nameARError;

  const cityENError = validateCityName(form.cityEN);
  if (cityENError) errors.cityEN = cityENError;

  const cityARError = validateCityName(form.cityAR);
  if (cityARError) errors.cityAR = cityARError;

  const latError = validateLatitude(form.latitude);
  if (latError) errors.latitude = latError;

  const lngError = validateLongitude(form.longitude);
  if (lngError) errors.longitude = lngError;

  return errors;
};
