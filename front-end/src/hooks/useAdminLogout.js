import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'sonner';
import api from '../api/axios';
import { messaging, getToken } from '../utils/firebase';
import { logoutUser } from '../redux/authSlice'; 

export const useAdminLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const [isLoggingOut, setIsLoggingOut] = useState(false); 

    const handleLogout = async () => {
        if (isLoggingOut) return; 

        setIsLoggingOut(true); 
        try {
            // 1. Delete FCM Token
            const currentToken = await getToken(messaging);
            if (currentToken) {
                await api.post('/notifications/delete-fcm-token/', { 
                    fcm_token: currentToken 
                });
            }

            // 2. Call Logout API 
            const response = await api.post('/auth/logout/'); 

            if (response.status === 200 || response.data?.status) {
                
                localStorage.removeItem("admin_role");
                
                toast.success("Logged out successfully!");

               
                dispatch(logoutUser()); 
                navigate("/admin/login", { replace: true }); 
                
            } else {
                setIsLoggingOut(false);
            }

        } catch (error) {
            console.error("Error during logout process:", error);
            toast.error("Logout failed! Please try again.");
            setIsLoggingOut(false);
        } 
    };

    return { handleLogout, isLoggingOut }; 
};