// src/utils/flashService.js

import { keys, flashMessageType } from "./constants";

export const setFlashMessage = (messageKey, type = flashMessageType.info) => {
  const data = JSON.stringify({ messageKey, type });
  sessionStorage.setItem(keys.kFlashMessage, data);
};

export const getAndClearFlashMessage = () => {
  const data = sessionStorage.getItem(keys.kFlashMessage);
  if (data) {
    sessionStorage.removeItem(keys.kFlashMessage);
    return JSON.parse(data);
  }
  return null;
};
