const HomePage = () => {
  const categories = [
    { name: "Burgers", img: "🍔" },
    { name: "Pizza", img: "🍕" },
    { name: "Fried Chicken", img: "🍗" },
    { name: "Drinks", img: "🥤" },
    { name: "Desserts", img: "🍰" },
    { name: "Sides", img: "🍟" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Offer Carousel (Placeholder style) */}
      <section className="p-6">
        <div className="w-full h-64 md:h-80 bg-green-800 rounded-3xl flex items-center justify-between px-12 overflow-hidden relative">
          <div className="max-w-md z-10">
            <h1 className="text-4xl md:text-6xl font-black text-black leading-tight">
              GET <span className="text-white italic text-shadow">50% OFF</span>
            </h1>
            <p className="mt-4 text-black font-semibold text-lg">On your first "Crunchy" order!</p>
            <button className="mt-6 bg-black text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition shadow-lg">
              Order Now
            </button>
          </div>
          <div className="hidden md:block">
             <img src="/Logo-web.png" alt="Promo" className="h-64 rotate-12 opacity-90" />
          </div>
          {/* Decorative Circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
        </div>
      </section>

      {/* 2. Categories Flex */}
      <section className="px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">What's on your mind?</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat, index) => (
            <div key={index} className="flex-shrink-0 group cursor-pointer text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-4xl group-hover:bg-yellow-100 transition shadow-sm border border-gray-100">
                {cat.img}
              </div>
              <p className="mt-3 font-medium text-gray-800 group-hover:text-yellow-600">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;