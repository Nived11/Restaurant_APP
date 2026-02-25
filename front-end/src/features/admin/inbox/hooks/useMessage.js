import { useState, useEffect, useCallback } from 'react';
import api from '../../../../api/axios'
import { toast } from 'sonner';
import { extractErrorMessages } from '../../../../utils/extractErrorMessages';

export const useMessage = () => {
  const [messages, setMessages] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  
  // API loading states
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  // SERVER-SIDE SEARCH & PAGINATION STATES
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  // 1. Fetch Messages from Backend (Handles both first load and load more)
  const fetchMessages = useCallback(async (currentPage = 1, query = "", isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const response = await api.get('/admin/contacts/', {
        params: {
          page: currentPage,
          search: query
        }
      });
      
      const responseData = response.data;
      const newMessages = responseData.data || [];

      if (isLoadMore) {
        // Append new messages to existing ones
        setMessages(prev => [...prev, ...newMessages]);
      } else {
        // Replace messages for new search or initial load
        setMessages(newMessages);
      }

      // Check if there is a next page based on backend response
      setHasMore(!!responseData.next_page_url);
      setTotalItems(responseData.total_items || 0);

    } catch (err) {
      toast.error("Failed to load messages. Please try again."); 
      setError(extractErrorMessages(err));
    } finally {
      setIsLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // 2. Initial Load & Search Effect (With Debounce to avoid spamming API)
  useEffect(() => {
    setPage(1); // Reset to page 1 on new search
    const delayDebounceFn = setTimeout(() => {
      fetchMessages(1, searchQuery, false);
    }, 500); // Waits 500ms after user stops typing before making API call

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, fetchMessages]);

  // 3. Pagination Handlers
  const handleSeeMore = () => {
    if (!hasMore || loadingMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMessages(nextPage, searchQuery, true);
  };

  const handleShowLess = () => {
    setPage(1);
    setMessages(prev => prev.slice(0, 12)); // Keep only first 12 items locally
    setHasMore(true); // Re-enable "See More" since we know there are more
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
      
      // Update the message in the list instantly on success
      setMessages(prevMsgs => prevMsgs.map(msg => 
        msg.id === id 
          ? { ...msg, reply_message: replyText, replied_at: new Date().toISOString() } 
          : msg
      ));
      toast.success("Reply sent successfully!");
      
      return true; // Success
    } catch (err) {
      toast.error("Failed to send reply. Please try again.");
      return false; // Failed
    }
  };

  return { 
    messages, 
    searchQuery,
    setSearchQuery,
    hasMore,
    loadingMore,
    page,
    totalItems,
    handleSeeMore,
    handleShowLess,
    expandedId, 
    isLoading, 
    error, 
    toggleMessage, 
    sendReply 
  };
};