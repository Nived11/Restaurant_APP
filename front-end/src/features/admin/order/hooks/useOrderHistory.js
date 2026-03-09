import { useQuery } from '@tanstack/react-query';
import api from '../../../../api/axios'; 
import { extractErrorMessages } from '../../../../utils/extractErrorMessages';

export const useOrderHistory = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['admin-orders', 'HISTORY'],
    queryFn: async () => {
      const response = await api.get(`/orders/admin/?status=HISTORY`);
      return response.data;
    },
    refetchInterval: 30000, 
  });

  return {
    orders: data || [],
    isLoading,
    isError,
    error: extractErrorMessages(error),
  };
};