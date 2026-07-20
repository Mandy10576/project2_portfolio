/**
 * Central Axios API Client Service
 * --------------------------------
 * Handles HTTP requests to the Express backend API.
 * Uses environment variable `VITE_API_URL`.
 * Automatically injects the JWT auth token into Authorization headers.
 */
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token if logged in
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Unauthorized (401) global session expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If token is invalid or expired, clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// Helper function to resolve image URLs (handles relative /uploads paths & external URLs)
export const resolveImageUrl = (imageUrl) => {
  if (!imageUrl) return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  // Remove duplicate /api if present
  const backendOrigin = API_BASE_URL.replace(/\/api\/?$/, '');
  return `${backendOrigin}${imageUrl}`;
};

export default api;
