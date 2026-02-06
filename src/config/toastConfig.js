import { toast } from "react-toastify";

/**
 * Default Toast Configuration
 */
export const defaultToastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

/**
 * Show error toast with RTL support
 * @param {string} message - The error message
 * @param {Object} options - Additional options including rtl flag
 */
export const showErrorToast = (message, options = {}) => {
  toast.error(message, {
    ...defaultToastConfig,
    ...options,
  });
};

/**
 * Show success toast with RTL support
 * @param {string} message - The success message
 * @param {Object} options - Additional options including rtl flag
 */
export const showSuccessToast = (message, options = {}) => {
  toast.success(message, {
    ...defaultToastConfig,
    ...options,
  });
};

/**
 * Show info toast with a custom 6-second duration
 * This ensures that even if you pass other options (like position),
 * the autoClose duration remains 6000ms unless explicitly overwritten.
 * @param {string} message - The info message to display
 * @param {Object} [options={}] - Additional toast options
 */
export const showInfoToast = (message, options = {}) => {
  toast.info(message, {
    ...defaultToastConfig,
    autoClose: 6000,
    ...options,
  });
};
