import { useState, useMemo } from 'react';

export const useMenu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filterType, setFilterType] = useState("All"); // All | Veg | Non-Veg

  const categories = ["All", "Burgers", "Pizza", "Pastas", "Drinks", "Desserts"];

  // Dummy Data for Menu Items
  const menuItems = [
    {
      id: 1,
      name: "Crunch Classic Burger",
      desc: "Juicy chicken patty with fresh lettuce and mayo.",
      price: 199,
      category: "Burgers",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Farmhouse Pizza",
      desc: "Delightful combination of onion, capsicum, tomato.",
      price: 399,
      category: "Pizza",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Cheese Burst Burger",
      desc: "Loaded with molten cheese and crispy veggies.",
      price: 249,
      category: "Burgers",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Chicken Wings",
      desc: "Spicy and tangy grilled chicken wings.",
      price: 250,
      category: "Starters",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Mojito",
      desc: "Refreshing mint and lime drink.",
      price: 129,
      category: "Drinks",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 6,
      name: "Choco Lava Cake",
      desc: "Warm chocolate cake with molten center.",
      price: 99,
      category: "Desserts",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 7,
      name: "BBQ Chicken Pizza",
      desc: "Smoked BBQ chicken with onions and cheese.",
      price: 449,
      category: "Pizza",
      isVeg: false,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 8,
      name: "Oreo Shake",
      desc: "Thick shake with oreo crumbles.",
      price: 149,
      category: "Drinks",
      isVeg: true,
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop"
    }
  ];

  // Logic to filter items based on Category & Diet (Veg/Non-Veg)
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const categoryMatch = activeCategory === "All" || item.category === activeCategory;
      const typeMatch = filterType === "All" 
        ? true 
        : filterType === "Veg" ? item.isVeg : !item.isVeg;
      
      return categoryMatch && typeMatch;
    });
  }, [activeCategory, filterType, menuItems]);

  return {
    categories,
    activeCategory,
    setActiveCategory,
    filterType,
    setFilterType,
    filteredItems
  };
};  