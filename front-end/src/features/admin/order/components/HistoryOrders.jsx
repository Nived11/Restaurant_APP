import React, { useRef } from 'react';
import { Clock, User, Printer, MapPin, Info } from 'lucide-react';
import { useOrderHistory } from '../hooks/useOrderHistory';
import { OrderSkeleton } from './OrderSkeleton';
import { OrderError } from './OrderError';
import { useOrderTime } from '../hooks/useOrderTime';
import { useReactToPrint } from 'react-to-print';
import { HistoryReceipt } from './HistoryReceipt';

const HistoryRow = ({ order }) => {
  const { elapsedTime, formattedDate } = useOrderTime(order.created_at);
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
  });

  const isDelivered = order.order_status === 'DELIVERED';
  const statusStyles = {
    DELIVERED: "bg-green-100 text-green-700 border-green-200",
    CANCELLED: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <>
      <div className="hidden">
        <div ref={componentRef}>
         <HistoryReceipt order={order} />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl mb-6 overflow-hidden shadow-sm hover:shadow-md transition-all">
        {/* Header Section */}
        <div className="px-6 py-3 flex justify-between items-center bg-gray-50 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-sm font-black text-gray-900">
             ORDER <span className={isDelivered ? "text-green-600" : "text-red-600"}>#{order.id}</span>
            </span>
            <div className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${statusStyles[order.order_status]}`}>
              {order.order_status}
            </div>
            <div className="flex items-center gap-1 text-gray-500 ml-2">
              <Clock size={12} />
              <span className="text-[10px] font-bold">{formattedDate}</span>
            </div>
          </div>
          
          <button 
            onClick={() => handlePrint()}
            className="cursor-pointer flex items-center gap-1.5 text-gray-700 bg-white border border-gray-200 px-4 py-1.5 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          >
           <Printer size={14} className={isDelivered ? 'text-green-600' : 'text-red-600'} />
            <span className="text-[10px] font-black uppercase">Print</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Customer & Location */}
          <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-gray-50 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
                <User size={18} />
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-900">{order.customer_name}</h3>
                <p className="text-[10px] font-bold text-gray-500">{order.customer_phone}</p>
              </div>
            </div>
            {order.delivery_address && (
              <div className="flex flex-col md:items-end max-w-md">
                <div className="flex items-center gap-1 text-gray-500 md:justify-end">
                  <MapPin size={13} />
                  <p className="text-[8px] font-black uppercase">Delivery Address</p>
                </div>
                <p className="text-[11px] font-medium text-gray-500 md:text-right">
                  {order.delivery_address.complete_address}
                </p>
              </div>
            )}
          </div>

          {/* Items & Total */}
          <div className="flex justify-between items-end">
            <div className="flex-1">
              <p className="text-[8px] font-black text-gray-500 uppercase mb-1">Items Ordered</p>
              <p className="text-[13px] font-bold text-gray-700">
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    <span className="text-[#f9a602] font-black">{item.quantity}x</span> {item.item_name}
                    {idx < order.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[8px] font-black text-gray-500 uppercase">Total Paid</p>
              <p className="text-lg font-black text-gray-900">₹{order.total_amount}</p>
            </div>
          </div>

          {/* Cancelled By Info (If applicable) */}
          {order.order_status === 'CANCELLED' && order.cancelled_by_display && (
            <div className="flex items-center gap-2 mt-2 p-2 bg-red-50 rounded-lg border border-red-100">
              <Info size={14} className="text-red-500" />
              <p className="text-[11px] font-bold text-red-600">
                Cancelled by: <span className="uppercase">{order.cancelled_by_display || 'Unknown'}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const HistoryOrders = () => {
  const { orders, isLoading, isError, error } = useOrderHistory();

  if (isLoading) return <OrderSkeleton />;
  if (isError) return <OrderError message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="max-w-7xl mx-auto py-4 px-4">
      

      {orders.length > 0 ? (
        orders.map(order => <HistoryRow key={order.id} order={order} />)
      ) : (
        <div className="text-center py-20 text-gray-500 font-bold uppercase tracking-widest">
          No History Available
        </div>
      )}
    </div>
  );
};

export default HistoryOrders;