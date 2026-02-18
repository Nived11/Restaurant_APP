import { useState } from 'react';

export const useContact = () => {
  const [formData, setFormData] = useState({
    full_name: '', // ✅ Renamed from 'name' to 'full_name'
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch("http://127.0.0.1:8000/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        // ✅ Reset form with correct field names
        setFormData({ full_name: '', email: '', subject: '', message: '' }); 
        setTimeout(() => setStatus('idle'), 3000);
        alert("Success! Message sent to Database ✅");
      } else {
        setStatus('error');
        const errorData = await response.json();
        console.log("Server Error:", errorData);
        alert("Django Error: " + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Network Error:", error);
      setStatus('error');
      alert("Network Error: Check if Django server is running.");
    }
  };

  return {
    formData,
    status,
    handleChange,
    handleSubmit
  };
};