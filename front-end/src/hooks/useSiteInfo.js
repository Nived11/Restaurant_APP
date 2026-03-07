import { useQuery } from "@tanstack/react-query";
import api from "../api/axios"; 

const DEFAULT_INFO = {
  appName: "App Name",
  email: "email@gmail.com",
  phone: "00000 00000",
  address: "123, Main Street, City, Country",
  footerDescription: "default footer description",
  workingHours: {
    weekdays: "10:00 AM - 11:00 PM",
    sunday: "11:00 AM - 11:30 PM"
  },
  socials: {
    instagram: "#",
    facebook: "#",
    twitter: "#",
    whatsapp: "0000000000"
  }
};

export const useSiteInfo = () => {
  return useQuery({
    queryKey: ["site-info"],
    queryFn: async () => {
      try {
        const res = await api.get("/site-settings/info/");
        return res.data;
      } catch (error) {
      }
    },
   
    placeholderData: DEFAULT_INFO,
    staleTime: 0,
    retry: 1, 
  });
};