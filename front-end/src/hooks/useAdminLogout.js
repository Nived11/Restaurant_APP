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
        
        // 🌟 1. Safe FCM Token Deletion
        try {
            if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
                const currentToken = await getToken(messaging).catch(() => null);
                if (currentToken) {
                    await api.post('/notifications/delete-fcm-token/', { 
                        fcm_token: currentToken 
                    });
                    console.log("FCM Token successfully deleted from backend.");
                }
            } else {
                console.log("Notification permission is not granted. Skipping FCM deletion.");
            }
        } catch (firebaseError) {
            console.warn("Firebase token clearing skipped:", firebaseError.message);
        }

        // 🌟 2. Main Logout Process
        try {
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
            console.error("Error during logout API call:", error);
            localStorage.removeItem("admin_role");
            dispatch(logoutUser()); 
            navigate("/admin/login", { replace: true }); 
            setIsLoggingOut(false);
        } 
    };

    return { handleLogout, isLoggingOut }; 
};