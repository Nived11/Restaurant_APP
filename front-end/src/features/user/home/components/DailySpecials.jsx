import { RiFireFill } from "react-icons/ri";

const specialsData = [
  {
    id: 1,
    name: "Smokey BBQ Monster Burger",
    desc: "Double patty, extra cheese, and crispy bacon",
    price: 349,
    originalPrice: 450,
    discount: "20% OFF",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Paneer Tikka Woodfired Pizza",
    desc: "Fresh cottage cheese with spicy makhani sauce",
    price: 499,
    originalPrice: 650,
    discount: "HOT DEAL",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Loaded Peri Peri Fries",
    desc: "Golden fries topped with jalapenos and liquid cheese",
    price: 180,
    originalPrice: 220,
    discount: "BEST SELLER",
    // FIXED IMAGE LINK BELOW
    img: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "Double Cheese Margherita",
    desc: "Classic Italian style with fresh basil and mozzarella",
    price: 299,
    originalPrice: 399,
    discount: "FLASH SALE",
    img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    name: "Spicy Zinger Smashed Burger",
    desc: "Crispy chicken breast with ghost pepper sauce",
    price: 249,
    originalPrice: 310,
    discount: "SPICY",
    img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    name: "Tandoori Chicken Platter",
    desc: "4 pieces of flame-grilled chicken with mint chutney",
    price: 550,
    originalPrice: 700,
    discount: "CHEF'S SPECIAL",
    img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800"
  },
];

const DailySpecials = () => (
  <section className="py-0 md:py-12 bg-gray-50">
    <div className="max-w-[1440px] mx-auto px-4 md:px-10">
      
      <div className="flex items-center justify-start gap-2 md:gap-3 mb-6 md:mb-10">
        <RiFireFill className="text-orange-600 animate-pulse text-xl md:text-3xl" />
        <h2 className="text-lg md:text-3xl font-black uppercase tracking-tight text-gray-900">
          Today's <span className="text-orange-600">Hot</span> Specials
        </h2>
        <RiFireFill className="text-orange-600 animate-pulse text-xl md:text-3xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {specialsData.map((item) => (
          <div key={item.id} className="relative h-56 md:h-72 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group cursor-pointer shadow-md">
            <img 
              src={item.img} 
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 md:p-6 flex flex-col justify-end">
              <span className="bg-primary text-black text-[8px] md:text-[10px] font-black px-2 md:px-3 py-1 rounded-full w-fit mb-2 tracking-widest uppercase">
                {item.discount}
              </span>

              <h3 className="text-white text-lg md:text-2xl font-black leading-tight mb-0.5 md:mb-1">
                {item.name}
              </h3>
              <p className="text-gray-300 text-[10px] md:text-sm font-medium line-clamp-1 mb-3 md:mb-4">
                {item.desc}
              </p>

              <div className="flex justify-between items-center border-t border-white/10 pt-3 md:pt-4">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-[10px] md:text-xs line-through font-bold">
                    ₹{item.originalPrice}
                  </span>
                  <span className="text-primary text-xl md:text-2xl font-black leading-none">
                    ₹{item.price}
                  </span>
                </div>
                <button className="bg-white text-black px-4 md:px-6 py-2 md:py-2.5 rounded-xl md:rounded-2xl text-[9px] md:text-[11px] font-black hover:bg-primary transition-all active:scale-95">
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DailySpecials;