// Validation Constants
export const VALIDATION_CONSTANTS = {
  EMAIL_MAX_LENGTH: 256,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 16,
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 50,
};

// Email Validation Messages
export const EMAIL_MESSAGES = {
  REQUIRED: "Email is required",
  INVALID_FORMAT: "Invalid email format",
  MAX_LENGTH: `Email must not exceed ${VALIDATION_CONSTANTS.EMAIL_MAX_LENGTH} characters`,
};

// Password Validation Messages
export const PASSWORD_MESSAGES = {
  REQUIRED: "Password is required",
  MIN_LENGTH: `Password must be at least ${VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH} characters`,
  MAX_LENGTH: `Password must not exceed ${VALIDATION_CONSTANTS.PASSWORD_MAX_LENGTH} characters`,
  WEAK: "Password must contain uppercase, lowercase, number and special character",
};

// Name Validation Messages
export const NAME_MESSAGES = {
  REQUIRED: "This field is required",
  MIN_LENGTH: `Must be at least ${VALIDATION_CONSTANTS.NAME_MIN_LENGTH} characters`,
  MAX_LENGTH: `Must not exceed ${VALIDATION_CONSTANTS.NAME_MAX_LENGTH} characters`,
  INVALID_FORMAT: "Only letters and spaces are allowed",
};

/**
 * Validate Email Address
 * Rules: Required, Valid Format, Max Length
 */
export const validateEmail = (email) => {
  // Required validation
  if (!email || email.trim() === "") {
    return EMAIL_MESSAGES.REQUIRED;
  }

  // Email format validation (RFC 5322 simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return EMAIL_MESSAGES.INVALID_FORMAT;
  }

  // Max length validation
  if (email.length > VALIDATION_CONSTANTS.EMAIL_MAX_LENGTH) {
    return EMAIL_MESSAGES.MAX_LENGTH;
  }

  return "";
};

/**
 * Validate Password (Basic - for Login)
 * Rules: Required only
 */
export const validatePassword = (password) => {
  if (!password || password.trim() === "") {
    return PASSWORD_MESSAGES.REQUIRED;
  }
  return "";
};

/**
 * Validate Strong Password (for Signup/Reset)
 * Rules: Required, Min Length, Contains uppercase, lowercase, number, special char
 */
export const validateStrongPassword = (password) => {
  if (!password || password.trim() === "") {
    return PASSWORD_MESSAGES.REQUIRED;
  }

  if (password.length < VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH) {
    return PASSWORD_MESSAGES.MIN_LENGTH;
  }

  if (password.length > VALIDATION_CONSTANTS.PASSWORD_MAX_LENGTH) {
    return PASSWORD_MESSAGES.MAX_LENGTH;
  }

  // Check for strong password (uppercase, lowercase, number, special char)
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
    return PASSWORD_MESSAGES.WEAK;
  }

  return "";
};

/**
 * Validate Name (First/Last Name)
 * Rules: Required, Min/Max Length, Letters and spaces only
 */
export const validateName = (name, fieldName = "Name") => {
  if (!name || name.trim() === "") {
    return `${fieldName} ${NAME_MESSAGES.REQUIRED}`;
  }

  if (name.length < VALIDATION_CONSTANTS.NAME_MIN_LENGTH) {
    return `${fieldName} ${NAME_MESSAGES.MIN_LENGTH}`;
  }

  if (name.length > VALIDATION_CONSTANTS.NAME_MAX_LENGTH) {
    return `${fieldName} ${NAME_MESSAGES.MAX_LENGTH}`;
  }

  // Only letters and spaces
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(name)) {
    return `${fieldName} ${NAME_MESSAGES.INVALID_FORMAT}`;
  }

  return "";
};

/**
 * Validate Passwords Match (for Signup)
 */
export const validatePasswordsMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return "";
};

/**
 * Validate Terms Acceptance
 */
export const validateTermsAcceptance = (accepted) => {
  if (!accepted) {
    return "You must accept the terms and conditions";
  }
  return "";
};
