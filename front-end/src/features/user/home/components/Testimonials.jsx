import { RiStarFill, RiUserHeartLine } from "react-icons/ri";

const reviews = [
  { id: 1, name: "Arjun S.", review: "The Best Sellers section never disappoints! The burgers arrive hot and juicy every single time.", rating: 5 },
  { id: 2, name: "Priya M.", review: "Super fast delivery. I ordered the Party Bundle and it was enough for the whole family!", rating: 5 },
  { id: 3, name: "Rahul V.", review: "Finally a place that actually delivers crispy fries. 10/10 would recommend!", rating: 4 },
  
];

const Testimonials = () => {
  return (
    <section className="py-12 bg-gray-50/50">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter whitespace-nowrap">
            Happy <span className="text-primary underline decoration-black/5">Foodies</span>
          </h2>
          <div className="h-[2px] w-full bg-gray-200/60" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <RiStarFill key={i} className={i < item.rating ? "text-primary" : "text-gray-200"} size={16} />
                ))}
              </div>
              <p className="text-gray-600 font-bold italic text-sm md:text-base leading-relaxed mb-4">
                "{item.review}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <RiUserHeartLine size={20} />
                </div>
                <span className="font-black uppercase text-xs tracking-widest text-gray-900">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;