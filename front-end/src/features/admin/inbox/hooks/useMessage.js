import { useState, useEffect, useCallback } from 'react';
import api from '../../../../api/axios'

export const useMessage = () => {
  const [messages, setMessages] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  
  // API loading states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch Messages from Backend
  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/admin/contacts/');
      // നിങ്ങളുടെ API response-ൽ ഡാറ്റ എവിടെയാണോ അത് നോക്കി സെറ്റ് ചെയ്യുക. 
      // സാധാരണയായി response.data.data അല്ലെങ്കിൽ response.data ആയിരിക്കും.
      const data = response.data.data || response.data;
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Component ലോഡ് ചെയ്യുമ്പോൾ ഡാറ്റ എടുക്കാൻ
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // 2. Toggle Message Open/Close (Mark as Read logic removed since it's not in your API spec yet)
  const toggleMessage = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // 3. Delete Message Logic (API call for delete)
  const deleteMessage = async (id, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    
    // (Note: You didn't provide a delete API endpoint, so assuming a standard DELETE request)
    try {
      await api.delete(`/admin/contacts/${id}/`); // Replace with actual delete API if different
      setMessages(msgs => msgs.filter(msg => msg.id !== id));
    } catch (err) {
      console.error("Failed to delete message:", err);
      alert("Failed to delete message. Please try again.");
    }
  };

  // 4. Send Reply Logic (New addition based on your API)
  const sendReply = async (id, replyText) => {
    try {
      await api.post(`/admin/contacts/${id}/reply/`, {
        reply_message: replyText
      });
      return true; // Success
    } catch (err) {
      console.error("Failed to send reply:", err);
      return false; // Failed
    }
  };

  return { 
    messages, 
    expandedId, 
    isLoading, 
    error, 
    toggleMessage, 
    deleteMessage, 
    sendReply 
  };
};