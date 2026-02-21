const ErrorState = ({ message, onRetry }) => (
  <tr>
    <td colSpan="5" className="py-16 text-center">
      <p className="text-red-500 font-bold mb-4">{message}</p>
      <button onClick={onRetry} className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold uppercase">Retry</button>
    </td>
  </tr>
);

export default ErrorState;