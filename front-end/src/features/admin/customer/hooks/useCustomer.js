import { useState, useEffect, useCallback } from "react";
import api from "../../../../api/axios";
import { toast } from "sonner";
import { extractErrorMessages } from "../../../../utils/extractErrorMessages";

const useCustomer = () => {

  const [customers, setCustomers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const [isExporting, setIsExporting] = useState(false);



  const fetchCustomers = useCallback(async (search = "", page = 1, isLoadMore = false) => {

    try {

      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setIsLoading(true);
      }

      setError(null);

      const params = { search, page };

      if (statusFilter === "Blocked") {
        params.is_blocked = true;
      }

      if (statusFilter === "Active") {
        params.is_blocked = false;
      }

      const response = await api.get("/customers/", { params });

      const data = response.data.results || response.data;

      let filtered = Array.isArray(data) ? data : [];

      if (statusFilter === "Active") {
        filtered = filtered.filter(c => !c.is_blocked);
      }

      if (statusFilter === "Blocked") {
        filtered = filtered.filter(c => c.is_blocked);
      }

      setCustomers(prev =>
        isLoadMore ? [...prev, ...filtered] : filtered
      );

      setHasMore(!!response.data.next);

      setCurrentPage(page);

    } catch (err) {

      const message = extractErrorMessages(err);

      setError(message);

      toast.error(message);

    } finally {

      setIsLoading(false);
      setLoadingMore(false);

    }

  }, [statusFilter]);




  useEffect(() => {

    const delay = setTimeout(() => {

      fetchCustomers(searchTerm, 1, false);

    }, 500);

    return () => clearTimeout(delay);

  }, [searchTerm, statusFilter, fetchCustomers]);




  const loadMore = () => {

    if (!loadingMore && hasMore) {

      const nextPage = currentPage + 1;

      setCurrentPage(nextPage);

      fetchCustomers(searchTerm, nextPage, true);

    }

  };




  const toggleBlockStatus = async (id) => {

    try {

      const res = await api.post(`/customers/${id}/toggle-block/`);

      toast.success(res.data.message || "Status updated");

      setCustomers(prev =>
        prev.map(c =>
          c.id === id
            ? { ...c, is_blocked: !c.is_blocked }
            : c
        )
      );

    } catch (err) {

      toast.error(extractErrorMessages(err));

    }

  };




  const exportToCSV = async () => {

    try {

      setIsExporting(true);

      const res = await api.get(`/customers/export/csv/`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "customers.csv");

      document.body.appendChild(link);

      link.click();

      link.remove();

      toast.success("CSV downloaded");

    } catch (err) {

      toast.error(extractErrorMessages(err));

    } finally {

      setIsExporting(false);

    }

  };



  return {

    customers,

    searchTerm,
    setSearchTerm,

    statusFilter,
    setStatusFilter,

    isLoading,
    loadingMore,

    error,

    currentPage,

    hasMore,

    loadMore,

    toggleBlockStatus,

    exportToCSV,

    isExporting,

    refresh: () => fetchCustomers(searchTerm, 1, false)

  };

};

export default useCustomer;