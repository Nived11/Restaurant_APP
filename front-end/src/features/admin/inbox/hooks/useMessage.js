import { useState, useEffect, useCallback } from 'react';
import api from '../../../../api/axios'
import { toast } from 'sonner';
import { extractErrorMessages } from '../../../../utils/extractErrorMessages';

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
      const data = response.data.data || response.data;
      setMessages(data);
    } catch (err) {
      toast.error("Failed to load messages. Please try again."); 
      setError(extractErrorMessages(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const toggleMessage = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };



  // 4. Send Reply Logic (New addition based on your API)
  const sendReply = async (id, replyText) => {
    try {
      await api.post(`/admin/contacts/${id}/reply/`, {
        reply_message: replyText
      });
      return true; // Success
    } catch (err) {
      toast.error("Failed to send reply. Please try again.");
      return false; // Failed
    }
  };

  return { 
    messages, 
    expandedId, 
    isLoading, 
    error, 
    toggleMessage, 
    sendReply 
  };
};