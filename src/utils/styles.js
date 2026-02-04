// ========================================================================
// REFACTORED STYLES - Unified Authentication Styles
// ========================================================================
// Version: 2.0
// Last Updated: 2026-01-27
//
// Changes:
// - Extracted common styles to reduce duplication
// - Created shared auth styles object
// - Maintained backward compatibility
// - Improved maintainability and consistency
// ========================================================================

// ========================================================================
// SHARED STYLES - Common across Login & Signup
// ========================================================================

/**
 * Common page container styles
 * Used by both login and signup pages
 */
const sharedPageContainer =
  "min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-white";

/**
 * Common animated background orbs
 * Shared decorative elements for both pages
 */
const sharedAnimatedBackground = {
  base: "absolute inset-0 z-0 overflow-hidden",
  orb1: "absolute rounded-full blur-3xl transition-all duration-1000 bg-gradient-to-r",
  orb2: "absolute rounded-full blur-3xl transition-all duration-1000 bg-gradient-to-r",
  orb3: "absolute rounded-full blur-3xl transition-all duration-1000 bg-gradient-to-r",
};

/**
 * Common back button styles
 * Navigation button shared between pages
 */
const sharedBackButton =
  "absolute z-10 flex items-center gap-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md bg-white dark:bg-white/5 hover:bg-soft-gray dark:hover:bg-white/10 border border-soft-gray dark:border-transparent";

/**
 * Common card decorative elements
 * Background blur orbs for visual enhancement
 */
const sharedCardDecorations = {
  decor1: "absolute rounded-full bg-gradient-to-r blur-2xl z-0",
  decor2: "absolute rounded-full bg-gradient-to-r blur-2xl z-0",
};

/**
 * Common header container styles
 */
const sharedHeaderContainer = "relative z-10 text-center";

/**
 * Common logo container styles
 */
const sharedLogoContainer =
  "mx-auto rounded-full flex items-center justify-center";

/**
 * Common form styles
 * Shared across all authentication forms
 */
const sharedFormStyles = {
  container: "space-y-4",
  inputContainer: "relative z-10",
  inputWrapper: "relative",

  // Icon positioning
  inputIcon:
    "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10",

  // Password visibility toggle
  passwordToggle:
    "absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer transition-colors",

  // Base input field styles (common properties)
  inputBase:
    "w-full pl-10 pr-3 rounded-xl placeholder-opacity-70 border focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm",

  // Submit button base styles
  submitButtonBase:
    "w-full rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 relative overflow-hidden group",

  // Button text
  buttonText: "relative z-10",

  // Button hover effect
  buttonHover:
    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0",
};

/**
 * Common section styles for signin/signup prompts
 */
const sharedSwitchSection = {
  container: "pt-2 border-t text-center",
  text: "text-xs sm:text-sm",
  button:
    "inline-block w-full rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-0.5 bg-transparent border",
};

// ========================================================================
// COMPONENT STYLES
// ========================================================================

export const componentStyles = {
  roundedToggle:
    "absolute top-3 right-6 z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 shadow-sm hover:shadow-md bg-white dark:bg-white/5 hover:bg-soft-gray dark:hover:bg-white/10 border border-soft-gray dark:border-transparent",
};

// ========================================================================
// LOGIN STYLES
// ========================================================================

export const loginStyles = {
  // Page container
  pageContainer: sharedPageContainer + " px-4 sm:px-6 md:px-8",

  // Animated background with specific positioning for login
  animatedBackground: {
    base: sharedAnimatedBackground.base,
    orb1:
      sharedAnimatedBackground.orb1 +
      " top-1/4 left-1/5 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 from-premium-orange/5 to-premium-orange/8 dark:from-orange-400/10 dark:to-orange-600/10",
    orb2:
      sharedAnimatedBackground.orb2 +
      " top-3/4 right-1/4 w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 from-premium-orange/4 to-premium-orange/6 dark:from-orange-300/10 dark:to-orange-500/10",
    orb3:
      sharedAnimatedBackground.orb3 +
      " bottom-1/3 left-2/3 w-28 h-28 sm:w-32 sm:h-32 from-premium-orange/3 to-premium-orange/5 dark:from-orange-200/10 dark:to-orange-400/10",
  },

  // Back button with specific positioning
  backButton:
    sharedBackButton +
    " top-3 left-6 px-3 py-2 sm:px-4 sm:py-3 text-eerie-black dark:text-white",

  // Login card specific styles
  loginCard: {
    container:
      "w-full max-w-md sm:mt-14 pt-10 z-10 transform transition-all duration-500 hover:scale-[1.02]",
    card: "relative overflow-hidden p-6 sm:p-8 rounded-3xl shadow-lg transition-colors duration-500 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-soft-gray dark:border-transparent",

    // Decorations with specific positioning and colors
    decor1:
      sharedCardDecorations.decor1 +
      " -top-8 -right-8 w-24 h-24 sm:w-32 sm:h-32 from-premium-orange/8 to-premium-orange/12 dark:from-orange-400/10 dark:to-orange-500/10",
    decor2:
      sharedCardDecorations.decor2 +
      " -bottom-6 -left-6 w-20 h-20 sm:w-24 sm:h-24 from-premium-orange/6 to-premium-orange/10 dark:from-orange-300/10 dark:to-orange-400/10",

    // Header
    headerContainer: sharedHeaderContainer + " mb-6 sm:mb-8",
    logoContainer: sharedLogoContainer + " mb-4 w-24 h-24 sm:w-28 sm:h-28",
    logoText:
      "flex flex-col items-center text-xl md:text-2xl lg:text-2xl leading-none font-bold tracking-wider text-eerie-black dark:text-white",
    title:
      "text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-premium-orange to-premium-orange/80 dark:from-orange-300 dark:to-white bg-clip-text text-transparent",
    subtitle:
      "mt-1 sm:mt-2 font-light tracking-wider text-xs sm:text-sm text-deep-gray dark:text-orange-300/60",
  },

  // Form styles - login specific
  form: {
    container: sharedFormStyles.container + " sm:space-y-6",
    inputContainer: sharedFormStyles.inputContainer,
    inputWrapper: sharedFormStyles.inputWrapper,
    inputIcon:
      sharedFormStyles.inputIcon + " text-deep-gray dark:text-orange-300/80",

    // Input field with login-specific styling
    input:
      sharedFormStyles.inputBase +
      " py-3 sm:py-4 text-sm sm:text-base bg-white dark:bg-white/5 text-eerie-black dark:text-white/90 placeholder-deep-gray/50 dark:placeholder-orange-200/40 border-mercury dark:border-white/10 focus:ring-premium-orange/30 dark:focus:ring-orange-500/70 focus:border-premium-orange dark:focus:border-transparent",

    passwordToggle:
      sharedFormStyles.passwordToggle +
      " text-deep-gray dark:text-orange-300/80 hover:text-eerie-black dark:hover:text-orange-200/90",

    // Submit button
    submitButton:
      sharedFormStyles.submitButtonBase +
      " py-3 sm:py-4 bg-premium-orange dark:from-orange-500/90 dark:to-orange-600/90 text-white hover:bg-premium-orange/90 dark:hover:from-orange-600/90 dark:hover:to-orange-700/90 focus:ring-premium-orange/50 dark:focus:ring-orange-500/70",

    buttonText:
      sharedFormStyles.buttonText + " cursor-pointer text-sm sm:text-base",
    buttonHover:
      sharedFormStyles.buttonHover +
      " bg-gradient-to-r from-orange-600/20 to-orange-700/20 dark:from-orange-400/50 dark:to-orange-500/50",

    // Forgot password link
    forgotPassword:
      "absolute right-0 my-2 pr-4 text-xs sm:text-sm text-deep-gray dark:text-orange-200/70 hover:text-premium-orange dark:hover:text-orange-300/90 transition-colors duration-300 cursor-pointer",
  },

  // Signup section at bottom
  signupSection:
    sharedSwitchSection.container +
    " mt-6 border-mercury dark:border-white/10 text-xs sm:text-sm",
  signupText:
    sharedSwitchSection.text + " text-deep-gray dark:text-orange-200/70",
  signupButton:
    sharedSwitchSection.button +
    " mt-2 px-4 py-2 border-mercury dark:border-orange-500/50 text-eerie-black dark:text-orange-300/90 hover:bg-soft-gray dark:hover:bg-orange-500/10 hover:border-premium-orange dark:hover:border-orange-500 hover:text-premium-orange dark:hover:text-white/90",
};

// ========================================================================
// SIGNUP STYLES
// ========================================================================

export const signupStyles = {
  // Page container
  pageContainer: sharedPageContainer,

  // Animated background with specific positioning for signup
  animatedBackground: {
    base: sharedAnimatedBackground.base,
    orb1:
      sharedAnimatedBackground.orb1 +
      " top-[10%] sm:top-1/4 left-[5%] sm:left-1/5 w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 from-orange-200/15 to-orange-400/15 dark:from-orange-200/10 dark:to-orange-400/10",
    orb2:
      sharedAnimatedBackground.orb2 +
      " top-[75%] sm:top-3/4 right-[5%] sm:right-1/4 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 from-orange-200/12 to-orange-300/12 dark:from-orange-200/8 dark:to-orange-300/8",
    orb3:
      sharedAnimatedBackground.orb3 +
      " bottom-[15%] sm:bottom-1/3 left-[65%] sm:left-2/3 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 from-orange-100/12 to-orange-300/15 dark:from-orange-100/8 dark:to-orange-300/10",
  },

  // Back button with specific positioning
  backButton:
    sharedBackButton +
    " top-4 sm:top-6 left-4 sm:left-6 gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-3 group shadow-lg hover:shadow-xl bg-white/80 dark:bg-white/5 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-white/10 border-orange-200/30 dark:border-transparent",

  // Signup card specific styles
  signupCard: {
    container:
      "w-full max-w-[90%] sm:max-w-md py-5 sm:py-7 mt-9 z-10 transform transition-all duration-500 hover:scale-[1.02] px-2 sm:px-4",
    card: "rounded-3xl shadow-2xl overflow-hidden p-4 sm:p-6 md:p-8 relative transition-all duration-500 bg-white/95 dark:bg-gradient-to-br dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl border border-orange-200/30 dark:border-gray-700",

    // Decorations with specific positioning and colors
    decor1:
      sharedCardDecorations.decor1 +
      " -top-6 sm:-top-8 -right-6 sm:-right-8 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 from-orange-300/20 to-orange-400/20 dark:from-orange-300/10 dark:to-orange-400/10",
    decor2:
      sharedCardDecorations.decor2 +
      " -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 from-orange-200/15 to-orange-300/20 dark:from-orange-200/8 dark:to-orange-300/10",

    // Header
    headerContainer: sharedHeaderContainer + " mb-6 sm:mb-8",
    logoContainer: sharedLogoContainer + " mb-4 w-24 h-24 sm:w-28 sm:h-28",
    logoText:
      "flex flex-col items-center text-xl md:text-2xl lg:text-2xl leading-none",
    title:
      "text-2xl sm:text-3xl md:text-4xl font-bold mt-2 sm:mt-3 md:mt-4 tracking-tight bg-gradient-to-r from-orange-600 to-orange-500 dark:from-orange-300 dark:to-white bg-clip-text text-transparent",
    subtitle:
      "mt-1 sm:mt-2 text-xs sm:text-sm md:text-base font-light tracking-wider text-orange-600/70 dark:text-orange-300/60",
  },

  // Form styles - signup specific
  form: {
    container: sharedFormStyles.container.replace(
      "space-y-4",
      "space-y-3 sm:space-y-4 md:space-y-5",
    ),
    inputContainer: sharedFormStyles.inputContainer,
    inputWrapper: sharedFormStyles.inputWrapper,
    inputIcon:
      sharedFormStyles.inputIcon +
      " text-orange-600/80 dark:text-orange-300/80",

    // Input field with signup-specific styling
    input:
      sharedFormStyles.inputBase +
      " py-2 sm:py-3 md:py-4 text-xs sm:text-sm bg-orange-50/50 dark:bg-white/5 text-gray-800 dark:text-white/90 placeholder-orange-400/60 dark:placeholder-orange-200/40 border-orange-200/50 dark:border-white/10 focus:ring-orange-500/70",

    passwordToggle:
      sharedFormStyles.passwordToggle +
      " text-orange-600/80 dark:text-orange-300/80 hover:text-orange-700 dark:hover:text-orange-200/90",

    // Checkbox styles
    checkbox:
      "h-4 w-4 sm:h-5 sm:w-5 rounded focus:ring-0 border text-orange-600 border-orange-300 dark:border-gray-500 bg-orange-50 dark:bg-gray-700/30 checked:bg-orange-500 dark:checked:bg-orange-500/80",
    checkboxLabel:
      "ml-2 sm:ml-3 text-xs sm:text-sm text-gray-600 dark:text-orange-200/80 cursor-pointer select-none",
    checkboxLink:
      "font-medium text-orange-600 dark:text-orange-300 hover:underline",

    // Submit button
    submitButton:
      sharedFormStyles.submitButtonBase +
      " py-2 sm:py-3 md:py-4 cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-500/90 dark:to-orange-600/90 text-white hover:from-orange-600 hover:to-orange-700 dark:hover:from-orange-600/90 dark:hover:to-orange-700/90 focus:ring-orange-500/70",

    buttonText:
      sharedFormStyles.buttonText +
      " flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base",
    buttonHover:
      sharedFormStyles.buttonHover +
      " py-1 bg-gradient-to-r from-orange-400/50 to-orange-500/50",
  },

  // Signin section at bottom
  signinSection:
    sharedSwitchSection.container +
    " mt-2 sm:pt-3 border-orange-200/30 dark:border-white/10",
  signinText:
    sharedSwitchSection.text +
    " mb-2 sm:mb-3 md:mb-4 md:text-base text-gray-600 dark:text-orange-200/70",
  signinButton:
    sharedSwitchSection.button +
    " px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 text-xs sm:text-sm md:text-base border-orange-500/50 text-orange-600 dark:text-orange-300/90 hover:bg-orange-500/10 hover:text-orange-700 dark:hover:text-white/90",
};

// ========================================================================
// VERIFY ACCOUNT STYLES
// ========================================================================

export const verifyStyles = {
  // Page container
  pageContainer:
    "min-h-screen bg-authentic-white dark:bg-mirage flex items-center justify-center px-4 py-12",

  // Main wrapper
  wrapper: "w-full max-w-md",

  // Header section
  header: {
    container: "text-center mb-8",
    iconWrapper:
      "inline-flex items-center justify-center w-16 h-16 bg-seashell dark:bg-pickled-bluewood rounded-full mb-4",
    icon: "w-8 h-8 text-premium-orange",
    title:
      "text-3xl font-heading font-bold text-eerie-black dark:text-authentic-white mb-2",
    description: "text-deep-gray dark:text-dark-text-muted font-body",
    email: "text-premium-orange font-semibold mt-1",
  },

  // OTP section
  otp: {
    wrapper: "space-y-6",
    inputsContainer:
      "flex gap-[10px] sm:gap-[14px] justify-center items-center flex-nowrap",
    // OTP input base styles
    input:
      "w-12 h-14 sm:w-14 sm:h-16 text-center font-semibold outline-none transition-all duration-200 text-[clamp(1rem,3vw,1.5rem)] " + // Responsive font size
      "bg-white dark:bg-big-stone border-2 rounded-xl " +
      "text-eerie-black dark:text-authentic-white " +
      "shadow-[0_8px_10px_rgba(0,0,0,0.2)] " + // Base shadow
      "focus:border-premium-orange focus:shadow-[0_0_10px_rgba(255,102,51,0.5)] focus:scale-105",

    inputEmpty: "border-soft-gray dark:border-dark-border",

    inputFilled: "border-premium-orange bg-seashell dark:bg-pickled-bluewood",

    hint: "text-sm text-center text-deep-gray dark:text-dark-text-muted mt-4",
  },

  // Form section
  form: {
    container: "space-y-6",

    // Submit button
    submitButton:
      "w-full py-3 px-4 bg-premium-orange hover:bg-[#e55a2a] text-white font-semibold rounded-xl transition-all duration-300 shadow-orange dark:shadow-dark-soft",
    submitButtonDisabled:
      "bg-soft-gray dark:bg-dark-border cursor-not-allowed opacity-60",
  },

  // Resend section
  resend: {
    container: "mt-8 text-center",
    content: "flex flex-wrap items-center justify-center gap-x-1 gap-y-2",
    timerText: "text-sm text-deep-gray dark:text-dark-text-muted",
    timerValue: "font-semibold text-premium-orange",
    prompt: "text-sm text-deep-gray dark:text-dark-text-muted",
    button:
      "text-sm text-premium-orange hover:text-[#e55a2a] font-semibold transition-colors duration-300 cursor-pointer",
    buttonDisabled: "opacity-50 cursor-not-allowed",
  },
};

// ========================================================================
// UTILITY FUNCTIONS
// ========================================================================

/**
 * Get common auth styles (for reference/debugging)
 * @returns {Object} Common styles object
 */
export const getCommonAuthStyles = () => ({
  pageContainer: sharedPageContainer,
  animatedBackground: sharedAnimatedBackground,
  backButton: sharedBackButton,
  cardDecorations: sharedCardDecorations,
  headerContainer: sharedHeaderContainer,
  logoContainer: sharedLogoContainer,
  formStyles: sharedFormStyles,
  switchSection: sharedSwitchSection,
});

/**
 * Merge custom styles with base styles
 * @param {Object} baseStyles - Base style object
 * @param {Object} customStyles - Custom overrides
 * @returns {Object} Merged styles
 */
export const mergeAuthStyles = (baseStyles, customStyles = {}) => {
  return {
    ...baseStyles,
    ...customStyles,
  };
};

export const navbarStyles = {
  header:
    "fixed top-0 w-full bg-white dark:bg-pickled-bluewood border-b shadow-sm z-50 border-gray-100 dark:border-eerie-black transition-colors duration-300",
  navContainer:
    "max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between",

  userMenu: {
    trigger:
      "flex items-center gap-2 p-1.5 pr-3 rounded-full bg-authentic-white dark:bg-big-stone hover:bg-soft-gray dark:hover:bg-fiord transition-all duration-300 border border-transparent hover:border-soft-gray dark:hover:border-fiord group",
    avatarWrapper:
      "bg-white dark:bg-pickled-bluewood rounded-full p-1 shadow-sm group-hover:scale-105 transition-transform duration-300",
    userName:
      "hidden sm:inline-block text-sm font-medium max-w-[120px] truncate text-deep-gray dark:text-premium-orange transition-colors",
    chevron:
      "text-deep-gray/50 dark:text-soft-gray/50 group-hover:text-premium-orange transition-all",

    avatarIcon: "text-deep-gray dark:text-premium-orange",
  },

  mobileMenu: {
    container:
      "md:hidden bg-white dark:bg-pickled-bluewood border-t border-gray-100 dark:border-eerie-black shadow-lg animate-slideDown",
    wrapper: "flex flex-col px-6 py-6 gap-6",
    userSection:
      "flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-fiord/50",
    userAvatar:
      "bg-soft-gray dark:bg-fiord p-2 rounded-full text-premium-orange",
    userName:
      "font-heading text-lg font-semibold text-deep-gray dark:text-premium-orange",
    link: "font-heading text-lg text-deep-gray dark:text-soft-gray hover:text-premium-orange transition-colors text-left  cursor-pointer",
    logoutBtn:
      "font-heading text-lg text-red-600 hover:text-red-400 transition-colors text-left flex items-center gap-2  cursor-pointer",
  },

  actionButtons: "hidden md:flex items-center gap-4",
  mobileToggle:
    "p-2 rounded-lg hover:bg-soft-gray dark:hover:bg-fiord transition-colors text-dark-gray dark:text-white",
};
export const arabicTextAdjustment = {
  fontSize: "1.5rem",
  lineHeight: "1.3",
  whiteSpace: "normal",
  wordWrap: "break-word",
  maxWidth: "100%",
};
