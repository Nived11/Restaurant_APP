import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../../../api/axios';
import { extractErrorMessages } from '../../../../utils/extractErrorMessages';
import { toast } from 'sonner';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 
    const [step, setStep] = useState(1);
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(120);
    const [canResend, setCanResend] = useState(false);

    const inputRefs = useRef([]);
    const location = useLocation();

    // --- Helpers ---
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Timer Logic
    useEffect(() => {
        let interval;
        if (step === 2 && timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        } else if (timer === 0) {
            setCanResend(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    // Clear errors after 5 seconds
    useEffect(() => {
        if (error) {
            const t = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(t);
        }
    }, [error]);

    // --- OTP Input Handling ---
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

    // --- API Actions ---

    // 1. Send OTP
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
                setTimer(120);
                setCanResend(false);
            }
            if (response.data.data?.test_otp) {
                console.log("Login OTP (Test Mode):", response.data.data.test_otp);
            }
        } catch (err) {
            const errMsg = extractErrorMessages(err);
            setError(errMsg);
        } finally {
            setLoading(false);
        }
    };

    // 2. Verify OTP
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
                localStorage.setItem('user_access', response.data.access);
                localStorage.setItem('user_refresh', response.data.refresh);
                localStorage.setItem('user_role', response.data.role);
                toast.success("Welcome back!");
                const origin = location.state?.from || '/';
                setTimeout(() => {
                    window.location.href = origin;
                }, 1500);
            }
        } catch (err) {
            const errMsg = extractErrorMessages(err);
            setError(errMsg);
        } finally {
            setLoading(false);
        }
    };

    // 3. Resend OTP
    const resendOtp = async () => {
        setLoading(true);
        try {
            const response = await api.post('/auth/login-otp/', { phone_number: mobile });
            if (response.data.status) {
                toast.success("OTP Resent Successfully!");
                setTimer(120);
                setCanResend(false);
                setOtp(['', '', '', '', '', '']);
            }
        } catch (err) {
            const errMsg = extractErrorMessages(err);
            setError(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return {
        // State
        step, setStep,
        mobile, setMobile,
        otp, setOtp,
        loading,
        error,
        timer,
        canResend,
        inputRefs,
        // Methods
        formatTime,
        handleOtpChange,
        handleKeyDown,
        sendOtp,
        verifyOtp,
        resendOtp
    };
};