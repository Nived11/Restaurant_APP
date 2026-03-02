import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const getAuthData = () => {
  const pathname = window.location.pathname;
  const isAdminPath = pathname.startsWith('/admin');

  const adminToken = localStorage.getItem('admin_token');
  const userToken = localStorage.getItem('user_access');

  if (isAdminPath && adminToken) {
    return {
      token: adminToken,
      refresh: localStorage.getItem('admin_refresh'),
      context: 'admin_panel'
    };
  }

  return {
    token: userToken,
    refresh: localStorage.getItem('user_refresh'),
    context: 'user_side'
  };
};

// Request Interceptor
api.interceptors.request.use((config) => {
  const { token } = getAuthData();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor (Token Refresh Logic)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refresh, context } = getAuthData();

      if (!refresh) return Promise.reject(error);

      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/token/refresh/`, {
          refresh: refresh,
        });

        if (res.status === 200) {
          const newAccessToken = res.data.access;

          if (context === 'admin_panel') {
            localStorage.setItem('admin_token', newAccessToken);
          } else {
            localStorage.setItem('user_access', newAccessToken);
          }

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh failed, clearing storage...");
        localStorage.clear(); 
        
        toast.error('Session expired. Please login again.');
        
        if (context === 'admin_panel') {
          window.location.href = '/admin/login';
        } else {
          window.location.href = '/';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;