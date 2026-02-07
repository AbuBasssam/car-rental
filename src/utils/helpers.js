import { keys } from "./constants";
export const getAppLanguage = () =>
  localStorage.getItem(keys.kLanguage) ?? keys.kEN;
/**
 * Transforms an error object with parameters into a localized string.
 * Supports param1 as a translation key (for field names) or a raw value.
 */
export const getErrorMessage = (errorObj, t) => {
  if (!errorObj) return null;
  if (typeof errorObj === "string") return errorObj.split(",")[0];

  const { key, params } = errorObj;
  if (!params) return t(key);

  // Normalizing parameter naming (supporting both 'param' and 'parm')
  const p1 = params.param1 || params.parm1;
  const p2 = params.param2 || params.parm2;

  const interpolationData = {
    // Translate p1 if it represents a field key, otherwise use as raw value
    param1: typeof p1 === "string" ? t(p1) : p1,
    ...(p2 !== undefined && { param2: p2 }),
  };

  return t(key, interpolationData);
};
