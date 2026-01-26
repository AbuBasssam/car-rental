import { keys } from "./constants";
export const getAppLanguage = () =>
  localStorage.getItem(keys.kLanguage) ?? keys.kEN;
