import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import api from "../../../../api/axios"; 
import { extractErrorMessages } from "../../../../utils/extractErrorMessages";
import { toast } from "sonner";

const getPlaceName = async (lat, lon) => {
  if (!lat || !lon) return null;
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    if (!response.ok) return null;
    const data = await response.json();
    
    const adminLevels = data.localityInfo?.administrative || [];
    const districtObj = adminLevels.find(level => 
      level.description?.toLowerCase().includes("district") || level.order === 4
    );
    let district = districtObj ? districtObj.name.replace(/\s*district\s*/gi, "").trim() : "";
    
    const parts = [data.locality, data.city, district].filter(part => part && part.length > 0);
    return {
      formattedName: parts.join(", ") || "Location Pinned",
      postcode: data.postcode || ""
    };
  } catch (error) {
    console.error("Geocoding Error:", error);
    return null;
  }
};

export const useAddress = () => {
  const queryClient = useQueryClient();
  const [isLocating, setIsLocating] = useState(false);

  const addressQuery = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const response = await api.get("/auth/addresses/");
      const rawAddresses = response.data;
      const enrichedAddresses = await Promise.all(
        rawAddresses.map(async (addr) => {
          const details = await getPlaceName(addr.latitude, addr.longitude);
          return { ...addr, placeName: details?.formattedName || "Location Not Found" };
        })
      );
      return enrichedAddresses;
    },
    staleTime: 0, 
  });

  const getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        toast.error("GPS not supported");
        return reject("Not supported");
      }
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const details = await getPlaceName(latitude, longitude);
          setIsLocating(false);
          resolve({ latitude, longitude, ...details });
        },
        (error) => {
          toast.error("Enable GPS access");
          setIsLocating(false);
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    });
  };

  const addMutation = useMutation({
    mutationFn: (newData) => api.post("/auth/addresses/", newData),
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
      toast.success("Address added successfully");
    },
    onError: (err) => toast.error(extractErrorMessages(err))
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => api.patch(`/auth/addresses/${id}/`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
      toast.success("Address updated successfully");
    },
    onError: (err) => toast.error(extractErrorMessages(err))
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/auth/addresses/${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
      toast.success("Address deleted successfully");
    },
    onError: (err) => toast.error(extractErrorMessages(err))
  });

  return {
    addresses: addressQuery.data || [],
    isLoading: addressQuery.isLoading,
    addressError: addressQuery.error,
    refetchAddresses: addressQuery.refetch,
    isLocating,
    getCurrentLocation,
    addAddress: addMutation.mutateAsync,
    updateAddress: updateMutation.mutateAsync,
    deleteAddress: deleteMutation.mutateAsync,
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending, 
  };
};

export default useAddress;