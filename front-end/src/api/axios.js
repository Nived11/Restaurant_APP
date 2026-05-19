import axios from 'axios';
import { toast } from 'sonner';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  return config;
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const pathname = window.location.pathname;
    const isAdminPath = pathname.startsWith('/admin');
    const loginRedirect = isAdminPath ? '/admin/login' : '/login';

    // 1. INSTANT KICK-OUT LOGIC (403)
    if (error.response?.status === 403) {
      const errorDetail = error.response.data.detail;

      if (errorDetail === "Your account has been blocked by the admin. You are logged out.") {
        console.warn("[Security] User blocked by admin. Clearing session...");
        
        localStorage.clear(); 

        toast.error("Your account has been blocked by the admin.", {
          description: "Access denied. Logging you out now.",
          duration: 6000,
        });

        setTimeout(() => {
          window.location.href = loginRedirect;
        }, 1500);

        return Promise.reject(error);
      }
    }

    // 2. TOKEN REFRESH LOGIC (401)
    
    const isLikelyLoggedIn = localStorage.getItem('user_role') || localStorage.getItem('admin_role');
    
    const skipUrls = ['login', 'refresh-token', 'token/refresh']; 
    const isSkippedUrl = skipUrls.some(url => originalRequest.url.includes(url));

    if (error.response?.status === 401 && !originalRequest._retry && !isSkippedUrl) {
      originalRequest._retry = true;

      if (!isLikelyLoggedIn && originalRequest.url.includes('verify-session')) {
          return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh-token/`, {}, {
          withCredentials: true
        });

        if (res.status === 200) {
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh failed, session expired.");
        localStorage.clear();
        
        if (isLikelyLoggedIn) {
            toast.error('Session expired. Please login again !');
            setTimeout(() => {
              window.location.href = loginRedirect;
            }, 1500);
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;