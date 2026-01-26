// src/hooks/useClickOutside.js
import { useEffect, useRef } from "react";

/**
 * Hook لإغلاق العنصر عند الضغط خارجه
 * @param {Function} handler - الدالة التي تُنفذ عند الضغط خارج العنصر
 * @param {boolean} active - تفعيل أو تعطيل المراقبة (افتراضياً true)
 * @returns {RefObject} - ref للعنصر المراد مراقبته
 *
 * @example
 * const dropdownRef = useClickOutside(() => setIsOpen(false));
 * return <div ref={dropdownRef}>...</div>
 */
export const useClickOutside = (handler, active = true) => {
  const ref = useRef(null);

  useEffect(() => {
    // إذا كانت المراقبة غير نشطة، لا تفعل شيء
    if (!active) return;

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    // استخدام mousedown بدلاً من click لتجنب مشاكل التوقيت
    document.addEventListener("mousedown", handleClickOutside);

    // دعم اللمس على الأجهزة المحمولة
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [handler, active]);

  return ref;
};

export default useClickOutside;
