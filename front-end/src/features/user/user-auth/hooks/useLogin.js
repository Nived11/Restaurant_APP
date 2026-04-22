import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import api from '../../../../api/axios';
import { extractErrorMessages } from '../../../../utils/extractErrorMessages';
import { mergeCartOnLogin } from '../../../../redux/cartSlice'; 
import { setCredentials } from '../../../../redux/authSlice'; 
import { toast } from 'sonner';

export const useLogin = () => {
    const dispatch = useDispatch(); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 
    const [step, setStep] = useState(1);
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(60); 
    const [canResend, setCanResend] = useState(false);

    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    useEffect(() => {
        let interval;
        if (step === 2 && timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        } else if (timer <= 0) {
            setCanResend(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    useEffect(() => {
        if (error) {
            const t = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(t);
        }
    }, [error]);

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

    const sendOtp = async (e) => {
        if (e) e.preventDefault();
        setError(null);
        if (mobile.length !== 10) {
            setError("Please enter a valid 10-digit mobile number");
            return;
        }
        setLoading(true);
        try {
            const response = await api.post('/auth/login-otp/', { phone_number: mobile });
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

    const verifyOtp = async (e) => {
        if (e) e.preventDefault();
        const otpString = otp.join('');
        if (otpString.length < 6) {
            setError("Enter 6-digit OTP");
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/auth/verify-otp/', {
                phone_number: mobile,
                otp: otpString
            });

           if (response.data.status) {
                const userName = response.data.name || "User";
                const userRole = response.data.role || "user";

                localStorage.setItem('user_role', userRole);
                localStorage.setItem('user_name', userName); 

                dispatch(setCredentials({
                    role: userRole,
                    name: userName,
                    phone_number: mobile
                }));

                dispatch(mergeCartOnLogin());
                toast.success("Welcome back!");
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

    const resendOtp = async () => {
        setLoading(true);
        try {
            const response = await api.post('/auth/resend-otp/', { phone_number: mobile });
            
            if (response.data.status) {
                toast.success("OTP Resent Successfully!");
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
        step, setStep, mobile, setMobile, otp, setOtp,
        loading, error, timer, canResend, inputRefs,
        formatTime, handleOtpChange, handleKeyDown, sendOtp, verifyOtp, resendOtp
    };
};