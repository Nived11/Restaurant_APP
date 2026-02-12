import { RiAddLine } from "react-icons/ri";

const bestSellersData = [
  {
    id: 1,
    name: "Classic Pepperoni Pizza",
    desc: "Signature thin crust with spicy Italian pepperoni",
    price: 399,
    originalPrice: 499,
    discount: "20% OFF",
    img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Double Patty Cheese Burger",
    desc: "Flame-grilled beef with secret house sauce",
    price: 280,
    originalPrice: 350,
    discount: "15% OFF",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Alfredo Pasta White Sauce",
    desc: "Creamy parmesan sauce with mushrooms & garlic",
    price: 320,
    originalPrice: 400,
    discount: "10% OFF",
    img: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "Classic Chicken Wings",
    desc: "6 pieces of spicy buffalo glazed wings",
    price: 220,
    originalPrice: 299,
    discount: "25% OFF",
    img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=800"
  },
];

const BestSellers = () => (
  <section className="py-12 bg-white">
    <div className="max-w-[1440px] mx-auto px-4 md:px-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-2">
        <div>
          <h2 className="text-2xl md:text-3xl font-black uppercase text-gray-900">
            Our <span className="text-primary">Best</span> Sellers
          </h2>
          <div className="h-1 w-10 bg-primary mt-1 rounded-full" />
        </div>
        <p className="text-gray-400 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">
          Community Favorites
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
        {bestSellersData.map((item) => (
          <div key={item.id} className="group will-change-transform">
            
            {/* Image Container */}
            <div className="relative aspect-square rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-gray-50 mb-3 md:mb-5 shadow-sm transform-gpu">
              <img 
                src={item.img} 
                alt={item.name}
                loading="lazy"      // Improved performance
                decoding="async"    // Improved performance
                className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-500 ease-out" 
              />

              {/* Discount Badge */}
              <div className="absolute top-3 left-3 md:top-5 md:left-5">
                <span className="bg-primary text-black text-[9px] md:text-[11px] font-black px-2 md:px-3 py-1 rounded-lg shadow-lg uppercase">
                  {item.discount}
                </span>
              </div>
              
              {/* + Plus Button */}
              <button className="absolute bottom-3 right-3 md:bottom-5 md:right-5 bg-white/90 backdrop-blur-md text-black size-8 md:size-12 cursor-pointer rounded-md md:rounded-xl flex items-center justify-center shadow-xl transition-all duration-300 md:hover:bg-primary active:scale-90 z-10">
                <RiAddLine size={24} className="md:size-8 font-bold" />
              </button>
            </div>

            {/* Content Area */}
            <div className="px-1">
              <h3 className="font-black text-gray-900 text-[14px] md:text-lg leading-tight mb-1 truncate">
                {item.name}
              </h3>
              <p className="text-[10px] md:text-xs text-gray-500 font-medium line-clamp-1 mb-2">
                {item.desc}
              </p>
              
              <div className="flex flex-col">
                <span className="text-gray-400 text-[10px] md:text-xs line-through font-bold">
                  ₹{item.originalPrice}
                </span>
                <span className="font-black text-black text-base md:text-xl leading-none">
                  ₹{item.price}
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BestSellers;