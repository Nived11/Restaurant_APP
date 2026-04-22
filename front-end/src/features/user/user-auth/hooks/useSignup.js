import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux'; 
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../../../api/axios';
import { extractErrorMessages } from '../../../../utils/extractErrorMessages';
import { mergeCartOnLogin } from '../../../../redux/cartSlice'; 
import { setCredentials } from '../../../../redux/authSlice';
import { toast } from 'sonner';

export const useSignup = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
    
    const [isAgreed, setIsAgreed] = useState(false);

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(60); 
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef([]);
    const navigate = useNavigate(); 
    const location = useLocation();

    useEffect(() => {
        let interval;
        if (step === 2 && timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        } else if (timer <= 0) {
            setCanResend(true);
            if (interval) clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    useEffect(() => {
        if (error) {
            const t = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(t);
        }
    }, [error]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleOtpChange = (value, index) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
        if (value && index < 5) inputRefs.current[index + 1].focus();
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleRegisterSubmit = async (e) => {
        if (e) e.preventDefault();
        setError(null);
        if (formData.name.trim().length < 3) {
            setError("Name must be at least 3 characters long.");
            return;
        }
        if (formData.phone.length !== 10) {
            setError("Invalid phone number. Please enter 10 digits.");
            return;
        }
        
        if (!isAgreed) {
            setError("Please agree to the Terms and Privacy Policy.");
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/auth/register/', {
                name: formData.name,
                email: formData.email,
                phone_number: formData.phone
            });
            if (response.data.status) {
                toast.success("OTP Sent to your phone!");
                setStep(2);
                setTimer(response.data.resend_delay || 60);
                setCanResend(false);
            }
            if (response.data.otp) {
                toast.info(`Test OTP: ${response.data.otp}`);
            }
            
        } catch (err) {
            setError(extractErrorMessages(err));
        } finally {
            setLoading(false);
        }
    };

    const handleVerifySubmit = async (e) => {
        if (e) e.preventDefault();
        setError(null);
        const otpString = otp.join('');
        if (otpString.length < 6) {
            setError("Please enter the 6-digit code.");
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/auth/verify-otp/', {
                phone_number: formData.phone,
                otp: otpString
            });

            if (response.data.status) {
                const userName = response.data.name || formData.name;
                const userRole = response.data.role || "user";

                localStorage.setItem('user_role', userRole);
                localStorage.setItem('user_name', userName);

                dispatch(setCredentials({
                    role: userRole,
                    name: userName,
                    phone_number: formData.phone
                }));

                dispatch(mergeCartOnLogin());

                toast.success("Successfully Registered! Welcome!");
                const origin = location.state?.from || '/';
                setTimeout(() => {
                   navigate(origin, { replace: true });
                }, 1500);
            }
        } catch (err) {
            setError(extractErrorMessages(err));
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setLoading(true);
        try {
            const response = await api.post('/auth/resend-otp/', { phone_number: formData.phone });
            if (response.data.status) {
                toast.success("OTP Resent!");
                setTimer(response.data.resend_delay || 60);
                setCanResend(false);
                setOtp(['', '', '', '', '', '']);
            } else {
                setTimer(response.data.resend_delay);
                setCanResend(false);
                toast.error(response.data.message);
            }
            
            if (response.data.otp) {
                toast.info(`Test OTP: ${response.data.otp}`);
            }
        } catch (err) {
            setError(extractErrorMessages(err));
        } finally {
            setLoading(false);
        }
    };

    return {
        step, setStep, formData, setFormData, otp, setOtp,
        loading, error, timer, canResend, inputRefs,
        isAgreed, setIsAgreed,
        formatTime, handleOtpChange, handleKeyDown,
        handleRegisterSubmit, handleVerifySubmit, handleResend
    };
};