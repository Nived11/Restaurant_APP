import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


const getAuthData = () => {
  const adminToken = localStorage.getItem('admin_token');
  const userToken = localStorage.getItem('user_access');
  const adminRole = localStorage.getItem('admin_role'); 
  
  if (adminToken) {
    return {
      token: adminToken,
      refresh: localStorage.getItem('admin_refresh'),
      context: 'admin_panel',
      role: adminRole 
    };
  }
  return {
    token: userToken,
    refresh: localStorage.getItem('user_refresh'),
    context: 'user_side',
    role: 'user'
  };
};

api.interceptors.request.use((config) => {
  const { token } = getAuthData();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 Error (Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refresh, context } = getAuthData();

      if (!refresh) return Promise.reject(error);

      try {
        const res = await axios.post(`${api.defaults.baseURL}/token/refresh/`, {
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
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_refresh');
        localStorage.removeItem('admin_role');
        localStorage.removeItem('user_access');
        localStorage.removeItem('user_refresh');
        
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