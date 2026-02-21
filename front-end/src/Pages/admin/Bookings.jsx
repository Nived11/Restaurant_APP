import React from "react";
import { BookingFilters, BookingTable , useBookings} from "../../features/admin/bookings";


const Bookings = () => {
  const {
    searchTerm, setSearchTerm,
    filterDate, setFilterDate,
    expandedRow, toggleRow,
    filteredBookings, clearFilters,
    loading, error, refresh
  } = useBookings();

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans text-[#0A0A0A]">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Reservations</h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">Manage and view your restaurant bookings.</p>
          </div>
          <BookingFilters 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
            filterDate={filterDate}
            setFilterDate={setFilterDate}
          />
        </div>

        <BookingTable 
          bookings={filteredBookings}
          expandedRow={expandedRow}
          toggleRow={toggleRow}
          clearFilters={clearFilters}
          isFiltered={!!(searchTerm || filterDate)}
          loading={loading}
          error={error}
          onRetry={refresh}
        />
      </div>
    </div>
  );
};

export default Bookings;