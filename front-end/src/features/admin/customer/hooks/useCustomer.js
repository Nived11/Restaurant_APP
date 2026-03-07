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

  // --- FETCH CUSTOMERS (WITH SEARCH) ---
  const fetchCustomers = useCallback(async (searchQuery = "") => {
    console.log(`[useCustomer] 🔄 Fetching customers... Search query: "${searchQuery}"`);
    setIsLoading(true);
    
    try {
      // FIXED: Removed leading slash (now 'customers/' instead of '/customers/')
      const endpoint = searchQuery ? `customers/?search=${searchQuery}` : 'customers/';
      console.log(`[useCustomer] 📡 Calling API Endpoint: ${endpoint}`);
      
      const response = await api.get(endpoint);
      console.log("[useCustomer] ✅ API Response Success! Data received:", response.data);
      
      setCustomers(response.data);
    } catch (error) {
      console.error("[useCustomer] ❌ API Fetch Error:", error);
      toast.error(extractErrorMessages(error) || "Failed to load customers.");
    } finally {
      setIsLoading(false);
      console.log("[useCustomer] 🛑 Fetch operation finished.");
    }
  }, []);

  // --- INITIAL LOAD & DEBOUNCED SEARCH ---
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCustomers(searchTerm);
    }, 500); 

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, fetchCustomers]);

  // --- TOGGLE BLOCK/UNBLOCK STATUS ---
  const toggleBlockStatus = async (userId, currentStatus) => {
    console.log(`[useCustomer] 🔄 Toggling block status for User ID: ${userId}`);
    
    try {
      // FIXED: Removed leading slash
      const response = await api.post(`customers/${userId}/toggle-block/`);
      console.log("[useCustomer] ✅ Toggle Block API Success:", response.data);
      
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message || `User successfully ${currentStatus ? 'unblocked' : 'blocked'}.`);
        
        setCustomers(prev => 
          prev.map(c => c.id === userId ? { ...c, is_blocked: !c.is_blocked } : c)
        );
      }
    } catch (error) {
      console.error("[useCustomer] ❌ Error toggling block status:", error);
      toast.error(extractErrorMessages(error) || "Failed to change user status.");
    }
  };

  // --- EXPORT TO CSV ---
  const exportToCSV = async () => {
    console.log("[useCustomer] 📥 Starting CSV Export...");
    setIsExporting(true);
    const toastId = toast.loading("Preparing CSV file...");
    
    try {
      // FIXED: Removed leading slash
      const response = await api.get('customers/export/csv/', {
        responseType: 'blob' 
      });
      
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Crunch_Customers_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("CSV file downloaded successfully!", { id: toastId });
    } catch (error) {
      console.error("[useCustomer] ❌ Error exporting CSV:", error);
      toast.error("Failed to export CSV file.", { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  const filteredCustomers = customers.filter(customer => {
    if (statusFilter === "All") return true;
    if (statusFilter === "Active" && !customer.is_blocked) return true;
    if (statusFilter === "Blocked" && customer.is_blocked) return true;
    return false;
  });

  return {
    customers: filteredCustomers, 
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    isLoading,
    isExporting,
    toggleBlockStatus,
    exportToCSV
  };
};