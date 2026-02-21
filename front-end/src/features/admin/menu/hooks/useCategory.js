import { useState } from "react";

export const useCategory = () => {
  const [categories, setCategories] = useState(["Burger", "Pizza", "Cake", "Beverages"]);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);

  const addCategory = (newCat) => {
    if (newCat.name && !categories.includes(newCat.name)) {
      setCategories([...categories, newCat.name]);
    }
  };

  return { categories, isCatModalOpen, setIsCatModalOpen, addCategory };
};