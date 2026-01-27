export const loginStyles = {
  pageContainer: `min-h-screen flex items-center justify-center relative
overflow-hidden transition-colors duration-500 bg-gradient-to-br
from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 sm:px-6 md:px-8 text-gray-800
dark:text-white`,
  animatedBackground: {
    base: "absolute inset-0 z-0 overflow-hidden",
    orb1: "absolute top-1/4 left-1/5 rounded-full blur-3xl transition-all duration-1000 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-gradient-to-r from-premium-orange/5 to-premium-orange/8 dark:from-orange-400/10 dark:to-orange-600/10",
    orb2: "absolute top-3/4 right-1/4 rounded-full blur-3xl transition-all duration-1000 w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 bg-gradient-to-r from-premium-orange/4 to-premium-orange/6 dark:from-orange-300/10 dark:to-orange-500/10",
    orb3: "absolute bottom-1/3 left-2/3 rounded-full blur-3xl transition-all duration-1000 w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-r from-premium-orange/3 to-premium-orange/5 dark:from-orange-200/10 dark:to-orange-400/10",
  },

  backButton:
    "absolute top-3 left-6 z-10 flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-full transition-all duration-300 shadow-sm hover:shadow-md bg-white dark:bg-white/5 text-eerie-black dark:text-white hover:bg-soft-gray dark:hover:bg-white/10 border border-soft-gray dark:border-transparent",

  loginCard: {
    container:
      "w-full max-w-md sm:mt-14 pt-10 z-10 transform transition-all duration-500 hover:scale-[1.02]",
    card: "relative overflow-hidden p-6 sm:p-8 rounded-3xl shadow-lg transition-colors duration-500 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-soft-gray dark:border-transparent",
    decor1:
      "absolute -top-8 -right-8 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-premium-orange/8 to-premium-orange/12 dark:from-orange-400/10 dark:to-orange-500/10 blur-2xl z-0",
    decor2:
      "absolute -bottom-6 -left-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-premium-orange/6 to-premium-orange/10 dark:from-orange-300/10 dark:to-orange-400/10 blur-2xl z-0",
    headerContainer: "relative z-10 text-center mb-6 sm:mb-8",
    logoContainer:
      "mx-auto mb-4 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center",
    logoText:
      "flex flex-col items-center text-xl md:text-2xl lg:text-2xl leading-none font-bold tracking-wider text-eerie-black dark:text-white",
    title:
      "text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-premium-orange to-premium-orange/80 dark:from-orange-300 dark:to-white bg-clip-text text-transparent",
    subtitle:
      "mt-1 sm:mt-2 font-light tracking-wider text-xs sm:text-sm text-deep-gray dark:text-orange-300/60",
  },

  form: {
    container: "space-y-4 sm:space-y-6",
    inputContainer: "relative z-10",
    inputWrapper: "relative",
    inputIcon:
      "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-deep-gray dark:text-orange-300/80 z-10",
    input:
      "w-full pl-10 pr-3 py-3 sm:py-4 rounded-xl text-sm sm:text-base placeholder-opacity-70 border transition duration-300 focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-white/5 backdrop-blur-sm text-eerie-black dark:text-white/90 placeholder-deep-gray/50 dark:placeholder-orange-200/40 border-mercury dark:border-white/10 focus:ring-premium-orange/30 dark:focus:ring-orange-500/70 focus:border-premium-orange dark:focus:border-transparent",

    passwordToggle:
      "absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer transition-colors text-deep-gray dark:text-orange-300/80 hover:text-eerie-black dark:hover:text-orange-200/90",
    submitButton:
      "w-full py-3 sm:py-4 rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 relative overflow-hidden group bg-premium-orange dark:from-orange-500/90 dark:to-orange-600/90 text-white hover:bg-premium-orange/90 dark:hover:from-orange-600/90 dark:hover:to-orange-700/90 focus:ring-premium-orange/50 dark:focus:ring-orange-500/70",
    buttonText: "relative cursor-pointer z-10 text-sm sm:text-base",
    buttonHover:
      "absolute inset-0 transition-opacity duration-300 z-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-orange-600/20 to-orange-700/20 dark:from-orange-400/50 dark:to-orange-500/50",
    forgotPassword:
      "absolute right-0 my-2 pr-4 text-xs sm:text-sm text-deep-gray dark:text-orange-200/70 hover:text-premium-orange dark:hover:text-orange-300/90 transition-colors duration-300 cursor-pointer",
  },

  signupSection:
    "mt-6 pt-6 border-t border-mercury dark:border-white/10 text-center text-xs sm:text-sm",
  signupText: "text-deep-gray dark:text-orange-200/70",
  signupButton:
    "inline-block mt-2 w-full cursor-pointer px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-0.5 bg-transparent border border-mercury dark:border-orange-500/50 text-eerie-black dark:text-orange-300/90 hover:bg-soft-gray dark:hover:bg-orange-500/10 hover:border-premium-orange dark:hover:border-orange-500 hover:text-premium-orange dark:hover:text-white/90",
};
export const componentStyles = {
  roundedToggle: `absolute top-3 right-6 z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 shadow-sm hover:shadow-md bg-white dark:bg-white/5 hover:bg-soft-gray dark:hover:bg-white/10 border border-soft-gray dark:border-transparent`,
};
export const signupStyles = {
  pageContainer:
    "min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-white",

  animatedBackground: {
    base: "absolute inset-0 z-0 overflow-hidden",
    orb1: "absolute top-[10%] sm:top-1/4 left-[5%] sm:left-1/5 w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full transition-all duration-1000 bg-gradient-to-r from-orange-200/15 to-orange-400/15 dark:from-orange-200/10 dark:to-orange-400/10 blur-3xl",
    orb2: "absolute top-[75%] sm:top-3/4 right-[5%] sm:right-1/4 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full transition-all duration-1000 bg-gradient-to-r from-orange-200/12 to-orange-300/12 dark:from-orange-200/8 dark:to-orange-300/8 blur-3xl",
    orb3: "absolute bottom-[15%] sm:bottom-1/3 left-[65%] sm:left-2/3 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full transition-all duration-1000 bg-gradient-to-r from-orange-100/12 to-orange-300/15 dark:from-orange-100/8 dark:to-orange-300/10 blur-3xl",
  },

  backButton:
    "absolute top-4 sm:top-6 left-4 sm:left-6 z-10 flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-full transition-all duration-300 group shadow-lg hover:shadow-xl bg-white/80 dark:bg-white/5 text-gray-700 dark:text-white hover:bg-white dark:hover:bg-white/10 border border-orange-200/30 dark:border-transparent",

  signupCard: {
    container:
      "w-full max-w-[90%] sm:max-w-md py-5 sm:py-7 mt-9 z-10 transform transition-all duration-500 hover:scale-[1.02] px-2 sm:px-4",
    card: "rounded-3xl shadow-2xl overflow-hidden p-4 sm:p-6 md:p-8 relative transition-all duration-500 bg-white/95 dark:bg-gradient-to-br dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl border border-orange-200/30 dark:border-gray-700",
    decor1:
      "absolute -top-6 sm:-top-8 -right-6 sm:-right-8 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-orange-300/20 to-orange-400/20 dark:from-orange-300/10 dark:to-orange-400/10 blur-2xl z-0",
    decor2:
      "absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-orange-200/15 to-orange-300/20 dark:from-orange-200/8 dark:to-orange-300/10 blur-2xl z-0",
    headerContainer: "relative z-10 text-center mb-6 sm:mb-8",
    logoContainer:
      "mx-auto mb-4 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center",
    logoText:
      "flex flex-col items-center text-xl md:text-2xl lg:text-2xl leading-none",
    title:
      "text-2xl sm:text-3xl md:text-4xl font-bold mt-2 sm:mt-3 md:mt-4 tracking-tight bg-gradient-to-r from-orange-600 to-orange-500 dark:from-orange-300 dark:to-white bg-clip-text text-transparent",
    subtitle:
      "mt-1 sm:mt-2 text-xs sm:text-sm md:text-base font-light tracking-wider text-orange-600/70 dark:text-orange-300/60",
  },

  form: {
    container: "space-y-3 sm:space-y-4 md:space-y-5",
    inputContainer: "relative z-10",
    inputWrapper: "relative",
    inputIcon:
      "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-orange-600/80 dark:text-orange-300/80 z-10",
    input:
      "w-full pl-10 pr-3 py-2 sm:py-3 md:py-4 rounded-xl text-xs sm:text-sm placeholder-opacity-70 border focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 bg-orange-50/50 dark:bg-white/5 backdrop-blur-sm text-gray-800 dark:text-white/90 placeholder-orange-400/60 dark:placeholder-orange-200/40 border-orange-200/50 dark:border-white/10 focus:ring-orange-500/70",
    passwordToggle:
      "absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer transition-colors text-orange-600/80 dark:text-orange-300/80 hover:text-orange-700 dark:hover:text-orange-200/90",
    checkbox:
      "h-4 w-4 sm:h-5 sm:w-5 rounded focus:ring-0 border text-orange-600 border-orange-300 dark:border-gray-500 bg-orange-50 dark:bg-gray-700/30 checked:bg-orange-500 dark:checked:bg-orange-500/80",
    checkboxLabel:
      "ml-2 sm:ml-3 text-xs sm:text-sm text-gray-600 dark:text-orange-200/80 cursor-pointer select-none",
    checkboxLink:
      "font-medium text-orange-600 dark:text-orange-300 hover:underline",
    submitButton:
      "w-full py-2 sm:py-3 md:py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 relative overflow-hidden group bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-500/90 dark:to-orange-600/90 text-white hover:from-orange-600 hover:to-orange-700 dark:hover:from-orange-600/90 dark:hover:to-orange-700/90 focus:ring-orange-500/70",
    buttonText:
      "relative z-10 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base",
    buttonHover:
      "absolute inset-0 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 bg-gradient-to-r from-orange-400/50 to-orange-500/50",
  },

  signinSection:
    "mt-2 pt-2 sm:pt-3 border-t border-orange-200/30 dark:border-white/10 text-center",
  signinText:
    "mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base text-gray-600 dark:text-orange-200/70",
  signinButton:
    "inline-block w-full px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-0.5 text-xs sm:text-sm md:text-base bg-transparent border border-orange-500/50 text-orange-600 dark:text-orange-300/90 hover:bg-orange-500/10 hover:text-orange-700 dark:hover:text-white/90",
};
// w-full pl-10 pr-3 py-2 sm:py-3 md:py-4 rounded-xl text-xs sm:text-sm placeholder-opacity-70 border focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 bg-orange-50/50 dark:bg-white/5 backdrop-blur-sm text-gray-800 dark:text-white/90 placeholder-orange-400/60 dark:placeholder-orange-200/40 border-orange-200/50 dark:border-white/10 focus:ring-orange-500/70w-full pl-10 pr-3 py-2 sm:py-3 md:py-4 rounded-xl text-xs sm:text-sm placeholder-opacity-70 border focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 bg-orange-50/50 dark:bg-white/5 backdrop-blur-sm text-gray-800 dark:text-white/90 placeholder-orange-400/60 dark:placeholder-orange-200/40 border-orange-200/50 dark:border-white/10 focus:ring-orange-500/70

// w-full pl-10 pr-3 py-3 sm:py-4 rounded-xl text-sm sm:text-base placeholder-opacity-70 border transition duration-300 focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-white/5 backdrop-blur-sm text-eerie-black dark:text-white/90 placeholder-deep-gray/50 dark:placeholder-orange-200/40 border-mercury dark:border-white/10 focus:ring-premium-orange/30 dark:focus:ring-orange-500/70 focus:border-premium-orange dark:focus:border-transparent
