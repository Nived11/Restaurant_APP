import { RiStarFill, RiUserHeartLine } from "react-icons/ri";

const reviews = [
  { id: 1, name: "Arjun S.", review: "The Best Sellers section never disappoints! The burgers arrive hot and juicy every single time.", rating: 5 },
  { id: 2, name: "Priya M.", review: "Super fast delivery. I ordered the Party Bundle and it was enough for the whole family!", rating: 5 },
  { id: 3, name: "Rahul V.", review: "Finally a place that actually delivers crispy fries. 10/10 would recommend!", rating: 4 },
];

const Testimonials = () => {
  return (
    <section className="py-6 md:py-12 bg-gray-50/50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 md:px-10">
        
        {/* Heading Section - Reduced size for Desktop */}
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
          <h2 className="text-base sm:text-xl md:text-2xl font-black uppercase tracking-tight whitespace-nowrap">
            Happy <span className="text-primary underline decoration-black/5 italic">Foodies</span>
          </h2>
          <div className="h-[1px] w-full bg-gray-200/60" />
        </div>

        {/* Responsive Grid - Controlled max-width for desktop cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {reviews.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-4 md:p-6 rounded-[1.2rem] md:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Stars - Reduced size */}
                <div className="flex gap-0.5 mb-2.5 md:mb-3">
                  {[...Array(5)].map((_, i) => (
                    <RiStarFill 
                      key={i} 
                      className={i < item.rating ? "text-primary" : "text-gray-200"} 
                      size={12} // Desktop and Mobile smaller stars
                    />
                  ))}
                </div>

                {/* Review Text - Reduced font size for Desktop */}
                <p className="text-gray-600 font-bold italic text-[11px] sm:text-xs md:text-[14px] leading-relaxed mb-4">
                  "{item.review}"
                </p>
              </div>

              {/* User Info - More compact */}
              <div className="flex items-center gap-2 md:gap-3 mt-auto">
                <div className="w-7 h-7 md:w-9 md:h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                  <RiUserHeartLine size={14} className="md:size-[18px]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black uppercase text-[9px] md:text-[10px] tracking-wider text-gray-900 leading-none">
                    {item.name}
                  </span>
                  <span className="text-[7px] md:text-[9px] font-bold text-gray-400 uppercase mt-1">Verified Foodie</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;