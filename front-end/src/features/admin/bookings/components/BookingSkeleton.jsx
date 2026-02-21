const BookingSkeleton = () => (
  <tr className="animate-pulse">
    <td className="px-8 py-5"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-gray-200 rounded-full"></div><div className="h-4 w-24 bg-gray-200 rounded"></div></div></td>
    <td className="px-8 py-5"><div className="space-y-2"><div className="h-3 w-32 bg-gray-100 rounded"></div><div className="h-3 w-28 bg-gray-100 rounded"></div></div></td>
    <td className="px-8 py-5"><div className="space-y-2"><div className="h-4 w-24 bg-gray-200 rounded"></div><div className="h-3 w-16 bg-gray-100 rounded"></div></div></td>
    <td className="px-8 py-5"><div className="h-8 w-20 bg-gray-100 rounded-lg mx-auto"></div></td>
    <td className="px-8 py-5"><div className="h-8 w-8 bg-gray-100 rounded-full ml-auto"></div></td>
  </tr>
);

export default BookingSkeleton;