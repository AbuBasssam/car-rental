import axios from "axios";

// ============================================
// 🌐 API CONFIGURATION
// ============================================

/**
 * API Base URL from environment variables
 * Make sure to set VITE_API_BASE_URL in your .env file
 */
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://localhost:7137/api/v1";

// ============================================
// 📡 CREATE AXIOS INSTANCE
// ============================================

/**
 * Axios instance configured for authentication
 *
 * CRITICAL SETTINGS:
 * - withCredentials: true -> Automatically sends httpOnly cookies with every request
 * - baseURL: All requests will be prefixed with this URL
 * - headers: Default headers for all requests
 */
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // ⚠️ CRITICAL: This enables httpOnly cookie handling
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================
// 📤 EXPORTS
// ============================================

export default axiosInstance;
export { API_BASE_URL };
