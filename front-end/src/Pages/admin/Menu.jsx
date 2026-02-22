import React from "react";
import { MenuHeader, CategorySection, ProductSection } from "../../features/admin/menu";

const Menu = () => {
  return (
    <div className="max-w-full min-h-screen bg-white rounded-t-[2rem] pb-20 px-4 sm:px-8">
      <div className="pt-8 flex flex-col gap-10">
        {/* Heading */}
        <MenuHeader />

        {/* Category Section: Title, Add Button, and List */}
        <CategorySection />

        {/* Product Section: Filters, Add Item, and Grid */}
        <ProductSection />
      </div>
    </div>
  );
};

export default Menu;