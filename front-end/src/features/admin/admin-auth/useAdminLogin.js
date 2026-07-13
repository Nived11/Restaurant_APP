// src/features/admin/admin-auth/useAdminLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import api from '../../../api/axios'; 
import { toast } from 'sonner';
import { extractErrorMessages } from '../../../utils/extractErrorMessages';
import { setCredentials as setAuthCredentials } from '../../../redux/authSlice'; 

export const useAdminLogin = () => {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
        if (error) setError(""); 
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); 

        try {
            const res = await api.post('/auth/admin-login/', credentials);
            
            if (res.data.status === true) {
                
                localStorage.setItem("admin_role", res.data.role);
                
                dispatch(setAuthCredentials({
                    role: res.data.role,
                    username: credentials.username
                }));
                
                toast.success("successfully logged in!");
                setTimeout(() => {
                     navigate('/admin/dashboard', { replace: true });
                }, 1500);
               
            } else {
                setError(res.data.message || "Unauthorized access.");
            }
        } catch (err) {
            const cleanError = extractErrorMessages(err);
            setError(cleanError || "Authentication Failed.");
        } finally {
            setLoading(false);
        }
    };

    return {
        credentials,
        loading,
        showPassword,
        error,
        handleChange,
        handleLogin,
        togglePasswordVisibility
    };
};