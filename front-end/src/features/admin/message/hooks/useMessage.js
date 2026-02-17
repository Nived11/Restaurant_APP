import { useState } from 'react';

export const useMessage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      fullName: "Adhil Muhammed",
      email: "adhil@gmail.com",
      subject: "Order Enquiry / Feedback",
      message: "Hello, I placed an order regarding the Beef Burger. Is it possible to add extra cheese next time? Also, the delivery was super fast!",
      date: "10:30 AM",
      isRead: false,
    },
    {
      id: 2,
      fullName: "Vinayak CK",
      email: "vinayak@koyeb.com",
      subject: "Payment Issue",
      message: "My payment failed but amount was deducted. Please check transaction ID #12345.",
      date: "Yesterday",
      isRead: true,
    }
  ]);

  const [expandedId, setExpandedId] = useState(null);

  const toggleMessage = (id) => {
    setExpandedId(expandedId === id ? null : id);
    setMessages(msgs => msgs.map(msg => 
      msg.id === id ? { ...msg, isRead: true } : msg
    ));
  };

  const deleteMessage = (id, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setMessages(msgs => msgs.filter(msg => msg.id !== id));
  };

  return { messages, expandedId, toggleMessage, deleteMessage };
};