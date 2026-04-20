import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RiShoppingBag3Line } from "react-icons/ri";

const CartBadge = () => {
  const cartCount = useSelector((state) => state.cart.items.length);

  return (
    <Link to="/cart" className="relative p-2 lg:p-3 hover:bg-gray-100 rounded-full text-gray-700">
      <RiShoppingBag3Line size={23} className="text-black/80" />
      {cartCount > 0 && (
        <span className="absolute top-1 right-1 bg-black border-2 border-white text-white text-[9px] h-4 w-4 flex items-center justify-center rounded-full font-black">
          {cartCount}
        </span>
      )}
    </Link>
  );
};

export default memo(CartBadge);