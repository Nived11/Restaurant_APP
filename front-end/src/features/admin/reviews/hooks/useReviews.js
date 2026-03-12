import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../api/axios";
import { extractErrorMessages } from "../../../../utils/extractErrorMessages"; 

export const useReviews = () => {
  const queryClient = useQueryClient(); 
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["reviews", page],
    queryFn: async () => {
      const response = await api.get(`/feedback/admin/list/`, {
        params: { page: page }, // പേജ് പാരാമീറ്റർ കൃത്യമായി അയക്കുന്നു
      });
      return response.data;
    },
    keepPreviousData: true,
    staleTime: 5000,
  });

  // Status update mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ reviewId, isApproved }) => {
      const response = await api.patch(`/feedback/admin/${reviewId}/update/`, {
        is_approved: isApproved,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  // API റെസ്‌പോൺസ് സ്ട്രക്ചർ അനുസരിച്ചുള്ള മാറ്റങ്ങൾ
  const reviews = data?.results || []; // API-ൽ 'results' എന്നതിലാണ് ഡാറ്റ
  const totalItems = data?.count || 0;

  return {
    reviews,
    page,
    setPage,
    totalItems,
    loading: isLoading,
    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isLoading,
    error: isError ? extractErrorMessages(error) : null, 
    refresh: refetch,
    hasNextPage: !!data?.next,     // API 'next' ഫീൽഡ് ഉപയോഗിക്കുന്നു
    hasPrevPage: !!data?.previous, // API 'previous' ഫീൽഡ് ഉപയോഗിക്കുന്നു
  };
};

export default useReviews;