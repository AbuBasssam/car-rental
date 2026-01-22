// API Base URL
export const API_BASE_URL = "https://localhost:7137/api/v1";

// API Endpoints
export const AUTH_ENDPOINTS = {
  // Authentication
  SIGN_IN: `${API_BASE_URL}/authentication/signin`,
  SIGN_UP: `${API_BASE_URL}/authentication/signup`,
  LOGOUT_OUT: `${API_BASE_URL}/authentication/logout`,
  REFRESH_TOKEN: `${API_BASE_URL}/authentication/refresh`,

  FORGOT_PASSWORD: `${API_BASE_URL}/authentication/password-reset`,
  VERIFY_PASSWORD: `${API_BASE_URL}/authentication/password-reset-verification`,
  RESET_PASSWORD: `${API_BASE_URL}/authentication/password-reset`,
  RESEND_PASSWORD_RESET: `${API_BASE_URL}/authentication/password-reset/resend`,

  VERIFY_EMAIL: `${API_BASE_URL}/authentication/email-confirmation`,
  RESEND_VERIFICATION: `${API_BASE_URL}/authentication/email-verification/resend`,

  // User
  USER_PROFILE: `${API_BASE_URL}/user/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/user/update`,

  // Bookings
  BOOKINGS: `${API_BASE_URL}/bookings`,
  CREATE_BOOKING: `${API_BASE_URL}/bookings/create`,

  // Vehicles
  VEHICLES: `${API_BASE_URL}/vehicles`,
  VEHICLE_DETAILS: (id) => `${API_BASE_URL}/vehicles/${id}`,
};

// HTTP Methods
export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

// Request Configuration
export const REQUEST_CONFIG = {
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "en",
  },
  credentials: "include", // Important for cookies
};
