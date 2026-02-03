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
 * Updated specialized functions to accept translated messages
 */
export const showLoginSuccessToast = (message, options = {}) => {
  toast.success(message, {
    ...defaultToastConfig,
    ...options,
  });
};

export const showNetworkErrorToast = (message, options = {}) => {
  toast.error(message, {
    ...defaultToastConfig,
    autoClose: 7000,
    ...options,
  });
};
