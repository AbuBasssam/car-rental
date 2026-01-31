import { validationKeys } from "../utils/localeKeys";
// ============================================
// 🔧 VALIDATION CONSTANTS
// ============================================

export const VALIDATION_CONSTANTS = {
  EMAIL_MAX_LENGTH: 256,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 16,
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 50,
};

// ============================================
// 📧 EMAIL VALIDATION
// ============================================

/**
 * Validate Email Address
 * Rules: Required, Valid Format, Max Length
 *
 * @param {string} email - Email to validate
 * @returns {Object|null} { key: string, params?: object } or null if valid
 *
 * @example
 * const error = validateEmail(email);
 * if (error) {
 *   const message = t(error.key, error.params);
 * }
 */
export const validateEmail = (email) => {
  // Required validation
  if (!email || email.trim() === "") {
    return { key: validationKeys.emailRequired };
  }

  // Email format validation (RFC 5322 simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { key: validationKeys.emailInvalid };
  }

  // Max length validation
  if (email.length > VALIDATION_CONSTANTS.EMAIL_MAX_LENGTH) {
    return {
      key: validationKeys.emailMaxLength,
      params: { max: VALIDATION_CONSTANTS.EMAIL_MAX_LENGTH },
    };
  }

  return null;
};

// ============================================
// 🔑 PASSWORD VALIDATION
// ============================================

/**
 * Validate Password (Basic - for Login)
 * Rules: Required only
 *
 * @param {string} password - Password to validate
 * @returns {Object|null} { key: string } or null if valid
 */
export const validatePassword = (password) => {
  if (!password || password.trim() === "") {
    return { key: validationKeys.passwordRequired };
  }
  return null;
};

/**
 * Check Password Requirements (for UI display)
 * Returns detailed requirements status for PasswordRequirements component
 *
 * @param {string} password - Password to check
 * @returns {Object} Requirements object with individual checks
 *
 * @example
 * const requirements = checkPasswordRequirements("MyPass123!");
 * Returns: { length: true, uppercase: true, lowercase: true, number: true, special: true }
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
 * Uses validatePassword for basic check, then checks requirements
 * Returns validation result with requirements details
 *
 * @param {string} password - Password to validate
 * @returns {Object} { isValid: boolean, requirements: object, error: object|null }
 *
 * @example
 * const result = validateStrongPassword("weak");
 * if (!result.isValid && result.error) {
 *   const message = t(result.error.key);
 * }
 */
export const validateStrongPassword = (password) => {
  // Use validatePassword for basic required check
  const basicError = validatePassword(password);

  if (basicError) {
    return {
      isValid: false,
      requirements: checkPasswordRequirements(""),
      error: basicError,
    };
  }

  // Get detailed requirements
  const requirements = checkPasswordRequirements(password);

  // Check if all requirements are met
  const allRequirementsMet = Object.values(requirements).every(
    (req) => req === true,
  );

  return {
    isValid: allRequirementsMet,
    requirements,
    error: allRequirementsMet ? null : { key: validationKeys.passwordInvalid },
  };
};

// ============================================
// 👤 NAME VALIDATION
// ============================================

/**
 * Validate Name (First/Last Name)
 * Rules: Required, Min/Max Length, Letters and spaces only
 *
 * @param {string} name - Name to validate
 * @param {string} fieldKey - Translation key for field name (e.g., 'validation.first_name')
 * @returns {Object|null} { key: string, params: object } or null if valid
 *
 * @example
 * const error = validateName(firstName, 'validation.first_name');
 * if (error) {
 *   const message = t(error.key, error.params);
 * }
 */
export const validateName = (name, fieldKey) => {
  if (!name || name.trim() === "") {
    return {
      key: validationKeys.nameRequired,
      params: { field: fieldKey },
    };
  }

  if (name.length < VALIDATION_CONSTANTS.NAME_MIN_LENGTH) {
    return {
      key: validationKeys.nameMinLength,
      params: {
        field: fieldKey,
        min: VALIDATION_CONSTANTS.NAME_MIN_LENGTH,
      },
    };
  }

  if (name.length > VALIDATION_CONSTANTS.NAME_MAX_LENGTH) {
    return {
      key: validationKeys.nameMaxLength,
      params: {
        field: fieldKey,
        max: VALIDATION_CONSTANTS.NAME_MAX_LENGTH,
      },
    };
  }

  // Only letters and spaces
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(name)) {
    return {
      key: validationKeys.nameInvalid,
      params: { field: fieldKey },
    };
  }

  return null;
};

// ============================================
// 🔄 OTHER VALIDATIONS
// ============================================

/**
 * Validate Passwords Match (for Signup)
 *
 * @param {string} password - Password
 * @param {string} confirmPassword - Confirm password
 * @returns {Object|null} { key: string } or null if valid
 */
export const validatePasswordsMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return { key: validationKeys.passwordsNotMatch };
  }
  return null;
};

/**
 * Validate Terms Acceptance
 *
 * @param {boolean} accepted - Whether terms are accepted
 * @returns {Object|null} { key: string } or null if valid
 */
export const validateTermsAcceptance = (accepted) => {
  if (!accepted) {
    return { key: validationKeys.termsRequired };
  }
  return null;
};
/**
 * Validate OTP Code
 * @param {string} code verification code
 * @returns {Object|null}
 */
export const validateOTP = (code) => {
  if (!code || code.length < 6) {
    return { key: validationKeys.otpIncomplete };
  }
  return null;
};
