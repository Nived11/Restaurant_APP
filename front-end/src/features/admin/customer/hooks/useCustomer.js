import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import api from '../../../../api/axios';
import { extractErrorMessages } from '../../../../utils/extractErrorMessages';

export const useCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  
  // Pagination States
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const fetchCustomers = useCallback(async (searchQuery = "", pageNum = 1, isAppend = false) => {
    if (pageNum === 1) setIsLoading(true);
    else setIsMoreLoading(true);

    try {
      const endpoint = `customers/?search=${searchQuery}&page=${pageNum}`;
      const response = await api.get(endpoint);
      
      const newData = response.data.results || response.data; 
      
      setCustomers(prev => isAppend ? [...prev, ...newData] : newData);
      setHasMore(!!response.data.next); 
    } catch (error) {
      toast.error(extractErrorMessages(error) || "Failed to load customers.");
    } finally {
      setIsLoading(false);
      setIsMoreLoading(false);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1);
      fetchCustomers(searchTerm, 1, false);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, fetchCustomers]);

  const loadMore = () => {
    if (!isMoreLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCustomers(searchTerm, nextPage, true);
    }
  };

  const toggleBlockStatus = async (userId, currentStatus) => {
    try {
      const response = await api.post(`customers/${userId}/toggle-block/`);
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message || "Status updated.");
        setCustomers(prev => 
          prev.map(c => c.id === userId ? { ...c, is_blocked: !c.is_blocked } : c)
        );
      }
    } catch (error) {
      // ✅ Using extractErrorMessages here
      toast.error(extractErrorMessages(error) || "Action failed.");
    }
  };

  const exportToCSV = async () => {
    setIsExporting(true);
    const toastId = toast.loading("Exporting CSV...");
    try {
      const response = await api.get('customers/export/csv/', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Customers_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Export successful", { id: toastId });
    } catch (error) {
      // ✅ Added extractErrorMessages here as well for full coverage
      const errorMessage = extractErrorMessages(error) || "Export failed";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  const filteredCustomers = customers.filter(customer => {
    if (statusFilter === "All") return true;
    return statusFilter === "Active" ? !customer.is_blocked : customer.is_blocked;
  });

  return {
    customers: filteredCustomers,
    searchTerm, setSearchTerm,
    statusFilter, setStatusFilter,
    isLoading, isMoreLoading,
    hasMore, loadMore,
    toggleBlockStatus, exportToCSV,
    isExporting
  };
};