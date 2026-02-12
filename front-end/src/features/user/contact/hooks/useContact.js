import { useState } from 'react';

export const useContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate API Call
    setTimeout(() => {
      console.log("Form Submitted:", formData);
      setStatus('success');
      // Reset form after success
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return {
    formData,
    status,
    handleChange,
    handleSubmit
  };
};