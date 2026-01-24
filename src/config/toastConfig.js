import { toast } from "react-toastify";

/**
 * Default Toast Configuration
 * Can be used in ToastContainer
 */
export const defaultToastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "colored",
};

/**
 * Toast Helper Functions
 * Use them instead of toast.success/error directly for unified settings
 */

/**
 * Show success toast
 * @param {string} message - Success message
 * @param {Object} options - Additional options (optional)
 */
export const showSuccessToast = (message, options = {}) => {
  toast.success(message, {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    ...options,
  });
};

/**
 * Show error toast
 * @param {string} message - Error message
 * @param {Object} options - Additional options (optional)
 */
export const showErrorToast = (message, options = {}) => {
  toast.error(message, {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    ...options,
  });
};

/**
 * Show info toast
 * @param {string} message - Info message
 * @param {Object} options - Additional options (optional)
 */
export const showInfoToast = (message, options = {}) => {
  toast.info(message, {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    ...options,
  });
};

/**
 * Show warning toast
 * @param {string} message - Warning message
 * @param {Object} options - Additional options (optional)
 */
export const showWarningToast = (message, options = {}) => {
  toast.warning(message, {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    ...options,
  });
};

/**
 * Show loading toast
 * @param {string} message - Loading message
 * @returns {number} - Toast ID for future updates
 */
export const showLoadingToast = (message = "Loading...") => {
  return toast.loading(message, {
    position: "top-right",
    theme: "colored",
  });
};

/**
 * Update existing toast
 * @param {number} toastId - Toast ID من showLoadingToast
 * @param {string} message - The new message
 * @param {string} type - 'success' | 'error' | 'info' | 'warning'
 * @param {Object} options - Additional options (optional)
 */
export const updateToast = (
  toastId,
  message,
  type = "success",
  options = {},
) => {
  toast.update(toastId, {
    render: message,
    type: type,
    isLoading: false,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    ...options,
  });
};

/**
 * Toast configuration for specific scenarios
 */

// Login success toast (with callback)
export const showLoginSuccessToast = (onClose) => {
  toast.success("Login Successful! Welcome back", {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    onClose: onClose, // callback when closing the toast
  });
};

// Logout success toast
export const showLogoutSuccessToast = () => {
  toast.success("Logged out successfully", {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

// Network error toast
export const showNetworkErrorToast = () => {
  toast.error("Network error. Please check your connection.", {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    autoClose: 7000, // longer duration for network issues
  });
};

// Session expired toast
export const showSessionExpiredToast = () => {
  toast.warning("Your session has expired. Please login again.", {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    autoClose: 7000,
  });
};

/**
 * Promise-based toast
 * Helps with async operations
 *
 * @example
 * showPromiseToast(
 *   apiCall(),
 *   'Loading...',
 *   'Success!',
 *   'Failed!'
 * );
 */
export const showPromiseToast = (
  promise,
  pendingMessage = "Loading...",
  successMessage = "Success!",
  errorMessage = "Something went wrong!",
) => {
  return toast.promise(promise, {
    pending: {
      render: pendingMessage,
      position: "top-right",
      theme: "colored",
    },
    success: {
      render: successMessage,
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    },
    error: {
      render: errorMessage,
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    },
  });
};
