import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import api from '../api/axios';
import { logoutUser } from '../redux/authSlice';
import { toast } from 'sonner';

export const useUserLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false); 

    const handleLogout = async () => {
        if (isLoggingOut) return;

        setIsLoggingOut(true);
        try {
            const response = await api.post('/auth/logout/'); 
            
            if (response.status === 200 || response.data?.status) {
                
                localStorage.removeItem("user_role");
                localStorage.removeItem("user_name");
                localStorage.removeItem("cart");

                toast.success("Logged out successfully!");
                
                setTimeout(() => {
                    dispatch(logoutUser());
                    navigate("/", { replace: true });
                }, 1000);
            } else {
                setIsLoggingOut(false);
            }
            
        } catch (error) {
            console.error("Logout API failed", error);
            toast.error("Logout failed! Please try again.");
            setIsLoggingOut(false);
        }
    };

    return { handleLogout, isLoggingOut }; 
};