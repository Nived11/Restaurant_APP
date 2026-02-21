import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://thecrunchindia2026.pythonanywhere.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Request Interceptor: Attaches token to every outgoing request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. Response Interceptor: Detects when the 2-minute backend timer expires
api.interceptors.response.use(
  (response) => {
    // If the request is successful, do nothing and return the data
    return response;
  },
  (error) => {
    // Check if the server returned a 401 Unauthorized error
    if (error.response && error.response.status === 401) {
      console.error("Session expired. Logging out...");

      // Clear all admin-related data from storage
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_refresh');
      localStorage.removeItem('admin_role');
      localStorage.removeItem('admin_user');

      // Force redirect to login page
      // Using window.location.href because we are outside the React Router context
      window.location.href = '/admin/login';
    }

    return Promise.reject(error);
  }
);

export default api;