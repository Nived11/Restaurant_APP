import { useState } from 'react';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

export const useCustomer = () => {
  // Mock Data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Arun Kumar",
      email: "arun.kumar@example.com",
      phone: "+91 98460 12345",
      address: "MG Road, Kochi, Kerala",
      orders: 12,
      status: "Active",
      joinDate: "Jan 12, 2024",
      totalSpent: "₹4,500" // Added for bill look
    },
    {
        id: 2,
        name: "Fathima Beevi",
        email: "fathima.b@example.com",
        phone: "+91 97450 98765",
        address: "Beach Road, Calicut, Kerala",
        orders: 5,
        status: "Active",
        joinDate: "Feb 05, 2024",
        totalSpent: "₹1,200"
    },
    // ... mattu customers
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const deleteCustomer = (id) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  // --- 📄 PDF GENERATION LOGIC ---
  const downloadBill = (customer) => {
    const doc = new jsPDF();

    // 1. Header (Restaurant Details)
    doc.setFillColor(10, 10, 10); // Black Header
    doc.rect(0, 0, 220, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text("THE CRUNCH", 14, 20);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text("Kochi, Kerala, India | +91 9876543210", 14, 30);

    // 2. Title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text("CUSTOMER STATEMENT", 14, 60);

    // 3. Customer Details Section
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 65, 196, 65); // Line

    doc.text(`Name:`, 14, 75);      doc.setFont('helvetica', 'bold'); doc.text(customer.name, 40, 75);
    doc.setFont('helvetica', 'normal');
    doc.text(`Phone:`, 14, 82);     doc.text(customer.phone, 40, 82);
    doc.text(`Email:`, 14, 89);     doc.text(customer.email, 40, 89);
    doc.text(`Address:`, 14, 96);   doc.text(customer.address, 40, 96);
    
    // 4. Details Table (Fake Invoice Table)
    autoTable(doc, {
      startY: 110,
      head: [['Description', 'Value']],
      body: [
        ['Customer ID', `#CUST-${customer.id}`],
        ['Status', customer.status],
        ['Joined Date', customer.joinDate],
        ['Total Orders Placed', customer.orders],
        ['Total Amount Spent', customer.totalSpent || "₹0.00"], // Use mock data
      ],
      theme: 'grid',
      headStyles: { fillColor: [249, 166, 2], textColor: [0,0,0], fontStyle: 'bold' }, // Yellow Header
      styles: { fontSize: 10, cellPadding: 4 },
    });

    // 5. Footer
    const finalY = doc.lastAutoTable.finalY + 20;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Thank you for dining with The Crunch!", 14, finalY);
    doc.text("This is a system generated report.", 14, finalY + 6);

    // Save File
    doc.save(`${customer.name.replace(/\s+/g, '_')}_Bill.pdf`);
  };

  return {
    customers,
    filteredCustomers,
    searchTerm,
    setSearchTerm,
    deleteCustomer,
    downloadBill // Exporting the function
  };
};