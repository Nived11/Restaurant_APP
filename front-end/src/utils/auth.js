// src/utils/auth.js

export const checkTokenExpiry = () => {
    const token = localStorage.getItem('admin_token');
    
    if (!token) return;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiryTime = payload.exp * 1000; 
        const currentTime = Date.now();

        if (currentTime >= expiryTime) {
            localStorage.clear();
            window.location.href = '/admin/login';
        }
    } catch (error) {
        console.error("Token parse error:", error);
        localStorage.clear();
        window.location.href = '/admin/login';
    }
};