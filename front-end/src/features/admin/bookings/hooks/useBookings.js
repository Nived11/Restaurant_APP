import { useState, useEffect, useMemo } from "react";
import api from "../../../../api/axios";

 const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/bookings/all/");
      if (res.data.status) {
        setBookings(res.data.data);
      }
      setError(null);
    } catch (err) {
      setError("Failed to fetch bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    return bookings.filter(item => {
      const nameMatch = item.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
      const phoneMatch = item.phone?.includes(searchTerm);
      const emailMatch = item.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const dateMatch = filterDate === "" || item.date === filterDate;
      
      return (nameMatch || phoneMatch || emailMatch) && dateMatch;
    });
  }, [bookings, searchTerm, filterDate]);

  const toggleRow = (id) => setExpandedRow(prev => (prev === id ? null : id));
  const clearFilters = () => { setSearchTerm(""); setFilterDate(""); };

  return {
    searchTerm, setSearchTerm,
    filterDate, setFilterDate,
    expandedRow, toggleRow,
    filteredBookings, clearFilters,
    loading, error, refresh: fetchBookings
  };
};

export default useBookings;