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

  // ✅ SEARCH & PAGINATION STATES MOVED TO HOOK
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

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

  // ✅ Reset pagination when search query changes
  useEffect(() => {
    setVisibleCount(12);
  }, [searchQuery]);

  // ✅ FILTER LOGIC
  const filteredMessages = messages?.filter(msg => {
    const query = searchQuery.toLowerCase();
    return (
      (msg.full_name && msg.full_name.toLowerCase().includes(query)) ||
      (msg.email && msg.email.toLowerCase().includes(query))
    );
  }) || [];

  // ✅ PAGINATION LOGIC
  const visibleMessages = filteredMessages.slice(0, visibleCount);
  const hasMore = filteredMessages.length > visibleCount;

  const handleSeeMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  const handleShowLess = () => {
    setVisibleCount(12);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMessage = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // 4. Send Reply Logic
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
    messages, // Raw messages
    filteredMessages, // All filtered messages (for count)
    visibleMessages, // Paginated messages (for rendering)
    searchQuery,
    setSearchQuery,
    hasMore,
    visibleCount,
    handleSeeMore,
    handleShowLess,
    expandedId, 
    isLoading, 
    error, 
    toggleMessage, 
    sendReply 
  };
};