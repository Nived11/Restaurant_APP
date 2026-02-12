import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

export const useContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  // Contact Information Cards Data
  const contactInfo = [
    {
      id: 1,
      icon: <Phone className="w-6 h-6 text-black" />,
      title: "Call Us",
      details: "+91 98765 43210",
      sub: "Mon-Fri from 8am to 5pm"
    },
    {
      id: 2,
      icon: <Mail className="w-6 h-6 text-black" />,
      title: "Email Us",
      details: "support@quickkart.com",
      sub: "We'll reply within 24hrs"
    },
    {
      id: 3,
      icon: <MapPin className="w-6 h-6 text-black" />,
      title: "Headquarters",
      details: "Bangalore, India",
      sub: "HSR Layout, Sector 4"
    }
  ];

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
    contactInfo,
    handleChange,
    handleSubmit
  };
};