import { useState } from 'react';

const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Toggle Password Visibility
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle Login Logic
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Simple Validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // API Call Simulation
    setIsLoading(true);
    
    setTimeout(() => {
      console.log("Logging in with:", email, password);
      setIsLoading(false);
      
      // Success Logic here (e.g., navigate to home)
      // window.location.href = '/home'; // Or use useNavigate from react-router-dom
    }, 1500);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    toggleShowPassword,
    error,
    isLoading,
    handleLogin,
  };
};

export default useLogin;