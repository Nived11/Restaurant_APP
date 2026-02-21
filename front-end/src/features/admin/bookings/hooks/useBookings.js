import { useState, useEffect, useCallback } from "react";
import api from "../../../../api/axios";
import { extractErrorMessages } from '../../../../utils/extractErrorMessages';


const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  const fetchBookings = useCallback(async (search = "", page = 1, isLoadMore = false) => {
    try {
      if (isLoadMore) setLoadingMore(true);
      else setLoading(true);

      const response = await api.get(`/bookings/all/`, {
        params: { search: search, page: page }
      });

      if (response.data.status) {
        const newData = response.data.data;
        
        setBookings(prev => isLoadMore ? [...prev, ...newData] : newData);
        
        setHasNextPage(!!response.data.next_page_url);
        setCurrentPage(page);
      }
      setError(null);
    } catch (err) {
      setError(extractErrorMessages(err));
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBookings(searchTerm, 1, false);
    }, 600);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, fetchBookings]);

  const loadMore = () => {
    if (!loadingMore && hasNextPage) {
      fetchBookings(searchTerm, currentPage + 1, true);
    }
  };

  const showLess = () => {
    fetchBookings(searchTerm, 1, false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleRow = (id) => setExpandedRow(prev => (prev === id ? null : id));
  const clearFilters = () => setSearchTerm("");

  return {
    searchTerm, setSearchTerm, expandedRow, toggleRow,
    bookings, clearFilters, loading, loadingMore,
    hasNextPage, loadMore, showLess, currentPage, error,
    refresh: () => fetchBookings(searchTerm, 1, false)
  };
};

export default useBookings;