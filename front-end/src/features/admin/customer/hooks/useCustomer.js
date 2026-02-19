import { useState, useEffect } from 'react';

export const useCustomer = () => {
  // 1. States
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // 2. Mock API Call (Dummy Data Loading)
  useEffect(() => {
    const fetchDummyData = () => {
      setIsLoading(true);
      
      // ഡാറ്റ ലോഡ് ആകുന്നത് പോലെ ഒരു ചെറിയ ഡിലേ (Simulated Delay)
      setTimeout(() => {
        const data = [
          { id: 1, name: "Arun Kumar", email: "arun@gmail.com", phone: "+91 9876543210", status: "Active", joinDate: "2024-01-10", orders: 12 },
          { id: 2, name: "Sneha Reddy", email: "sneha@gmail.com", phone: "+91 9876543211", status: "Inactive", joinDate: "2023-11-05", orders: 5 },
          { id: 3, name: "Jithin Das", email: "jithin@gmail.com", phone: "+91 9876543212", status: "Active", joinDate: "2024-02-01", orders: 8 },
          { id: 4, name: "Meera Nair", email: "meera@gmail.com", phone: "+91 9876543213", status: "Active", joinDate: "2023-12-15", orders: 15 },
          { id: 5, name: "Rahul Varma", email: "rahul@gmail.com", phone: "+91 9876543214", status: "Inactive", joinDate: "2024-01-20", orders: 2 }
        ];
        
        setCustomers(data);
        setIsLoading(false);
      }, 800); // 0.8 seconds delay
    };

    fetchDummyData();
  }, []);

  // 3. Filter Logic
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === "All" || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 4. Delete Handler
  const deleteCustomer = (id) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  return {
    customers,
    filteredCustomers,
    searchTerm,
    setSearchTerm,
    deleteCustomer,
    statusFilter,
    setStatusFilter,
    isLoading
  };
};