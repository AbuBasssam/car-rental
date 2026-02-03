import { useEffect } from "react";

/**
 * Custom hook to lock/unlock body scroll.
 * Useful for mobile menus, modals, and overlays.
 * @param {boolean} isLocked - Whether the scroll should be disabled.
 */
export const useScrollLock = (isLocked) => {
  useEffect(() => {
    // Select the body element
    const body = document.body;

    if (isLocked) {
      // Prevent scrolling when locked
      body.style.overflow = "hidden";
    } else {
      // Restore scrolling when unlocked
      body.style.overflow = "unset";
    }

    // Cleanup function: Ensure scroll is restored when component unmounts
    return () => {
      body.style.overflow = "unset";
    };
  }, [isLocked]);
};

export default useScrollLock;
