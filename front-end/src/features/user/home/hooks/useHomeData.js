import { useState, useEffect, useCallback } from "react";
import api from "../../../../api/axios"; 
import { extractErrorMessages } from "../../../../utils/extractErrorMessages";

const useHomeData = () => {
  const [data, setData] = useState({
    banners: [],
    combos: [],
    bestSellers: [],
    specials: [],
    categories: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllHomeData = useCallback(async () => {
    setLoading(true);
    try {
      const [bannersRes, combosRes, bestSellersRes, specialsRes, categoriesRes] = await Promise.all([
        api.get("/inventory/public/menu-items/?section=BANNER"),
        api.get("/inventory/public/menu-items/?section=COMBO MENU"),
        api.get("/inventory/public/menu-items/?section=BEST SELLER"),
        api.get("/inventory/public/menu-items/?section=TODAY'S SPECIAL"),
        api.get("/inventory/categories/") 
      ]);

      const getItems = (res) => (Array.isArray(res.data) ? res.data : res.data.results || []);

      setData({
        banners: getItems(bannersRes),
        combos: getItems(combosRes),
        bestSellers: getItems(bestSellersRes),
        specials: getItems(specialsRes),
        categories: getItems(categoriesRes) 
      });
      setError(null);
    } catch (err) {
      setError(extractErrorMessages(err));
      console.error("Home API Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllHomeData();
  }, [fetchAllHomeData]);

  return { data, loading, error, refetch: fetchAllHomeData };
};

export default useHomeData;