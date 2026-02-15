import axios from "axios";

// Base API configuration
// In development, Vite proxy will forward /api to http://localhost:3000
// In production, set VITE_API_BASE_URL environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
    "X-User-Id": "assessment-user",
  },
});

// Request interceptor (optional - for adding auth tokens, etc.)
api.interceptors.request.use(
  (config) => {
    // Add any request modifications here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for HTTP-level error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Enhance error object with useful info
    const enhancedError = {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      isNetworkError: !error.response,
    };

    if (process.env.NODE_ENV === "development") {
      console.error("API Error:", enhancedError);
    }

    // Return enhanced error, let caller handle UI
    return Promise.reject(enhancedError);
  },
);

export default api;
