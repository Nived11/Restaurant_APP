import React from "react";
import { BookingFilters, BookingTable, useBookings } from "../../features/admin/bookings";

const Bookings = () => {
  const {
    searchTerm, setSearchTerm, expandedRow, toggleRow,
    bookings, clearFilters, loading, loadingMore,
    hasNextPage, loadMore, showLess, currentPage, error, refresh
  } = useBookings();

  return (
    <div className="min-h-screen mt-4 sm:mt-0 px-2 md:p-6 lg:p-8 font-sans text-[#0A0A0A] ">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-[#1A1A1A]">
              Reservation <span className="text-[#f9a602]">Lists</span>
            </h1>
            <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-1">
              manage your restaurant reservations
            </p>
          </div>
          <BookingFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <BookingTable 
          bookings={bookings}
          expandedRow={expandedRow}
          toggleRow={toggleRow}
          clearFilters={clearFilters}
          isFiltered={!!searchTerm} 
          loading={loading}
          loadingMore={loadingMore}
          hasNextPage={hasNextPage}
          onLoadMore={loadMore}
          onShowLess={showLess}
          currentPage={currentPage}
          error={error}
          onRetry={refresh}
        />
      </div>
    </div>
  );
};

export default Bookings;
