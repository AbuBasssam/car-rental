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
